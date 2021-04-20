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
              text={"Year  " + (1 + round.get('blockNum')) +
                    " / " + game.get("numBlocks")}
              className={Classes.BREADCRUMB_CURRENT}
            />
          </li>
          <li>
            <Crumb
              text={"Month " + (1 + round.get('repNum')) +
                    " / " + game.treatment.repsPerBlock}
              className={Classes.BREADCRUMB_CURRENT}
            />
          </li>
        </ul>
      </nav>
    );
  }
}
