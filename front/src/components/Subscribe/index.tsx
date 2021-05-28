import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import { SubscribeButton } from "./styles";

interface ISubscribe {
  userTo: string | undefined;
}
function Subscribe({ userTo }: ISubscribe) {
  const [subscribeNumber, setSubscribeNumber] = useState(0);
  const [subscribed, setSubscribed] = useState(false);

  const onSubscribe = useCallback(() => {
    let body = {
      userTo: userTo,
      userFrom: window.localStorage.getItem("userId"),
    };
    if (subscribed) {
      axios
        .delete("/api/subscribe/unSubscribe", {
          data: {
            userTo: body.userTo,
            userFrom: body.userFrom,
          },
        })
        .then((response) => {
          if (response.data.success) {
            setSubscribeNumber((prev) => prev - 1);
            setSubscribed((prev) => !prev);
          } else {
            alert("구독 취소 하는데 실패했습니다.");
          }
        });
    }
    axios.post("/api/subscribe/subscribe").then((response) => {
      if (response.data.success) {
        setSubscribeNumber((prev) => prev + 1);
        setSubscribed((prev) => !prev);
      } else {
        alert("구독 하는데 실패했습니다.");
      }
    });
  }, [subscribed, userTo]);

  useEffect(() => {
    axios.get(`/api/subscribe/subscribeNumber/${userTo}`).then((response) => {
      if (response.data.success) {
        console.log(response.data);
        setSubscribeNumber((prev) => response.data.subscribeNumber);
      } else {
        alert("구독자 수를 불러오지 못했습니다.");
      }
    });

    axios
      .get(
        `/api/subscribe/subscribed/${userTo}/${window.localStorage.getItem(
          "userId"
        )}`
      )
      .then((response) => {
        if (response.data.success) {
          setSubscribed((prev) => response.data.subscribed);
        } else {
          alert("구독 정보를 가져오지 못했습니다.");
        }
      });
  }, [userTo]);
  return (
    <div>
      <SubscribeButton subscribed={subscribed} onClick={onSubscribe}>
        {subscribeNumber} {subscribed ? "Subscribed" : "Subscribe"}
      </SubscribeButton>
    </div>
  );
}

export default Subscribe;
