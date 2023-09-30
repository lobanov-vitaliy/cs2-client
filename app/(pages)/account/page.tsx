import Metadata from "@/components/Metadata";
import Card from "@/components/Card";
import Button from "@/components/Button";
import { getSession } from "@/app/actions/session";
import { redirect } from "next/navigation";

export default async function AccountPage() {
  const session = await getSession();

  if (!session) {
    redirect("/");
  }

  return (
    <div>
      <Metadata title="Account Settings" />
      <div className="row g-1 g-lg-3 pb-4">
        <div className="col-auto">
          <div className="avatar-lg">
            <img
              src={session.avatar}
              className="img-thumbnail rounded-circle"
            />
          </div>
        </div>
        <div className="col">
          <div className="p-2">
            <h3 className="text-white mb-1">{session.name}</h3>
          </div>
        </div>
        <div className="col col-auto">
          <div className="p-2">
            <a href={session.steamProfileUrl} target="_black">
              <i className="mdi mdi-steam fs-2" />
            </a>
          </div>
        </div>
      </div>
      <Card>
        <Card.Body>
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
              id="1"
              placeholder="AAAA-AAAAA-AAAA"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="2" className="form-label">
              Your most recently completed match token
            </label>
            <input
              type="text"
              className="form-control"
              id="2"
              placeholder="CSGO-xxxxx-xxxxx-xxxxx-xxxxx-xxxxx"
            />
          </div>
          <Button>Connect Matchmaking</Button>
        </Card.Body>
      </Card>
    </div>
  );
}
