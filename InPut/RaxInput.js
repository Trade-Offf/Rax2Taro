import { createElement, useRef, useEffect, render } from "rax";
import DU from "driver-universal";
import View from "rax-view";

const App = () => {
  const viewRef = useRef(null);
  useEffect(() => {});
  return (
    <View
      ref={viewRef}
      style={{
        padding: "30rpx",
      }}
      onClick={() => {
        alert("container was clicked!");
      }}
    >
      <View
        style={{
          width: "300rpx",
          height: "300rpx",
          backgroundColor: "red",
        }}
        onClick={(e) => {
          e.stopPropagation();
          alert("red was clicked");
        }}
      />
      <View
        style={{
          width: "300rpx",
          height: "300rpx",
          backgroundColor: "green",
          position: "absolute",
          top: "20rpx",
          left: "20rpx",
        }}
        onClick={() => {
          alert("green was clicked");
        }}
      />
      <View
        style={{
          width: "300rpx",
          height: "300rpx",
          backgroundColor: "yellow",
          position: "absolute",
          top: "80rpx",
          left: "210rpx",
        }}
        onClick={(e) => {}}
      />
    </View>
  );
};

render(<App />, document.body, { driver: DU });
