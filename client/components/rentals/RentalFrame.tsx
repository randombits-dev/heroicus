interface Props {
  ready: boolean;
  url: string;
  error: boolean;
  signMessage: () => void;
}

const RentalFrame = ({ready, url, error, signMessage}: Props) => {
  const iframeLoaded = () => {
    console.log('frame loaded');
  };
  if (ready) {
    return <iframe onLoad={iframeLoaded} className="border-0 w-screen flex-1" src={url}></iframe>
  } else if (url) {
    return <div className="text-center mt-10">
      <div className="spinner"></div>
      <div>Starting server. This can take several minutes...</div>
    </div>
  } else if (error) {
    return <div className="text-center mt-10">
      <div>An error occurred. Please stop server to get a refund.</div>
    </div>;
  } else {
    return <div className="text-center mt-10">
      <button className="bg-blue-900 px-20 py-5" onClick={() => signMessage()}>Sign in to use server</button>
    </div>;
  }
};

export default RentalFrame;
