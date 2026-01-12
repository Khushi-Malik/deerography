import React, { useEffect, useState } from "react";
import * as am5 from "@amcharts/amcharts5";
import * as am5map from "@amcharts/amcharts5/map";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import am5geodata_continentsLow from "@amcharts/amcharts5-geodata/continentsLow";

const MapChart = () => {
  const [pointSeries, setPointSeries] = useState(null);
  const [data, setData] = useState([
    { title: "North America", latitude: 45.563353, longitude: -99.316406, value: 100 },
    { title: "South America", latitude: -15.7833, longitude: -60.1833, value: 100 },
    { title: "Europe", latitude: 55.896104, longitude: 22.160156, value: 20 },
    { title: "Asia", latitude: 50.212106, longitude: 103.183594, value: 0 },
    { title: "Africa", latitude: 5.081385, longitude: 21.621094, value: 0 },
    { title: "Oceania", latitude: -25, longitude: 134.5, value: 0 }
  ]);
  const [values, setValues] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      let fetchedValues = await getCookie();
      setValues(fetchedValues);
      setIsLoading(false);
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (values && !isLoading) {
      let root = am5.Root.new("chartdiv");
      root.setThemes([am5themes_Animated.new(root)]);

      let map = root.container.children.push(
        am5map.MapChart.new(root, {
          panX: "none",
          panY: "none",
          wheelX: "none",
          wheelY: "none",
          pinchZoom: false,
          projection: am5map.geoMercator(),
          paddingTop: 20,
          paddingBottom: 20,
          paddingLeft: 20,
          paddingRight: 20
        })
      );

      let polygonSeries = map.series.push(
        am5map.MapPolygonSeries.new(root, {
          geoJSON: am5geodata_continentsLow,
          exclude: ["antarctica"],
          fill: am5.color(0xE8E6E0)
        })
      );

      let series = map.series.push(am5map.MapPointSeries.new(root, {}));
      setPointSeries(series);

      series.bullets.push((root, series, dataItem) => {
        let value = values.values[dataItem.dataContext.title];
      
        let color = value === 0 
          ? am5.color(0x8B8A85)
          : am5.Color.interpolate(
              value / 100,
              am5.color(0xC0D8C3),
              am5.color(0x6B8E6F)
            );
      
        let container = am5.Container.new(root, {});
        let radius = 20 + (value / 100) * 35;
      
        container.children.push(
          am5.Circle.new(root, {
            radius: radius,
            fill: color,
            tooltipText: "{title}: {value}%"
          })
        );
      
        container.children.push(
          am5.Label.new(root, {
            text: `${value}%`,
            fill: am5.color(0xFFFFFF),
            fontWeight: "600",
            fontSize: 13,
            centerX: am5.p50,
            centerY: am5.p50,
          })
        );
      
        return am5.Bullet.new(root, {
          sprite: container
        });
      });

      series.data.setAll(
        data.map(d => ({
          geometry: { type: "Point", coordinates: [d.longitude, d.latitude] },
          title: d.title,
          value: d.value
        }))
      );

      // Zoom to fit all content
      map.goHome(0);

      return () => {
        root.dispose();
      };
    }
  }, [values, isLoading]);

  const updateValues = (newValues) => {
    setData(prevData =>
      prevData.map((d, i) => ({
        ...d,
        value: newValues[i] || d.value
      }))
    );

    if (pointSeries) {
      pointSeries.data.setAll(
        data.map(d => ({
          geometry: { type: "Point", coordinates: [d.longitude, d.latitude] },
          title: d.title,
          value: d.value
        }))
      );
    }
  };

  return (
    <div>
      <div id="chartdiv" style={{ width: "100%", height: "100%", minHeight: "450px" }}></div>
      {isLoading && (
        <div style={{ 
          position: "absolute", 
          top: "50%", 
          left: "50%", 
          transform: "translate(-50%, -50%)" 
        }}>
          <div className="spinner"></div>
        </div>
      )}
    </div>
  );
};

async function getCookie() {
  let cookiename = 'username';
  var cookiestring = RegExp(cookiename + "=[^;]+").exec(document.cookie);
  let cookie = decodeURIComponent(!!cookiestring ? cookiestring.toString().replace(/^[^=]+./, "") : "");

  const response = await fetch("http://localhost:5001/api/getStats", {
    method: "POST",
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      'user': cookie,
    }),
    credentials: 'include',
  });

  const responseBody = await response.text();
  return JSON.parse(responseBody);
}

export default MapChart;