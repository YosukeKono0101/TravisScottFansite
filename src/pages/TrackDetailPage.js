// import React, { useState, useEffect } from "react";
// import { useParams } from "react-router-dom";
// import { fetchTrackDetails } from "../services/spotifyAPI";

// const TrackDetail = () => {
//   const { trackId } = useParams();
//   const [trackDetails, setTrackDetails] = useState(null);

//   useEffect(() => {
//     const fetchDetails = async () => {
//       const details = await fetchTrackDetails(trackId);
//       setTrackDetails(details);
//     };
//     fetchDetails();
//   }, [trackId]);

//   if (!trackDetails) return <div>Loading...</div>;

//   return (
//     <div>
//       <h1>{trackDetails.name}</h1>
//       {/* Display additional details as needed */}
//     </div>
//   );
// };

// export default TrackDetail;
