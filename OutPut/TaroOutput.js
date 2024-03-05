import { View } from "@tarojs/components";
import { useRef, useEffect, render } from "rax";
import DU from "driver-universal";
const App = () => {
  const viewRef = useRef(null);
  useEffect(() => {});
  return <View ref={viewRef} style={{
    padding: "30rpx"
  }} onTap={() => {
    alert("container was clicked!");
  }}>
      <View style={{
      width: "300rpx",
      height: "300rpx",
      backgroundColor: "red"
    }} onTap={e => {
      e.stopPropagation();
      alert("red was clicked");
    }} />
    </View>;
};
render(<App />, document.body, {
  driver: DU
});