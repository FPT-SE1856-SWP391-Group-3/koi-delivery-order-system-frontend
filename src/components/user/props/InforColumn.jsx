export default function InforColumn(props) {
    return (
      <div className="row">
        <div className="col-sm-3">
          <p className="mb-0">{props.element}</p>
        </div>
        <div className="col-sm-9">
          <p className="text-muted mb-0">{props.value}</p>
        </div>
      </div>
    );
}
