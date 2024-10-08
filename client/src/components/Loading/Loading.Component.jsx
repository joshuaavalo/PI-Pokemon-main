import "./Loading.Styles.css";
import loading from "../../assets/img/loading.gif";

const Loading = () => {
  return (
    <div className="loader-container">
      <img
        className="loader"
        src={loading}
        alt="loading"
      />
      <h3>Loading...</h3>
    </div>
  );
};

export default Loading;
