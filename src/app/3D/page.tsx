export default function A() {
  return (
    <div>
      <iframe src="https://3-dcards.vercel.app/"
     style={{width:"100%", height: "700px", border:0, borderRadius: "4px", overflow:"hidden"}}
     title="Cards"
     allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
     sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
   ></iframe>
    </div>
  );
}
