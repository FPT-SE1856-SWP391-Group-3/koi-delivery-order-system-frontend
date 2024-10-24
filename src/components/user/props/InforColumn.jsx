export default function InforColumn(props) {
    return (
        <div className="row">
        <div className="col-sm-3">
          <h6 className="mb-0">{props.element}</h6>
        </div>
        <div className="col-sm-9 text-secondary">{props.value}</div>
      </div>
    );
}
