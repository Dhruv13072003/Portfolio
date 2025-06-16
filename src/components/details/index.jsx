"use client";

import ProfileCard from "@/reactbits/Components/ProfileCard/ProfileCard";

const Details = () => {
  return (
    <div className="grid  gap-4">
      <div className="row-span-3 flex items-center justify-center">
        <ProfileCard
          name="Dhurv Parmar"
          title="Software Engineer"
          handle="d"
          status="Open To Work"
          contactText="Contact Me"
          avatarUrl="data:image/jpeg;base64,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"
          showUserInfo={true}
          enableTilt={true}
          onContactClick={() => console.log("Contact clicked")}
          innerGradient={"linear-gradient(to bottom, #000000, #000000)"}
          behindGradient={false}
        />
      </div>
      <div className="text-center flex items-center">Experience</div>
      <div className="text-center flex items-center">1.5 years</div>
      <div className="col-start-2 row-start-2 text-center flex items-center">
        Completed Projects
      </div>
      <div className="col-start-3 row-start-2 text-center flex items-center">
        6
      </div>
      <div className="col-start-2 row-start-3 text-center flex items-center">
        Achievement
      </div>
      <div className="col-start-3 row-start-3 text-center flex items-center">
        Best Web Developer Award
      </div>
    </div>
  );
};

export default Details;
