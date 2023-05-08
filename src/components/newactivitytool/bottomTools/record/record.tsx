export default function Record({
  audioref,
  src,
  controls,
}: {
  audioref: any;
  src: any;
  controls: any;
}) {
  return <audio ref={audioref} src={src} controls={controls} />;
}
