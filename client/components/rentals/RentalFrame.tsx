import {styled} from "goober";

const Frame = styled('iframe')`
  border: none;
  width: 100vw;
  height: 100%;
`;

const RentalFrame = ({ready, url, error, signMessage}) => {
  if (ready) {
    return <Frame src={url}></Frame>
  } else if (url) {
    return <div className="text-center">
      <div className="spinner"></div>
      <div>Starting server. This can take several minutes...</div>
    </div>
  } else if (error) {
    return <div className="text-center">
      <div>An error occurred. Please stop server to get a refund.</div>
    </div>;
  } else {
    return <div className="text-center">
      <button className="bg-blue-900 px-20 py-5" onClick={() => signMessage()}>Sign in to use server</button>
    </div>;
  }
};

export default RentalFrame;
