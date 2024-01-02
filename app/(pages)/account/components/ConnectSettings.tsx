"use client";

import Button from "@/components/Button";
import Card from "@/components/Card";
import { SubmitHandler, useForm } from "react-hook-form";

type Inputs = {
  code: string;
  sharecode: string;
};

const ConnectSettings = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    mode: "onChange",
  });
  const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data);

  console.log("errors", errors);

  return (
    <Card>
      <Card.Body>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="fs-4 pb-4">Automatic Match Tracking</div>
          <p className="fs-5">
            {`Authentication Code Log in with your Steam account on this page. Scroll down to "Access to Your Match History" and copy the "Authentication Code". If it's not there yet, click "Create Authentication Code" to generate one.`}
          </p>
          <div className="mb-3">
            <label htmlFor="1" className="form-label">
              Authentication Code
            </label>
            <input
              type="text"
              className="form-control"
              placeholder="AAAA-AAAAA-AAAA"
              {...register("code", {
                required: {
                  value: true,
                  message: "Required",
                },
                pattern: {
                  value: /^([\w]{4})-([\w]{5})-([\w]{4})$/,
                  message: "Invalid Authentication Code",
                },
              })}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="2" className="form-label">
              Your most recently completed match token
            </label>
            <input
              type="text"
              className="form-control"
              placeholder="CSGO-xxxxx-xxxxx-xxxxx-xxxxx-xxxxx"
              {...register("sharecode", {
                required: {
                  value: true,
                  message: "Required",
                },
                pattern: {
                  value:
                    /^CSGO-([\w]{5})-([\w]{5})-([\w]{5})-([\w]{5})-([\w]{5})$/,
                  message: "Invalid Share Code",
                },
              })}
            />
          </div>
        </form>
        <Button>Connect Matchmaking</Button>
      </Card.Body>
    </Card>
  );
};

export default ConnectSettings;
