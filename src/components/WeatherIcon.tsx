import clsx from "clsx";

type Props = {
  src: string;
  alt: string;
  classNmae?: string;
};

export default function WeatherIcon({ src, alt, classNmae }: Props) {
  return <img className={clsx("size-8", classNmae)} src={src} alt={alt} />;
}
