export default function Sidebar() {
  return (
    <>
      <style
        dangerouslySetInnerHTML={{
          __html:
            '\nbody {\n  margin: 0;\n  font-family: "Lato", sans-serif;\n}\n\n.sidebar {\n  margin: 0;\n  padding: 0;\n  width: 200px;\n  background-color: #f1f1f1;\n  position: fixed;\n  height: 100%;\n  overflow: auto;\n}\n\n.sidebar a {\n  display: block;\n  color: black;\n  padding: 16px;\n  text-decoration: none;\n}\n \n.sidebar a.active {\n  background-color: #04AA6D;\n  color: white;\n}\n\n.sidebar a:hover:not(.active) {\n  background-color: #555;\n  color: white;\n}\n\ndiv.content {\n  margin-left: 200px;\n  padding: 1px 16px;\n  height: 1000px;\n}\n\n@media screen and (max-width: 700px) {\n  .sidebar {\n    width: 100%;\n    height: auto;\n    position: relative;\n  }\n  .sidebar a {float: left;}\n  div.content {margin-left: 0;}\n}\n\n@media screen and (max-width: 400px) {\n  .sidebar a {\n    text-align: center;\n    float: none;\n  }\n}\n',
        }}
      />
      <div className="sidebar">
        <a className="active" href="#home">
          Home
        </a>
        <a href="/admin/manage-user">Manage User</a>
        <a href="/admin/manage-koi">Manage Koi</a>
        <a href="/admin/manage-order-service-detail">Manage Order System Detail</a>
        <a href="/admin/manage-payment-type">Manage Payment Type</a>
        <a href="/admin/manage-faq">Manage Faq</a>
        <a href="/admin/manage-order">Manage Order</a>
        <a href="/admin/manage-transportation-report">Manage Report</a>
        <a href="/admin/manage-blog-news">Manage Blog News</a>
        <a href="/admin/manage-certification">Manage Certification</a>
      </div>
    </>
  );
}
