import { Link } from "react-router-dom";
import useBreadcrumbs from "use-react-router-breadcrumbs";

function Breadscrumbs({items}) {
  const breadcrumbs = useBreadcrumbs(items);
  return (
    <nav>
      {breadcrumbs.map(({ breadcrumb, match }) => (
        <span key={match.pathname}>
          <Link to={match.pathname}>{breadcrumb}&nbsp; &gt; &nbsp;</Link>
        </span>
      ))}
    </nav>
  );
}

export default Breadscrumbs;
