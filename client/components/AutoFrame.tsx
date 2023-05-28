import {styled} from "goober";

const Frame = styled('iframe')`
  border: none;
`;

const AutoFrame = ({url, error, login}) => {
  if (url) {
    return <Frame src={url} width="100%" height="500px"></Frame>
  } else if (error) {
    return <div>You are not authorized to use the server.</div>;
  } else {
    return <button onClick={login}>Login to use server</button>
  }
};

export default AutoFrame;
