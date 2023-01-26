import React from "react";
import SmallCard from "./SmallCard";

function Houses() {
  return (
    <div className="relative max-w-7xl mx-auto top-12 px-8 sm:px-16">
      <h2 className="text-4xl pb-3 font-bold border-b border-gray-700">
        Mostly Visited Cities
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        <SmallCard
          img={"https://pbs.twimg.com/media/DPU5bdZXkAEBm2X.jpg"}
          name="Çanakkale"
        />
        <SmallCard
          img={"https://pbs.twimg.com/media/DPU5bdZXkAEBm2X.jpg"}
          name="Çanakkale"
        />
        <SmallCard
          img={"https://pbs.twimg.com/media/DPU5bdZXkAEBm2X.jpg"}
          name="Çanakkale"
        />
        <SmallCard
          img={"https://pbs.twimg.com/media/DPU5bdZXkAEBm2X.jpg"}
          name="Çanakkale"
        />
        <SmallCard
          img={"https://pbs.twimg.com/media/DPU5bdZXkAEBm2X.jpg"}
          name="Çanakkale"
        />
        <SmallCard
          img={"https://pbs.twimg.com/media/DPU5bdZXkAEBm2X.jpg"}
          name="Çanakkale"
        />
        <SmallCard
          img={"https://pbs.twimg.com/media/DPU5bdZXkAEBm2X.jpg"}
          name="Çanakkale"
        />
        <SmallCard
          img={"https://pbs.twimg.com/media/DPU5bdZXkAEBm2X.jpg"}
          name="Çanakkale"
        />
      </div>
    </div>
  );
}

export default Houses;
