import React from "react";
import { Mutation } from "react-apollo";

import * as fragments from "../../../config/fragments";
import * as allQuery from "../../../config/query";
import * as allMutations from "../../../config/mutations";

import Link from "../../Link";
import Btn from "../../Button";

import "./style.css";

const updateAddStar = (
  client,
  {
    data: {
      addStar: {
        starrable: { id }
      }
    }
  }
) => {
  const repository = client.readFragment({
    id: `Repository:${id}`,
    fragment: fragments.REPOSITORY_FRAGMENT
  });

  const totalCount = repository.stargazers.totalCount + 1;

  client.writeFragment({
    id: `Repository:${id}`,
    fragment: fragments.REPOSITORY_FRAGMENT,
    data: {
      ...repository,
      stargazers: {
        ...repository.stargazers,
        totalCount
      }
    }
  });
};

const updateRemoveStar = (
  client,
  {
    data: {
      removeStar: {
        starrable: { id }
      }
    }
  }
) => {
  const repository = client.readFragment({
    id: `Repository:${id}`,
    fragment: fragments.REPOSITORY_FRAGMENT
  });

  const totalCount = repository.stargazers.totalCount - 1;

  client.writeFragment({
    id: `Repository:${id}`,
    fragment: fragments.REPOSITORY_FRAGMENT,
    data: {
      ...repository,
      stargazers: {
        ...repository.stargazers,
        totalCount
      }
    }
  });
};

const VIEWER_SUBSCRIPTIONS = {
  SUBSCRIBED: "SUBSCRIBED",
  UNSUBSCRIBED: "UNSUBSCRIBED"
};

const isWatch = viewerSubscription =>
  viewerSubscription === VIEWER_SUBSCRIPTIONS.SUBSCRIBED;

const updateWatch = (
  client,
  {
    data: {
      updateSubscription: {
        subscribable: { id, viewerSubscription }
      }
    }
  }
) => {
  const repository = client.readFragment({
    id: `Repository:${id}`,
    fragment: fragments.REPOSITORY_FRAGMENT
  });

  let { totalCount } = repository.watchers;
  totalCount =
    viewerSubscription === VIEWER_SUBSCRIPTIONS.SUBSCRIBED
      ? totalCount + 1
      : totalCount - 1;

  client.writeFragment({
    id: `Repository:${id}`,
    fragment: fragments.REPOSITORY_FRAGMENT,
    data: {
      ...repository,
      watchers: {
        ...repository.watchers,
        totalCount
      }
    }
  });
};

const RepositoryItem = ({
  name,
  url,
  descriptionHTML,
  primaryLanguage,
  owner,
  stargazers,
  watchers,
  viewerSubscription,
  viewerHasStarred,
  id
}) => {
  return (
    <div className="RepositoryItem">
      <div className="RepositoryItem-title">
        <h2>
          <Link href={url}>{name}</Link>
        </h2>

        <div className="RepositoryItem-btns">
          {!viewerHasStarred ? (
            <Mutation
              mutation={allMutations.STAR_REPOSITORY}
              variables={{ id }}
              update={updateAddStar}
            >
              {(addStar, { data, loading, error }) => {
                return (
                  <Btn
                    className={"RepositoryItem-title-action"}
                    onClick={addStar}
                  >
                    {`${stargazers.totalCount} Star`}
                  </Btn>
                );
              }}
            </Mutation>
          ) : (
            <span>
              <Mutation
                mutation={allMutations.REMOVE_REPOSITORY}
                variables={{ id }}
                update={updateRemoveStar}
              >
                {(removeStar, { data, loading, error }) => (
                  <Btn
                    className={"RepositoryItem-title-action"}
                    onClick={removeStar}
                  >
                    {`${stargazers.totalCount} Unstar`}
                  </Btn>
                )}
              </Mutation>
            </span>
          )}
        </div>

        <Mutation
          mutation={allMutations.WATCH_REPOSITORY}
          variables={{
            id,
            viewerSubscription: isWatch(viewerSubscription)
              ? VIEWER_SUBSCRIPTIONS.UNSUBSCRIBED
              : VIEWER_SUBSCRIPTIONS.SUBSCRIBED
          }}
          // optimisticResponse={{
          //   updateSubscription: {
          //     __typename: "Mutation",
          //     subscribable: {
          //       __typename: "Repository",
          //       id,
          //       viewerSubscription: isWatch(viewerSubscription)
          //         ? VIEWER_SUBSCRIPTIONS.UNSUBSCRIBED
          //         : VIEWER_SUBSCRIPTIONS.SUBSCRIBED
          //     }
          //   }
          // }}
          update={updateWatch}
        >
          {(updateSubscription, { data, loading, error }) => (
            <Btn
              className="RepositoryItem-title-action"
              onClick={updateSubscription}
            >
              {watchers.totalCount}{" "}
              {isWatch(viewerSubscription) ? "Unwatch" : "Watch"}
            </Btn>
          )}
        </Mutation>
      </div>

      <div className="RepositoryItem-description">
        <div
          className="RepositoryItem-description-info"
          dangerouslySetInnerHTML={{ __html: descriptionHTML }}
        />
        <div className="RepositoryItem-description-details">
          <div>
            {primaryLanguage && <span>Language: {primaryLanguage.name}</span>}
          </div>
          <div>
            {owner && (
              <span>
                Owner: <a href={owner.url}>{owner.login}</a>
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RepositoryItem;
