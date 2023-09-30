import { FC } from "react";
import Card from "@/app/components/Card";
import classNames from "classnames";
import getIntl from "@/components/providers/ServerIntlProvider/intl";

type ClutchesProps = {
  clutches: Array<{
    wins: number;
    attempts: number;
    vs: number;
  }>;
};

const Clutches: FC<ClutchesProps> = async ({ clutches }) => {
  const { $t } = await getIntl();

  return (
    <div className="row row-cols-lg-5">
      {[...new Array(5)]
        .map(
          (_, i: number) =>
            clutches.find((clutch) => clutch.vs === i + 1) || {
              wins: 0,
              attempts: 0,
              vs: i + 1,
            }
        )
        .map((clutch) => {
          const winrate = clutch.attempts
            ? +Number((clutch.wins / clutch.attempts) * 100).toFixed(0)
            : 0;
          return (
            <div key={clutch.vs}>
              <Card>
                <div className="d-flex flex-column gap-1 align-items-center p-3">
                  <div className="fs-1 border border-2 p-4 rounded-circle">
                    1v{clutch.vs}
                  </div>
                  <div className="fs-5 text-muted">
                    {$t({ id: "common.Clutches won" })}
                  </div>
                  <div className="d-flex align-items-center gap-2">
                    <span className="fs-2">
                      {clutch.wins}/{clutch.attempts}
                    </span>
                    <span
                      className={classNames("fs-5", {
                        "text-success": winrate > 50,
                        "text-danger": winrate < 50,
                      })}
                    >{`(${winrate}%)`}</span>
                  </div>
                </div>
              </Card>
            </div>
          );
        })}
    </div>
  );
};

export default Clutches;
