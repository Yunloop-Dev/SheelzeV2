import React, { useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";

const CheckBrowserVersion = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [version, setVersion] = useState(0);
  const [actualVersion, setActualVersion] = useState(0);

  const onSubmit = (e) => {
    e.preventDefault();

    axios
      .get("/api/version/browser")
      .then((res) => {
        setActualVersion(res.data.version);
      })
      .catch((err) => console.log(err));

    var ua = navigator.userAgent,
      tem,
      M =
        ua.match(
          /(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i
        ) || [];
    if (/trident/i.test(M[1])) {
      tem = /\brv[ :]+(\d+)/g.exec(ua) || [];
      return { name: "IE", version: tem[1] || "" };
    }
    if (M[1] === "Chrome") {
      tem = ua.match(/\bOPR|Edge\/(\d+)/);
      if (tem != null) {
        return { name: "Opera", version: tem[1] };
      }
    }
    M = M[2] ? [M[1], M[2]] : [navigator.appName, navigator.appVersion, "-?"];
    if ((tem = ua.match(/version\/(\d+)/i)) != null) {
      M.splice(1, 1, tem[1]);
    }

    console.log({
      name: M[0],
      version: M[1],
    });

    setIsSubmitted(true);
    setVersion(M[1]);
    console.log(parseInt(actualVersion));
  };

  return (
    <>
      <div className="row mt-4">
        <div className="col-6 mx-auto">
          <div className="card">
            <article className="card-body">
              <h4 className="card-title text-center mb-4 mt-1">
                Проверить версию браузера
              </h4>
              <form onSubmit={onSubmit}>
                {isSubmitted ? (
                  <>
                    <h2 className="card-title text-center mb-4 mt-1">
                      {parseInt(actualVersion) - 1 < version
                        ? "У вас установлена свежая версия браузера"
                        : "У вас установлена устаревшая версия бразуера"}
                    </h2>
                    <h5 className="card-title text-center mb-2 mt-1">
                      Ваша версия браузера {version}
                    </h5>
                    <h5 className="card-title text-center mb-4 mt-1">
                      Актуальная версия браузера {actualVersion}
                    </h5>
                  </>
                ) : (
                  ""
                )}
                <div className="form-group">
                  <button type="submit" className="btn btn-dark btn-block">
                    Проверить
                  </button>
                </div>
              </form>
            </article>
          </div>
        </div>
      </div>
    </>
  );
};

export default CheckBrowserVersion;
