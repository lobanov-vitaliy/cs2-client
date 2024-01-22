import classNames from "classnames";
import Slider from "rc-slider";
import { FC, useEffect, useState } from "react";
import "rc-slider/assets/index.css";
import Popover from "@/components/Popover";
import { useIntl } from "react-intl";

const height = 40;

const ProgressBar: FC<{
  isPause?: boolean;
  value: number;
  max: number;
  marks: Record<string | number, any>;
  onChange: (value: number) => void;
  onPause: (value: boolean) => void;
  onChangeSpeed?: (value: number) => void;
}> = ({ isPause, max, value, marks, onChange, onChangeSpeed, onPause }) => {
  const speeds = [
    {
      value: 0.25,
      title: "Very slow",
    },
    {
      value: 0.5,
      title: "Slow",
    },
    {
      value: 1,
      title: "Normal",
    },
    {
      value: 2,
      title: "Fast",
    },
    {
      value: 3,
      title: "Very fast",
    },
  ];
  const { $t } = useIntl();
  const [speed, setSpeed] = useState(speeds[2].value);

  useEffect(() => {
    onChangeSpeed?.(speed);
  }, [speed]);

  return (
    <div className="d-flex gap-1 align-items-center">
      <div
        className="d-flex flex-shrink-0 align-items-center justify-content-center bg-dark cursor-pointer"
        onClick={() => onPause(!isPause)}
        style={{ height, width: height }}
      >
        <i className={`mdi mdi-${isPause ? "play" : "pause"} fs-2`} />
      </div>
      <Popover
        event="hover"
        placement="top"
        trigger={
          <div
            className="d-flex flex-shrink-0 align-items-center justify-content-center bg-dark cursor-pointer"
            onClick={() => {
              const index = speeds.findIndex(({ value }) => value === speed);

              setSpeed(
                speeds[index + 1] ? speeds[index + 1].value : speeds[0].value
              );
            }}
            style={{ height, width: height }}
          >
            {`x${speed}`}
          </div>
        }
      >
        {({ close }) => (
          <div style={{ marginBottom: -10, paddingBottom: 5 }}>
            <div className="list-group">
              {speeds.map((speed) => (
                <button
                  key={speed.value}
                  onClick={() => {
                    setSpeed(speed.value);
                    close();
                  }}
                  className="align-items-center d-flex gap-1 list-group-item-action list-group-item px-2 py-1"
                >
                  {`x${speed.value}: ${$t({ id: `common.${speed.title}` })}`}
                </button>
              ))}
            </div>
          </div>
        )}
      </Popover>
      <Popover
        event="hover"
        placement="top"
        trigger={
          <div
            className="d-flex flex-shrink-0 align-items-center justify-content-center bg-dark cursor-pointer"
            onClick={() => {
              const index = speeds.findIndex(({ value }) => value === speed);

              setSpeed(
                speeds[index + 1] ? speeds[index + 1].value : speeds[0].value
              );
            }}
            style={{ height, width: height }}
          >
            <i className="mdi mdi-cog fs-3" />
          </div>
        }
      >
        {({ close }) => (
          <div style={{ marginBottom: -10, paddingBottom: 5 }}>
            <div className="list-group">
              <div className="align-items-center cursor-pointer d-flex gap-3 justify-content-between list-group-item list-group-item-action px-2 py-1">
                <div>Show player nickname</div>
                <div className="form-check form-switch form-switch-dark m-0">
                  <input className="form-check-input" type="checkbox" />
                </div>
              </div>

              <div className="align-items-center cursor-pointer d-flex gap-3 justify-content-between list-group-item list-group-item-action px-2 py-1">
                <div>Round auto switch</div>
                <div className="form-check form-switch form-switch-dark m-0">
                  <input className="form-check-input" type="checkbox" />
                </div>
              </div>
              <div className="align-items-center cursor-pointer d-flex gap-3 justify-content-between list-group-item list-group-item-action px-2 py-1">
                <div>Show teams</div>
                <div className="form-check form-switch form-switch-dark m-0">
                  <input className="form-check-input" type="checkbox" />
                </div>
              </div>
            </div>
          </div>
        )}
      </Popover>
      <Slider
        className="p-0"
        style={{ height }}
        max={max}
        marks={marks}
        value={value}
        dotStyle={{ display: "none" }}
        styles={{
          track: {
            backgroundColor: "#5f6164",
            height,
            borderRadius: 0,
          },
          handle: {
            display: "none",
          },
          rail: {
            backgroundColor: "#313437",
            height,
            borderRadius: 0,
          },
        }}
        onChange={(value: any) => onChange(value)}
      />
    </div>
  );
};

export default ProgressBar;
