import Metadata from "@/components/Metadata";
import { getSession } from "@/app/actions/session";
import { redirect } from "next/navigation";
import ConnectSettings from "./components/ConnectSettings";

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
      <ConnectSettings />
    </div>
  );
}
