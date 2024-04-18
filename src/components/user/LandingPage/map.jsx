import React, { useState, useEffect } from "react";
import mapStyles from "../../../map.json";
import axios from "axios";

import {
  GoogleMap,
  useJsApiLoader,
  MarkerF,
  InfoWindowF,
} from "@react-google-maps/api";

const map = () => {
  const [activeMarker, setActiveMarker] = useState(null);
  const [hoveredMarker, setHoveredMarker] = useState(null);
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/getmango")
      .then((res) => {
        setData(res.data);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyCF6xu4nAbV5IKWqAy4meimNCLWd4U1zvE",
    language: "th",
  });

  const handleZoomToMarker = (position) => {
    const map = useJsApiLoader.googleMapsApiKey;
    const zoomLevel = 1;
    map.setCenter(position);
    return map.setZoom(zoomLevel);
  };

  const renderRelatedSearchResults = (
    matchingMarkers,
    setSearchQuery,
    setActiveMarker,
    matchingLocation
  ) => {
    const searchResultsContainer = document.getElementById("search-results");
    searchResultsContainer.innerHTML = "";
    searchResultsContainer.classList.add("flex", "flex-col");

    const renderResult = (text, id, isLast) => {
      const resultElement = document.createElement("div");
      resultElement.textContent = text;

      resultElement.addEventListener("click", () => {
        setActiveMarker(id);
        setSearchQuery(text.split(" (")[0]);
      });

      if (!isLast) {
        resultElement.classList.add("border-b", "border-slate-400");
      }
      searchResultsContainer.appendChild(resultElement);
    };

    if (matchingLocation) {
      renderResult(`${matchingLocation.name}`, matchingLocation.id);
    } else if (matchingMarkers.length > 0) {
      matchingMarkers.forEach((marker) => {
        renderResult(`${marker.name}`, marker.id);
      });
    } else {
      const noResultsElement = document.createElement("div");
      noResultsElement.textContent = "No location found";
      noResultsElement.classList.add("pt-2");
      searchResultsContainer.appendChild(noResultsElement);
      matchingMarkers.forEach((marker) => {
        renderResult(`${marker.name}`, marker.id);
      });
    }
  };

  const center = {
    lat: 13.0389969,
    lng: 101.490104,
  };

  // เปลี่ยนจาก mouse hover แล้วขึ้นเป็นแสดงชื่อจังหวัดตลอดอยู่บน icon (ทำยังไง?)
  const handleMouseOver = (marker) => {
    setHoveredMarker(marker);
  };

  return (
    <section>
      <div className="md:container px-5 py-14 md:py-20 flex items-center">
        <div className="w-full">
          <h1 className="flex justify-center font-semibold text-4xl p-4">
            แผนที่
          </h1>
          <p className="flex justify-center p-4 text-xl md:text-xl italic indent-10">
            "มะม่วงเป็นผลไม้ที่ปลูกกันแพร่หลายในประเทศไทย
            ไม่ว่าจะอยู่ที่ไหนก็ตาม คุณสามารถหามะม่วงที่อยู่ใกล้คุณ
            ได้เพียงเเค่พิมสายพันธุ์มะม่วง"
          </p>
          <div className="">
            {isLoaded ? (
              <GoogleMap
                mapContainerClassName="w-full h-[650px]"
                center={center}
                zoom={6}
                onClick={() => setActiveMarker(null)}
                options={{ styles: mapStyles }}
              >
                {data.map(
                  ({
                    id,
                    name,
                    latitude,
                    longitude,
                    sciname,
                    info,
                    type,
                    region,
                    image,
                    origin,
                  }) => {
                    if (latitude !== 0 && longitude !== 0) {
                      return (
                        <MarkerF
                          key={id}
                          position={{ lat: latitude, lng: longitude }}
                          onMouseClick={() => setActiveMarker(id)}
                          onMouseOver={() => handleMouseOver(id)}
                          onClick={() => setActiveMarker(id)}
                          icon={{
                            url: `http://localhost:3000${image}`,
                            scaledSize: { width: 40, height: 71 },
                          }}
                        >
                          {activeMarker === id && (
                            <InfoWindowF>
                              <div className="text-center">
                                <h1 className="mx-auto font-bold text-xl font-prompt">
                                  {name}
                                </h1>
                                <div className="flex justify-center">
                                  <img
                                    src={`http://localhost:3000${image}`}
                                    alt={name}
                                    className="h-24 w-24 object-contain object-center"
                                  />
                                </div>
                                <div className="border border-black font-prompt">
                                  <table className="table-auto w-full border-collapse">
                                    <tbody>
                                      <tr className="border border-black">
                                        <td className="border border-black px-4 py-2 font-bold">
                                          ชื่อวิทยาศาสตร์
                                        </td>
                                        <td className="border border-black px-4 py-2 font-bold">
                                          กลุ่มพันธุ์
                                        </td>
                                        <td className="border border-black px-4 py-2 font-bold">
                                          สายพันธุ์
                                        </td>
                                      </tr>
                                      <tr className="border border-black">
                                        <td className="border border-black px-4 py-2">
                                          {sciname}
                                        </td>
                                        <td className="border border-black px-4 py-2">
                                          {type}
                                        </td>
                                        <td className="border border-black px-4 py-2">
                                          {region}
                                        </td>
                                      </tr>
                                    </tbody>
                                    <tbody>
                                      <tr className="border border-black">
                                        <td className="border border-black px-4 py-2 font-bold">
                                          ข้อมูล
                                        </td>
                                      </tr>
                                      <tr className="border border-black">
                                        <td className="border border-black px-4 py-2">
                                          {info}
                                        </td>
                                      </tr>
                                    </tbody>
                                  </table>
                                </div>
                              </div>
                            </InfoWindowF>
                          )}
                          {hoveredMarker === id && (
                            <InfoWindowF>
                              <div className="text-center">
                                <h1 className="mx-auto font-bold text-xl font-prompt">
                                  {name}
                                </h1>
                                <div className="flex justify-center">
                                  <img
                                    src={`http://localhost:3000${image}`}
                                    alt={name}
                                    className="h-24 w-24 object-contain object-center"
                                  />
                                </div>
                                <div className="border border-black font-prompt">
                                  <table className="table-auto w-full border-collapse">
                                    <tbody>
                                      <tr className="border border-black">
                                        <td className="border border-black px-4 py-2 font-bold">
                                          ชื่อวิทยาศาสตร์
                                        </td>
                                        <td className="border border-black px-4 py-2 font-bold">
                                          กลุ่มพันธุ์
                                        </td>
                                        <td className="border border-black px-4 py-2 font-bold">
                                          สายพันธุ์
                                        </td>
                                      </tr>
                                      <tr className="border border-black">
                                        <td className="border border-black px-4 py-2">
                                          {sciname}
                                        </td>
                                        <td className="border border-black px-4 py-2">
                                          {type}
                                        </td>
                                        <td className="border border-black px-4 py-2">
                                          {region}
                                        </td>
                                      </tr>
                                    </tbody>
                                    <tbody>
                                      <tr className="border border-black">
                                        <td className="border border-black px-4 py-2 font-bold">
                                          ข้อมูล
                                        </td>
                                      </tr>
                                      <tr className="border border-black">
                                        <td className="border border-black px-4 py-2">
                                          {info}
                                        </td>
                                      </tr>
                                    </tbody>
                                  </table>
                                </div>
                              </div>
                            </InfoWindowF>
                          )}
                        </MarkerF>
                      );
                    } else {
                      return null;
                    }
                  }
                )}
              </GoogleMap>
            ) : (
              <div>Loading...</div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
export default map;
