import React from "react";
import { Breadcrumb as Crumb, Classes } from "@blueprintjs/core";
import _ from "lodash";

export default class customBreadcrumb extends React.Component {
  render() {
    const { game, round, stage } = this.props;
    return (
      <nav className="round-nav">
        <ul className={Classes.BREADCRUMBS}>
          <li key={round.index}>
            <Crumb
              text={"Round  " + (1 + round.get('repNum')) +
                    " / " + game.treatment.rounds}
              className={Classes.BREADCRUMB_CURRENT}
            />
          </li>
          <li>
            <Crumb
              text={"Target " + (1 + round.get('targetNum')) +
                    " / " + _.keys(game.get('context')).length}
              className={Classes.BREADCRUMB_CURRENT}
            />
          </li>
        </ul>
      </nav>
    );
  }
}
