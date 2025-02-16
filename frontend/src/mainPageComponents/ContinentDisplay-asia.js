import React, { useEffect } from "react";
import * as am5 from "@amcharts/amcharts5";
import * as am5map from "@amcharts/amcharts5/map";
import am5geodata_continentsLow from "@amcharts/amcharts5-geodata/continentsLow";


const ContinentMapA = () => {
  useEffect(() => {
    let root = am5.Root.new("continentChartA");

    let map = root.container.children.push(
        am5map.MapChart.new(root, {
          projection: am5map.geoMercator(), 
          wheelX: "none",  // Disable zooming with mouse wheel horizontally
          wheelY: "none",  // Disable zooming with mouse wheel vertically
          pinchZoom: false, // Disable pinch-to-zoom on touch devices
        })
      );

    let polygonSeries = map.series.push(
        am5map.MapPolygonSeries.new(root, {
          geoJSON: am5geodata_continentsLow,
          exclude: ["antarctica", "europe", "oceania", "africa", "southAmerica", "northAmerica"],
          fill: am5.color(0xbbbbbb)
        })
      );

    return () => {
      root.dispose();
    };
  }, []);

  return <div id="continentChartA" style={{ width: "100%", height: "500px" }}></div>;
};

export default ContinentMapA;
