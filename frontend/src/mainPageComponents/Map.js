import React, { useEffect } from "react";
import * as am5 from "@amcharts/amcharts5";
import * as am5map from "@amcharts/amcharts5/map";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import am5geodata_continentsLow from "@amcharts/amcharts5-geodata/continentsLow";

const MapChart = () => {
  useEffect(() => {
    let root = am5.Root.new("chartdiv");

    root.setThemes([am5themes_Animated.new(root)]);

    let map = root.container.children.push(
      am5map.MapChart.new(root, {
        panX: "none",
        panY: "none",  // Also prevent vertical panning if needed
        wheelX: "none", // Disable zooming with mouse wheel (horizontal)
        wheelY: "none", // Disable zooming with mouse wheel (vertical)
        pinchZoom: false, // Disable pinch-to-zoom on touch devices
        projection: am5map.geoNaturalEarth1()
      })
    );

    let polygonSeries = map.series.push(
      am5map.MapPolygonSeries.new(root, {
        geoJSON: am5geodata_continentsLow,
        exclude: ["antarctica"],
        fill: am5.color(0xbbbbbb)
      })
    );

    let pointSeries = map.series.push(am5map.MapPointSeries.new(root, {}));
    let colorSet = am5.ColorSet.new(root, { step: 2 });

    pointSeries.bullets.push((root, series, dataItem) => {
      let value = dataItem.dataContext.value;
    
      // Define color scale from grey to bright green
      let color = value === 0 
        ? am5.color(0xbbbbbb)  // Grey for 0
        : am5.Color.interpolate(
            value / 100  ,
            am5.color(0x888888),  // Start color (grey)
            am5.color(0x00ff00)  // End color (bright green)
          );
    
      let container = am5.Container.new(root, {});
      let radius = 15 + (value / 100) * 40;
    
      container.children.push(
        am5.Circle.new(root, {
          radius: radius,
          fill: color,
        })
      );
    
      container.children.push(
        am5.Label.new(root, {
          text: `${value}%`,
          fill: am5.color(0x000000),
          fontWeight: "400",
          centerX: am5.p50,
          centerY: am5.p50,
        })
      );
    
      return am5.Bullet.new(root, {
        sprite: container
      });
    });
    

    let data = [
      {
        title: "North America",
        latitude: 45.563353,
        longitude: -99.316406,
        value: 100
      },
      {
        title: "South America",
        latitude: -15.7833,
        longitude: -60.1833,
        value: 100
      },
      {
        title: "Europe",
        latitude: 55.896104,
        longitude: 22.160156,
        value: 100
      },
      {
        title: "Asia",
        latitude: 50.212106,
        longitude: 103.183594,
        value: 100
      },
      {
        title: "Africa",
        latitude: 5.081385,
        longitude: 21.621094,
        value: 100
      },
      {
        title: "Oceania",
        latitude: -25,
        longitude: 134.5,
        value: 100
      }
    ];

    pointSeries.data.setAll(
      data.map(d => ({
        geometry: { type: "Point", coordinates: [d.longitude, d.latitude] },
        title: d.title,
        value: d.value
      }))
    );

    return () => {
      root.dispose();
    };
  }, []);

  return <div id="chartdiv" style={{ width: "100vw", height: "50vw" }}></div>;
};

export default MapChart;
