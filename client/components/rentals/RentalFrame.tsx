interface Props {
  ready: boolean;
  url: string;
  error: boolean;
  signMessage: () => void;
}

const RentalFrame = ({ready, url, error, signMessage}: Props) => {
  if (ready) {
    return <iframe className="border-0 w-screen flex-1" src={url}></iframe>
  } else if (url) {
    return <div className="text-center mt-10">
      <div className="spinner"></div>
      <div>Starting server...</div>
      <div className="mt-5">Docker servers usually take 45 seconds to start.</div>
      <div>Stable Diffusion servers usually take 6 minutes to start.</div>
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
