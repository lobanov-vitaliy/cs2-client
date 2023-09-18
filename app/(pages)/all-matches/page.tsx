"use client";

import Card from "@/app/components/Card";

export default function AllMatchesPage() {
  return (
    <>
      <div>AllMatchesPage</div>
      <div className="pt-4"></div>
      <Card>
        <Card.Header
          className="header-class"
          onClose={() => console.log("click")}
          title="Good card"
        >
          header text
        </Card.Header>
        <Card.Body>
          <h6 className="card-title">What planning process needs ?</h6>
          <p className="card-text text-muted mb-0">
            {`Intrinsically incubate intuitive opportunities and real-time
            potentialities for change for interoperable meta-services itself or
            distract the viewer's attention from the layout.`}
          </p>
        </Card.Body>
        <Card.Footer>
          <a className="link-success float-end cursor-pointer">
            Payment Now
            <i className="ri-arrow-right-s-line align-middle ms-1 lh-1"></i>
          </a>
          <p className="text-muted mb-0">5 days Left</p>
        </Card.Footer>
      </Card>
    </>
  );
}
