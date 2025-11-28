"use strict";
(self.__LOADABLE_LOADED_CHUNKS__ = self.__LOADABLE_LOADED_CHUNKS__ || []).push([["78353"], {
  89241: function (e, t, i) {
    i.d(t, {
      Hd: function () {
        return r
      },
      Jz: function () {
        return u
      },
      R4: function () {
        return h
      },
      S4: function () {
        return d
      },
      VN: function () {
        return I
      },
      e5: function () {
        return c
      },
      i3: function () {
        return l
      },
      ol: function () {
        return _
      }
    });
    var n = i(5377)
        , o = i(45996)
        , s = i(4676)
        , r = (0,
        i(10625).p)("basicPlayerAtom@tiktok/webapp-atoms", {
      mute: !0,
      playing: !0,
      volume: 0,
      canAutoPlay: !0,
      playProgress: null
    })
        , a = (0,
        s.i)(r, function (e, t) {
      return {
        setMute: function (e) {
          t(r, function (t) {
            return (0,
                o._)((0,
                n._)({}, t), {
              mute: e
            })
          })
        },
        setVolume: function (e) {
          t(r, function (t) {
            return (0,
                o._)((0,
                n._)({}, t), {
              volume: Math.min(Math.max(0, e), 1)
            })
          })
        },
        setPlaying: function (e) {
          t(r, function (t) {
            return (0,
                o._)((0,
                n._)({}, t), {
              playing: e
            })
          })
        },
        setCanAutoPlay: function (e) {
          t(r, function (t) {
            return (0,
                o._)((0,
                n._)({}, t), {
              canAutoPlay: e
            })
          })
        },
        getStaticBasicPlayerState: function () {
          return e(r)
        }
      }
    })
        , u = a.useServiceState
        , d = a.useServiceDispatchers
        , c = a.useAtomService
        , l = function () {
      return u(function (e) {
        return e.mute
      })
    }
        , h = function () {
      return u(function (e) {
        return e.volume
      })
    }
        , I = function () {
      return u(function (e) {
        return e.playing
      })
    }
        , _ = function () {
      return u(function (e) {
        return e.playProgress
      })
    }
  },
  59952: function (e, t, i) {
    i.d(t, {
      $V: function () {
        return g
      },
      GF: function () {
        return w
      },
      LM: function () {
        return y
      },
      MY: function () {
        return A
      },
      PU: function () {
        return W
      },
      R3: function () {
        return U
      },
      RT: function () {
        return O
      },
      Ul: function () {
        return M
      },
      VP: function () {
        return P
      },
      fD: function () {
        return F
      },
      gu: function () {
        return b
      },
      hM: function () {
        return B
      },
      ik: function () {
        return k
      },
      nU: function () {
        return D
      },
      nr: function () {
        return R
      },
      w: function () {
        return N
      },
      x1: function () {
        return G
      },
      yA: function () {
        return L
      },
      yG: function () {
        return V
      }
    });
    var n = i(5377)
        , o = i(45996)
        , s = i(6586)
        , r = i(54333)
        , a = i(18499)
        , u = i(4676)
        , d = i(11854)
        , c = i(21987)
        , l = i(10625)
        , h = i(19960)
        , I = i(47307)
        , _ = i(48859)
        , v = i(80281)
        , T = i(32049)
        , f = i(89241)
        , p = i(19642)
        , E = "w_g_vv"
        , m = "w_g_fyp_vv"
        , S = {
      prevVideo: null,
      currentVideo: null,
      playType: I.$h.Hover,
      globalVvCount: 0,
      fypVvCount: 0,
      justWatchedVideo: null,
      predictedPreloadConfig: {},
      defaultResolution: void 0,
      multiInstanceActualResolutions: {},
      autoResolution: !0
    }
        , g = function () {
      var e, t, i = (0,
          n._)({}, S);
      if ((0,
          T.fU)())
        return i;
      try {
        i.globalVvCount = Number(null != (e = localStorage.getItem(E)) ? e : "0"),
            i.fypVvCount = Number(null != (t = localStorage.getItem(m)) ? t : "0")
      } catch (e) {
        console.warn("getLocalStorage failed for key: webapp_vv_count")
      }
      return i
    }
        , L = (0,
        l.p)("videoPlayerAtom@tiktok/webapp-atoms", g())
        , C = (0,
        u.i)(L, function (e, t) {
      return {
        setAutoResolution: function (e) {
          t(L, function (t) {
            return (0,
                o._)((0,
                n._)({}, t), {
              autoResolution: e
            })
          })
        },
        setDefaultResolution: function (e) {
          t(L, function (t) {
            return (0,
                o._)((0,
                n._)({}, t), {
              defaultResolution: e,
              autoResolution: "auto" === e
            })
          })
        },
        setDefaultResolutionAndUpdateLocalStorage: function (e) {
          this.setDefaultResolution(e);
          try {
            localStorage.setItem("resolution_auto", e)
          } catch (e) {
            console.warn("setLocalStorage failed for key: resolution")
          }
        },
        setMultiInstanceActualResolution: function (e, i) {
          t(L, function (t) {
            var a = (0,
                n._)({}, t.multiInstanceActualResolutions);
            a[e] = i;
            var u = (0,
                r._)(t.recentVideoIndexes || []);
            return u.includes(e) || (u = [e].concat((0,
                r._)(u))),
            u.length > 4 && (u = u.slice(0, 4)),
                a = Object.fromEntries(Object.entries(a).filter(function (e) {
                  var t = (0,
                      s._)(e, 1)[0];
                  return u.includes(Number(t))
                })),
                (0,
                    o._)((0,
                    n._)({}, t), {
                  multiInstanceActualResolutions: a,
                  recentVideoIndexes: u
                })
          })
        },
        updateVideo: function (e) {
          var i = e.needResetReport
              , s = e.currentVideo.index
              , r = e.teaParams
              , u = void 0 === r ? {} : r
              , d = u.isThreeColumnAuto
              , l = u.isVideoDetail
              , h = u.enterMethod
              , I = u.backendSourceEventTracking
              , E = function (e) {
            (null == e ? void 0 : e.id) && (null == e ? void 0 : e.mode) !== void 0 && ((null == e ? void 0 : e.mode) === _.ey.OneColumn || (null == e ? void 0 : e.mode) === _.ey.BrowserMode || (null == e ? void 0 : e.mode) === _.ey.ImmersivePlayer || (null == e ? void 0 : e.mode) === _.ey.VideoDetail) && t(L, function (t) {
              return (0,
                  o._)((0,
                  n._)({}, t), {
                justWatchedVideo: e
              })
            })
          }
              , m = c.l.getInstance(v.Gs);
          m.setIsThreeColumnAuto(void 0 !== d && d),
              m.setEnterMethod(void 0 === h ? "" : h),
              m.setBackendSourceEventTracking(void 0 === I ? "" : I),
              m.setIsVideoDetail(void 0 !== l && l),
          !(0,
              T.fU)() && window.videoChangedCallback && window.videoChangedCallback(s),
          (void 0 === i || i) && m.reset(),
              (0,
                  a.unstable_batchedUpdates)(function () {
                t(L, function (t) {
                  return (0,
                      o._)((0,
                      n._)({}, t), {
                    prevVideo: t.currentVideo,
                    currentVideo: e.currentVideo,
                    playType: e.playType
                  })
                }),
                    t(f.Hd, function (t) {
                      return (0,
                          o._)((0,
                          n._)({}, t), {
                        playProgress: e.playProgress
                      })
                    }),
                    t(p.vl, function (e) {
                      return (0,
                          o._)((0,
                          n._)({}, e), {
                        isPlayerError: !1
                      })
                    }),
                    E(e.currentVideo)
              })
        },
        updateVideoFocusTime: function (e) {
          c.l.getInstance(v.Gs).updateVideoFocusTime(e.blurTime)
        },
        updateGlobalVVCount: function (i) {
          var s = e(L)
              , r = s.globalVvCount
              , a = void 0 === r ? 0 : r
              , u = s.fypVvCount
              , d = void 0 === u ? 0 : u
              , c = a;
          a <= 1e6 && i !== _.ey.ThreeColumn && (c = a + 1,
              (0,
                  h.AP)(E, String(c)),
              t(L, function (e) {
                return (0,
                    o._)((0,
                    n._)({}, e), {
                  globalVvCount: c
                })
              })),
          d <= 1e6 && i === _.ey.OneColumn && ((0,
              h.AP)(m, String(d + 1)),
              t(L, function (e) {
                return (0,
                    o._)((0,
                    n._)({}, e), {
                  fypVvCount: d + 1
                })
              }))
        },
        updatePredictedPreloadConfig: function (e) {
          t(L, function (t) {
            return (0,
                o._)((0,
                n._)({}, t), {
              predictedPreloadConfig: e
            })
          })
        },
        getStaticPlayerState: function () {
          return e(L)
        }
      }
    })
        , A = C.useServiceState
        , R = C.useServiceDispatchers
        , y = (C.useAtomService,
        C.getStaticApi)
        , P = function () {
      return A(function (e) {
        var t, i;
        return Number(null != (i = null == (t = e.currentVideo) ? void 0 : t.index) ? i : 0)
      })
    }
        , M = function () {
      return A(function (e) {
        return e.currentVideo
      })
    }
        , w = function () {
      return A(function (e) {
        var t;
        return null == (t = e.currentVideo) ? void 0 : t.id
      })
    }
        , O = function () {
      return A(function (e) {
        var t, i;
        return null != (i = null == (t = e.currentVideo) ? void 0 : t.mode) ? i : null
      }, d.bN)
    }
        , B = function () {
      return A(function (e) {
        return e.defaultResolution
      })
    }
        , D = function (e) {
      return A(function (t) {
        var i;
        return (null == t || null == (i = t.currentVideo) ? void 0 : i.index) === e
      }, d.bN)
    }
        , N = function (e, t, i) {
      return A(function (n) {
        var o, s, r;
        return (null == n || null == (o = n.currentVideo) ? void 0 : o.index) === e && (null == n || null == (s = n.currentVideo) ? void 0 : s.mode) === t && (null == n || null == (r = n.currentVideo) ? void 0 : r.id) === i
      }, d.bN)
    }
        , U = function (e, t) {
      return A(function (i) {
        var n, o;
        return (null == i || null == (n = i.currentVideo) ? void 0 : n.index) === e - 1 && (null == i || null == (o = i.currentVideo) ? void 0 : o.mode) === t
      }, d.bN)
    }
        , b = function (e) {
      return A(function (t) {
        var i;
        return null == (i = t.multiInstanceActualResolutions) ? void 0 : i[e]
      }, d.bN)
    }
        , F = function () {
      return A(function (e) {
        return e.autoResolution
      }, d.bN)
    }
        , G = function (e, t) {
      return A(function (i) {
        var n, o;
        return (null == i || null == (n = i.currentVideo) ? void 0 : n.index) === e + 1 && (null == i || null == (o = i.currentVideo) ? void 0 : o.mode) === t
      }, d.bN)
    }
        , k = function (e) {
      return A(function (t) {
        var i;
        return (null == t || null == (i = t.currentVideo) ? void 0 : i.index) === e - 1
      }, d.bN)
    }
        , V = function (e) {
      return A(function (t) {
        var i;
        return (null == t || null == (i = t.currentVideo) ? void 0 : i.index) === e + 1
      }, d.bN)
    }
        , W = function () {
      var e;
      return null != (e = A(function (e) {
        return e.predictedPreloadConfig
      })) ? e : {}
    }
  },
  19642: function (e, t, i) {
    i.d(t, {
      J3: function () {
        return h
      },
      Sx: function () {
        return _
      },
      eu: function () {
        return v
      },
      ms: function () {
        return I
      },
      vl: function () {
        return d
      }
    });
    var n = i(5377)
        , o = i(45996)
        , s = i(4676)
        , r = i(10625)
        , a = i(32049)
        , u = {
      isPlayerError: !1,
      showUnmuteTooltip: !1,
      isAutoScroll: !1
    }
        , d = (0,
        r.p)("videoPlayerViewAtom@tiktok/webapp-atoms", function () {
      var e = (0,
          n._)({}, u);
      if ((0,
          a.fU)())
        return e;
      try {
        var t, i = null != (t = localStorage.getItem("auto_scroll")) ? t : "0";
        e.isAutoScroll = "1" === i
      } catch (e) {
        console.warn("getLocalStorage failed for key: auto_scroll")
      }
      return e
    }());
    d.debugLabel = "videoPlayerViewAtom";
    var c = (0,
        s.i)(d, function (e, t) {
      return {
        setAutoScroll: function (e) {
          t(d, function (t) {
            return (0,
                o._)((0,
                n._)({}, t), {
              isAutoScroll: e
            })
          })
        },
        setAutoScrollAndUpdateLocalStorage: function (e) {
          this.setAutoScroll(e);
          try {
            localStorage.setItem("auto_scroll", e ? "1" : "0")
          } catch (e) {
            console.warn("setLocalStorage failed for key: auto_scroll")
          }
        },
        toggleAutoScroll: function () {
          this.setAutoScrollAndUpdateLocalStorage(!e(d).isAutoScroll)
        },
        updateShowUnmuteTooltip: function (e) {
          t(d, function (t) {
            return (0,
                o._)((0,
                n._)({}, t), {
              showUnmuteTooltip: e
            })
          })
        },
        setPlayerError: function () {
          t(d, function (e) {
            return (0,
                o._)((0,
                n._)({}, e), {
              isPlayerError: !0
            })
          })
        },
        getStaticPlayerUIState: function () {
          return e(d)
        }
      }
    })
        , l = c.useServiceState
        , h = c.useServiceDispatchers;
    c.useAtomService,
        c.getStaticApi;
    var I = function () {
      var e;
      return null != (e = l(function (e) {
        return e.isPlayerError
      })) && e
    }
        , _ = function () {
      var e;
      return null != (e = l(function (e) {
        return e.showUnmuteTooltip
      })) && e
    }
        , v = function () {
      var e;
      return null != (e = l(function (e) {
        return e.isAutoScroll
      })) && e
    }
  },
  18576: function (e, t, i) {
    i.d(t, {
      ZC: function () {
        return T
      },
      d7: function () {
        return f
      },
      mo: function () {
        return _
      }
    });
    var n = i(79066)
        , o = i(72516)
        , s = i(73455)
        , r = i(4676)
        , a = i(10625)
        , u = i(99805)
        , d = i(33877)
        , c = i(75434)
        , l = i(91402)
        , h = i(56605)
        , I = (0,
        l.M)({
      csr: function () {
        return (0,
            n._)(function () {
          var e;
          return (0,
              o.__generator)(this, function (t) {
            return [2, Promise.resolve(null != (e = (0,
                h.YI)(u.X)) ? e : {
              pageId: "-1",
              vidList: [],
              parameters: {}
            })]
          })
        })()
      },
      ssr: function () {
        return (0,
            n._)(function () {
          var e;
          return (0,
              o.__generator)(this, function (t) {
            switch (t.label) {
              case 0:
                return [4, (e = (0,
                    c.yK)()).service.seoul.getSEOABTestDecision("".concat(d.C).concat(e.path))];
              case 1:
                return [2, t.sent()]
            }
          })
        })()
      }
    })
        , _ = (0,
        s._)((0,
        a.p)("seoAbtestAtom@tiktok/webapp-atoms", {}), {
      rehydrationKey: "seo.abtest.state"
    })
        , v = (0,
        r.i)(_, function (e, t) {
      return {
        setAbtest: function (i) {
          return (0,
              n._)(function () {
            var n, s;
            return (0,
                o.__generator)(this, function (o) {
              switch (o.label) {
                case 0:
                  if (i === e(_).canonical)
                    return [3, 2];
                  return n = [_],
                      s = {
                        canonical: i
                      },
                      [4, I()];
                case 1:
                  return [2, t.apply(void 0, n.concat([(s.abtest = o.sent(),
                      s)]))];
                case 2:
                  return [2]
              }
            })
          })()
        }
      }
    })
        , T = v.useAtomService
        , f = (v.useServiceDispatchers,
        v.useServiceState)
  },
  94614: function (e, t, i) {
    i.d(t, {
      Ln: function () {
        return c
      },
      pZ: function () {
        return d
      },
      qA: function () {
        return u
      }
    });
    var n = i(54333)
        , o = i(75434)
        , s = i(91402)
        , r = i(59527)
        , a = i(93830)
        , u = (0,
        s.M)({
      csr: function () {
        return (0,
            r.q)()
      },
      ssr: function () {
        return (0,
            o.yK)().service.sharedSeo.getTrafficType()
      }
    })
        , d = (0,
        s.M)({
      csr: function () {
        return (0,
            a.o7)()
      },
      ssr: function () {
        return (0,
            o.yK)().service.sharedSeo.getLaunchMode()
      }
    })
        , c = function (e) {
      var t = new Map;
      return function () {
        for (var i = arguments.length, o = Array(i), s = 0; s < i; s++)
          o[s] = arguments[s];
        var r = JSON.stringify(o);
        if (t.has(r)) {
          var a = t.get(r);
          return t.delete(r),
              t.set(r, a),
              a
        }
        if (t.size >= 10) {
          var u = t.keys().next().value;
          u && t.delete(u)
        }
        var d = e.call.apply(e, [this].concat((0,
            n._)(o)));
        return t.set(r, d),
            d
      }
    }
  },
  44703: function (e, t, i) {
    i.d(t, {
      b: function () {
        return s
      }
    });
    var n = i(73455)
        , o = i(10625)
        , s = (0,
        n._)((0,
        o.p)("seoMetaStateAtom@tiktok/webapp-atoms", {
      metaParams: {},
      jsonldList: [],
      disableAlternateLink: !1,
      generateAlternateWithCanonical: !1,
      enableAlternateHreflang: !1,
      alternateHreflangList: []
    }), {
      rehydrationKey: "seo.meta.state"
    })
  },
  82562: function (e, t, i) {
    i.d(t, {
      hG: function () {
        return v
      },
      kV: function () {
        return f
      },
      VR: function () {
        return T
      }
    });
    var n = i(79066)
        , o = i(5377)
        , s = i(45996)
        , r = i(72516)
        , a = i(73455)
        , u = i(4676)
        , d = i(10625)
        , c = i(42646)
        , l = i(56904);

    function h(e) {
      return (0,
          n._)(function () {
        return (0,
            r.__generator)(this, function (t) {
          return [2, c.h.get("/api/ba/business/suite/bs/account/info/", {
            query: {
              scene: e || "dm"
            },
            baseUrlType: l.Z4.FixedWww
          })]
        })
      })()
    }

    var I = (0,
        a._)((0,
        d.p)("businessAtom@tiktok/webapp-atoms", {
      businessPermission: {
        comment: !1,
        message: !1
      },
      businessAccountInfoResponse: {
        statusCode: 1,
        statusMsg: "",
        data: void 0
      },
      businessAccountInfoResponseBABC: {
        statusCode: 1,
        statusMsg: "",
        data: void 0
      }
    }), {
      rehydrationKey: "webapp.business"
    })
        , _ = (0,
        u.i)(I, function (e, t) {
      return {
        setBusinessPermission: function (e) {
          t(I, function (t) {
            return (0,
                s._)((0,
                o._)({}, t), {
              businessPermission: e
            })
          })
        },
        setBusinessAccountInfoResponse: function (e) {
          t(I, function (t) {
            return (0,
                s._)((0,
                o._)({}, t), {
              businessAccountInfoResponse: e
            })
          })
        },
        setBusinessAccountInfoResponseBABC: function (e) {
          t(I, function (t) {
            return (0,
                s._)((0,
                o._)({}, t), {
              businessAccountInfoResponseBABC: e
            })
          })
        },
        getBusinessPermissionList: function () {
          return (0,
              n._)(function () {
            var e, t, i;
            return (0,
                r.__generator)(this, function (o) {
              switch (o.label) {
                case 0:
                  return [4, (0,
                      n._)(function () {
                    return (0,
                        r.__generator)(this, function (e) {
                      return [2, c.h.get("/api/ba/business/suite/permission/list/", {
                        query: {
                          permissionList: "001004,001005"
                        },
                        baseUrlType: l.Z4.FixedWww
                      })]
                    })
                  })()];
                case 1:
                  return i = null != (t = null == (e = o.sent()) ? void 0 : e.permissionList) ? t : [],
                      this.setBusinessPermission({
                        message: i.indexOf("001004") > -1,
                        comment: i.indexOf("001005") > -1
                      }),
                      [2]
              }
            })
          }).call(this)
        },
        getBusinessAccountInfoResponse: function () {
          return (0,
              n._)(function () {
            var e;
            return (0,
                r.__generator)(this, function (t) {
              switch (t.label) {
                case 0:
                  return [4, h()];
                case 1:
                  return e = t.sent(),
                      this.setBusinessAccountInfoResponse(e),
                      [2]
              }
            })
          }).call(this)
        },
        getBusinessAccountInfoResponseBABC: function () {
          return (0,
              n._)(function () {
            var e;
            return (0,
                r.__generator)(this, function (t) {
              switch (t.label) {
                case 0:
                  return [4, h("babc_onboarding")];
                case 1:
                  return e = t.sent(),
                      this.setBusinessAccountInfoResponseBABC(e),
                      [2]
              }
            })
          }).call(this)
        }
      }
    })
        , v = _.useAtomService
        , T = _.useServiceState
        , f = _.useServiceDispatchers;
    _.getStaticApi
  },
  77214: function (e, t, i) {
    i.d(t, {
      QL: function () {
        return p
      },
      _S: function () {
        return m
      },
      mx: function () {
        return E
      }
    });
    var n = i(79066)
        , o = i(35383)
        , s = i(5377)
        , r = i(45996)
        , a = i(72516)
        , u = i(73455)
        , d = i(4676)
        , c = i(10625)
        , l = i(75434)
        , h = i(91402)
        , I = i(42646)
        , _ = (0,
        h.M)({
      csr: function (e, t) {
        return (0,
            n._)(function () {
          return (0,
              a.__generator)(this, function (i) {
            switch (i.label) {
              case 0:
                return i.trys.push([0, 2, , 3]),
                    [4, I.h.get("/api/seo/translate/item_info/", {
                      query: {
                        itemId: e,
                        targetLanguage: t
                      }
                    })];
              case 1:
                return [2, i.sent()];
              case 2:
                return i.sent(),
                    [2, {
                      statusCode: -1
                    }];
              case 3:
                return [2]
            }
          })
        })()
      },
      ssr: function (e, t) {
        return (0,
            n._)(function () {
          return (0,
              a.__generator)(this, function (i) {
            return [2, (0,
                l.yK)().service.discovery.getItemTranslation(e, t)]
          })
        })()
      }
    })
        , v = (0,
        h.M)({
      csr: function (e, t) {
        return (0,
            n._)(function () {
          return (0,
              a.__generator)(this, function (i) {
            switch (i.label) {
              case 0:
                return i.trys.push([0, 2, , 3]),
                    [4, I.h.get("/api/seo/translate/comment/", {
                      query: {
                        commentTextList: e.map(function (e) {
                          return e.text
                        }),
                        commentLanguageList: e.map(function (e) {
                          return e.lang
                        }),
                        targetLanguage: t
                      }
                    })];
              case 1:
                return [2, i.sent()];
              case 2:
                return i.sent(),
                    [2, {
                      statusCode: -1
                    }];
              case 3:
                return [2]
            }
          })
        })()
      },
      ssr: function (e, t) {
        return (0,
            n._)(function () {
          return (0,
              a.__generator)(this, function (i) {
            return [2, (0,
                l.yK)().service.discovery.getCommentsTranslation(e, t)]
          })
        })()
      }
    })
        , T = (0,
        u._)((0,
        c.p)("cla-translation@tiktok/webapp-atoms", {
      translatedUrls: [],
      videos: {},
      comments: {}
    }), {
      rehydrationKey: "cla-translation"
    })
        , f = (0,
        d.i)(T, function (e, t) {
      return {
        getVideoTranslation: function (i, u) {
          return (0,
              n._)(function () {
            var n, d;
            return (0,
                a.__generator)(this, function (a) {
              switch (a.label) {
                case 0:
                  if ((n = e(T)).videos[i])
                    return [2, n.videos[i]];
                  return [4, _(i, null != u ? u : "en")];
                case 1:
                  return d = a.sent(),
                      t(T, (0,
                          r._)((0,
                          s._)({}, n), {
                        videos: (0,
                            r._)((0,
                            s._)({}, n.videos), (0,
                            o._)({}, i, d))
                      })),
                      [2, d]
              }
            })
          })()
        },
        fetchCommentTranslation: function (i, o) {
          var u = arguments.length > 2 && void 0 !== arguments[2] && arguments[2];
          return (0,
              n._)(function () {
            var n, d, c, l;
            return (0,
                a.__generator)(this, function (a) {
              switch (a.label) {
                case 0:
                  if (n = e(T),
                  0 === (d = i.filter(function (e) {
                    return void 0 === n.comments[e.cid]
                  })).length)
                    return [2];
                  return [4, v(d.map(function (e) {
                    var t;
                    return {
                      text: e.text,
                      lang: null != (t = e.comment_language) ? t : "un"
                    }
                  }), o)];
                case 1:
                  return l = (void 0 === (c = a.sent().commentTextList) ? [] : c).reduce(function (e, t, i) {
                    return e[d[i].cid] = {
                      text: t,
                      show: u
                    },
                        e
                  }, {}),
                      t(T, (0,
                          r._)((0,
                          s._)({}, n), {
                        comments: (0,
                            s._)({}, n.comments, l)
                      })),
                      [2]
              }
            })
          })()
        },
        toggleCommentTranslation: function (i, u) {
          return (0,
              n._)(function () {
            var n, d, c, l, h, I, _, f;
            return (0,
                a.__generator)(this, function (a) {
              switch (a.label) {
                case 0:
                  if (n = i.cid,
                      c = (d = e(T)).comments[n])
                    return l = c.show,
                        [2, t(T, (0,
                            r._)((0,
                            s._)({}, d), {
                          comments: (0,
                              r._)((0,
                              s._)({}, d.comments), (0,
                              o._)({}, n, (0,
                              r._)((0,
                              s._)({}, c), {
                            show: !l
                          })))
                        }))];
                  return [4, v([{
                    text: i.text,
                    lang: null != (h = i.comment_language) ? h : "un"
                  }], u)];
                case 1:
                  if ((_ = void 0 === (I = a.sent().commentTextList) ? [] : I)[0])
                    return [2, t(T, (0,
                        r._)((0,
                        s._)({}, d), {
                      comments: (0,
                          r._)((0,
                          s._)({}, d.comments), (0,
                          o._)({}, n, {
                        text: null != (f = _[0]) ? f : i.text,
                        show: !0
                      }))
                    }))];
                  return [2]
              }
            })
          })()
        }
      }
    })
        , p = f.useAtomService
        , E = f.getStaticApi
        , m = (f.useServiceDispatchers,
        f.useServiceState)
  },
  92908: function (e, t, i) {
    i.d(t, {
      _v: function () {
        return r
      },
      fL: function () {
        return u
      },
      lu: function () {
        return d
      }
    });
    var n = i(5377)
        , o = i(45996)
        , s = i(4676)
        , r = (0,
        i(10625).p)("deviceScoreAtom@tiktok/webapp-atoms", {
      hardwareScore: -1,
      totalDeviceScore: -1
    })
        , a = (0,
        s.i)(r, function (e, t) {
      return {
        updateHardwareScore: function (e) {
          t(r, function (t) {
            return (0,
                o._)((0,
                n._)({}, t), {
              hardwareScore: e
            })
          })
        },
        updateTotalDeviceScore: function (e) {
          t(r, function (t) {
            return (0,
                o._)((0,
                n._)({}, t), {
              totalDeviceScore: e
            })
          })
        }
      }
    })
        , u = (a.useAtomService,
        a.useServiceDispatchers,
        a.useServiceState)
        , d = a.getStaticApi
  },
  95285: function () {
  },
  62085: function (e, t, i) {
    i.d(t, {
      JF: function () {
        return A
      },
      b1: function () {
        return M
      },
      CP: function () {
        return w
      },
      mZ: function () {
        return P
      },
      MR: function () {
        return y
      }
    });
    var n, o, s = i(79066), r = i(5377), a = i(45996), u = i(72516), d = i(69513), c = i(26869), l = i(18499),
        h = i(73455), I = i(4676), _ = i(10625), v = i(76446), T = i(82204), f = i(35144), p = i(90542), E = i(75064),
        m = i(96862), S = i(66772), g = {
          isOpen: !1,
          url: "",
          isRedirectToProfilePage: !1,
          closeable: !1,
          isBannerActive: !1,
          bannerEnabled: !1,
          content: {
            title: "",
            desc: "",
            btnOpenText: ""
          },
          iframeStyle: {},
          handleDownload: d.A,
          handleLogin: d.A,
          closeCallback: d.A,
          loginModalShow: !1,
          maskCloseable: !1,
          userId: "",
          groupId: "",
          enterMethod: void 0,
          pageType: v.g.Trending,
          modalType: "",
          hasCheckedPeriodicLogin: !1,
          hasCheckedPredictionLogin: !1,
          hasCheckedGuestMode: !1,
          showLoginOnLoad: !1,
          isLoginOnLoadClosed: !1,
          redirectToHomePage: !1,
          isGuestMode: !1,
          isGuestModeUI: !1
        }, L = ((n = {}).DEFAULT = "default",
            n.ENGAGEMENT = "engagement",
            n);

    function C() {
      return -1 !== (window.location.pathname + window.location.search).indexOf("recharge")
    }

    var A = (0,
        h._)((0,
        _.p)("loginAtom@tiktok/webapp-atoms", g), {
      rehydrationKey: "webapp.login"
    })
        , R = (0,
        I.i)(A, function (e, t) {
      return {
        setCloseable: function (e) {
          t(A, function (t) {
            return (0,
                a._)((0,
                r._)({}, t), {
              closeable: e
            })
          })
        },
        setUrl: function (e) {
          t(A, function (t) {
            return (0,
                a._)((0,
                r._)({}, t), {
              url: e
            })
          })
        },
        setLoginPath: function (e) {
          t(A, function (t) {
            return (0,
                a._)((0,
                r._)({}, t), {
              loginPath: e
            })
          })
        },
        setCloseCallback: function (e) {
          e && t(A, function (t) {
            return (0,
                a._)((0,
                r._)({}, t), {
              closeCallback: e
            })
          })
        },
        setIsOpen: function (e) {
          t(A, function (t) {
            return (0,
                a._)((0,
                r._)({}, t), {
              isOpen: e
            })
          })
        },
        setContent: function (e) {
          e && t(A, function (t) {
            return (0,
                a._)((0,
                r._)({}, t), {
              content: e
            })
          })
        },
        setHandleDownload: function (e) {
          e && t(A, function (t) {
            return (0,
                a._)((0,
                r._)({}, t), {
              handleDownload: e
            })
          })
        },
        setHandleLogin: function (e) {
          e && t(A, function (t) {
            return (0,
                a._)((0,
                r._)({}, t), {
              handleLogin: e
            })
          })
        },
        setIframeStyle: function (e) {
          t(A, function (t) {
            return (0,
                a._)((0,
                r._)({}, t), {
              iframeStyle: e
            })
          })
        },
        setModalType: function (e) {
          t(A, function (t) {
            return (0,
                a._)((0,
                r._)({}, t), {
              modalType: e
            })
          })
        },
        setLoginModalShow: function (e) {
          if (t(A, function (t) {
            return (0,
                a._)((0,
                r._)({}, t), {
              loginModalShow: e
            })
          }),
          !e && window.byted_acrawler) {
            var i, n, o = (0,
                T.c)().vgeo;
            null == (i = (n = window.byted_acrawler).setUserMode) || i.call(n, (0,
                m.n)({
              isVA: "VGeo-US" === o,
              isLogin: !1,
              isFTC: !1,
              isHighRisk: !1
            }))
          }
        },
        setMaskCloseable: function (e) {
          t(A, function (t) {
            return (0,
                a._)((0,
                r._)({}, t), {
              maskCloseable: e
            })
          })
        },
        setPageType: function (e) {
          t(A, function (t) {
            return (0,
                a._)((0,
                r._)({}, t), {
              pageType: e
            })
          })
        },
        setUserId: function (e) {
          t(A, function (t) {
            return (0,
                a._)((0,
                r._)({}, t), {
              userId: e
            })
          })
        },
        setGroupId: function (e) {
          t(A, function (t) {
            return (0,
                a._)((0,
                r._)({}, t), {
              groupId: e
            })
          })
        },
        setLastGroupId: function (e) {
          t(A, function (t) {
            return (0,
                a._)((0,
                r._)({}, t), {
              lastGroupId: e
            })
          })
        },
        setEnterMethod: function (e) {
          t(A, function (t) {
            return (0,
                a._)((0,
                r._)({}, t), {
              enterMethod: e
            })
          })
        },
        setModalImage: function (e) {
          t(A, function (t) {
            return (0,
                a._)((0,
                r._)({}, t), {
              modalImage: e
            })
          })
        },
        setPopupType: function (e) {
          t(A, function (t) {
            return (0,
                a._)((0,
                r._)({}, t), {
              popupType: e
            })
          })
        },
        setIsRedirectToProfilePage: function (e) {
          t(A, function (t) {
            return (0,
                a._)((0,
                r._)({}, t), {
              isRedirectToProfilePage: e
            })
          })
        },
        setIsGuestMode: function (e) {
          t(A, function (t) {
            return (0,
                a._)((0,
                r._)({}, t), {
              isGuestMode: e
            })
          })
        },
        setIsGuestModeUI: function (e) {
          t(A, function (t) {
            return (0,
                a._)((0,
                r._)({}, t), {
              isGuestModeUI: e
            })
          })
        },
        setPredictionPayload: function (e) {
          t(A, function (t) {
            return (0,
                a._)((0,
                r._)({}, t), {
              predictionPayload: e
            })
          })
        },
        setIsLinkPhoneOrEmail: function (e) {
          t(A, function (t) {
            return (0,
                a._)((0,
                r._)({}, t), {
              isLinkPhoneOrEmail: e
            })
          })
        },
        openModal: function (i) {
          var n, o, s = this, u = i.modalContainerStyle, d = i.url, h = i.isRedirectToProfilePage,
              I = void 0 !== h && h, _ = i.loginPath, T = i.isSignup, E = i.closeable, m = void 0 === E || E,
              g = i.query, R = void 0 === g ? {} : g, y = i.iframeStyle, P = void 0 === y ? {} : y, M = i.content,
              w = i.handleDownload, O = i.handleLogin, B = i.closeCallback, D = i.maskCloseable, N = void 0 !== D && D,
              U = i.userId, b = i.enterMethod, F = i.bizActionSource, G = i.pageType,
              k = void 0 === G ? v.g.Unknown : G, V = i.popupType, W = i.groupId, x = i.lastGroupId, H = i.isGuestMode,
              Y = i.isGuestModeUI, q = i.predictionPayload, z = i.isLinkPhoneOrEmail, K = (0,
                  f.x)().language, $ = e(S.A).bizContext, Q = null != d ? d : (0,
                  c.stringifyUrl)({
                url: null != _ ? _ : "/".concat(T ? "signup" : "login"),
                query: (0,
                    r._)({
                  lang: K,
                  is_modal: 1,
                  hide_close_btn: 1,
                  event_name: T ? "enter_sign_up" : null,
                  type: C() ? "recharge" : "",
                  enter_from: p.f.commonParams.page_name
                }, R)
              }, {
                skipNull: !0
              }), j = null != b ? b : R.enter_method, X = null != W ? W : R.group_id, Z = null != x ? x : R.last_group_id,
              J = null != (o = null != (n = R.type) ? n : C() ? "recharge" : "") ? o : "";
          !Q.match(/\/login|\/signup|\/link-phone-or-email/) || (null == $ ? void 0 : $.isMobile) ? t(A, function (e) {
            return (0,
                a._)((0,
                r._)({}, e), {
              modalContainerStyle: u,
              url: Q,
              isRedirectToProfilePage: I,
              closeable: m,
              isOpen: !0,
              content: null != M ? M : e.content,
              handleDownload: null != w ? w : e.handleDownload,
              handleLogin: null != O ? O : e.handleLogin,
              iframeStyle: P,
              maskCloseable: N,
              closeCallback: null != B ? B : e.closeCallback,
              userId: U,
              enterMethod: j,
              pageType: k,
              popupType: V,
              groupId: X,
              lastGroupId: Z,
              isLinkPhoneOrEmail: null != z && z,
              bizActionSource: F
            })
          }) : (0,
              l.unstable_batchedUpdates)(function () {
            t(A, function (e) {
              return (0,
                  a._)((0,
                  r._)({}, e), {
                modalContainerStyle: u,
                url: Q,
                isRedirectToProfilePage: I,
                modalType: J,
                closeable: m,
                popupType: V,
                enterMethod: j,
                modalImage: function (e) {
                  if (e)
                    return ["click_like", "click_comment", "click_follow", "share_button", "click_like_comment", "click_reply_comment", "click_dislike", "click_favorite"].includes(e) ? L.ENGAGEMENT : L.DEFAULT
                }(j),
                closeCallback: null != B ? B : e.closeCallback,
                groupId: X,
                lastGroupId: Z,
                isGuestMode: null != H && H,
                isGuestModeUI: null != Y && Y,
                predictionPayload: null != q ? q : "",
                isLinkPhoneOrEmail: null != z && z,
                bizActionSource: F,
                userId: U
              })
            }),
                s.setLoginModalShow(!0)
          })
        },
        setCheckPeriodicLogin: function (e) {
          t(A, function (e) {
            return (0,
                a._)((0,
                r._)({}, e), {
              hasCheckedPeriodicLogin: !0
            })
          }),
              t(A, function (t) {
                return (0,
                    a._)((0,
                    r._)({}, t), {
                  showLoginOnLoad: t.showLoginOnLoad || e.showLoginOnLoad
                })
              })
        },
        setCheckPredictionLogin: function (e) {
          t(A, function (e) {
            return (0,
                a._)((0,
                r._)({}, e), {
              hasCheckedPredictionLogin: !0
            })
          }),
              t(A, function (t) {
                return (0,
                    a._)((0,
                    r._)({}, t), {
                  showLoginOnLoad: t.showLoginOnLoad || e.showLoginOnLoad
                })
              })
        },
        setCheckGuestModeLogin: function (e) {
          t(A, function (e) {
            return (0,
                a._)((0,
                r._)({}, e), {
              hasCheckedGuestMode: !0
            })
          }),
              t(A, function (t) {
                return (0,
                    a._)((0,
                    r._)({}, t), {
                  showLoginOnLoad: t.showLoginOnLoad || e.showLoginOnLoad
                })
              })
        },
        setIsLoginOnLoadClosed: function (e) {
          t(A, function (t) {
            return (0,
                a._)((0,
                r._)({}, t), {
              isLoginOnLoadClosed: e.isLoginOnLoadClosed
            })
          })
        },
        setClearShowLoginOnLoad: function () {
          t(A, function (e) {
            return (0,
                a._)((0,
                r._)({}, e), {
              hasCheckedPeriodicLogin: !1
            })
          }),
              t(A, function (e) {
                return (0,
                    a._)((0,
                    r._)({}, e), {
                  hasCheckedPredictionLogin: !1
                })
              }),
              t(A, function (e) {
                return (0,
                    a._)((0,
                    r._)({}, e), {
                  showLoginOnLoad: !1
                })
              })
        },
        justCloseTheLoginModal: function () {
          t(A, function (e) {
            return (0,
                a._)((0,
                r._)({}, e), {
              url: "",
              loginModalShow: !1,
              isOpen: !1,
              modalContainerStyle: void 0
            })
          })
        },
        closeModal: function (i) {
          var n = i.enter_method;
          if (!i.disableReport) {
            o || (o = E.$F.getInstance()),
                o.loginNotifyClose({
                  enter_method: n
                });
            var s = e(A).closeCallback;
            (void 0 === s ? d.A : s)(),
                t(A, function (e) {
                  return (0,
                      a._)((0,
                      r._)({}, e), {
                    isOpen: !1,
                    url: "",
                    groupId: void 0,
                    modalContainerStyle: void 0
                  })
                })
          }
        },
        setIsBannerActive: function (e) {
          t(A, function (t) {
            return (0,
                a._)((0,
                r._)({}, t), {
              isBannerActive: e
            })
          })
        },
        setLastAppleToken: function (e) {
          t(A, function (t) {
            return (0,
                a._)((0,
                r._)({}, t), {
              lastAppleAuthInfo: e
            })
          })
        },
        preLogoutCheckWithRedirection: function () {
          return (0,
              s._)(function () {
            return (0,
                u.__generator)(this, function (e) {
              return [2, {}]
            })
          })()
        },
        defineLogoutCheckImpl: function (e) {
          t(A, function (t) {
            return (0,
                a._)((0,
                r._)({}, t), {
              doPreLogoutCheck: e
            })
          })
        }
      }
    })
        , y = R.useAtomService
        , P = R.useServiceState
        , M = R.useServiceDispatchers
        , w = R.getStaticApi
  },
  87803: function (e, t, i) {
    i.d(t, {
      Fc: function () {
        return r
      },
      Lq: function () {
        return a
      },
      MW: function () {
        return s
      },
      W$: function () {
        return n
      },
      eh: function () {
        return o
      },
      oG: function () {
        return u
      }
    });
    var n = "non_personalized_feeds_web"
        , o = "personalized_search_disabled_list"
        , s = "personalized_feed_disabled_list"
        , r = "personalized_feed_disabled_not_login"
        , a = "personalized_feed_ppf_disabled_list"
        , u = "webapp_popup_personalization_toast"
  },
  83751: function (e, t, i) {
    i.d(t, {
      HY: function () {
        return E
      },
      JW: function () {
        return m
      },
      PJ: function () {
        return T
      },
      Qi: function () {
        return S
      },
      WH: function () {
        return f
      },
      nH: function () {
        return g
      }
    });
    var n, o = i(79066), s = i(5377), r = i(45996), a = i(72516), u = i(73455), d = i(4676), c = i(10625), l = i(11110),
        h = i(35144), I = i(56605), _ = i(32049), v = i(15771), T = function (e) {
          return !e.isFeedPersonalized
        }, f = (0,
            u._)((0,
            c.p)("personalizationAtom@tiktok/webapp-atoms", (n = function () {
          if ((0,
              _.fU)())
            return "";
          var e = ((0,
              I.YI)(l.Ow) || {}).user
              , t = (void 0 === e ? {} : e).uid;
          return void 0 === t ? "" : t
        }(),
            (0,
                v.mx)(void 0, n) ? {
              isSearchPersonalized: !1,
              isFeedPersonalized: !1,
              isSearchConfigInitialized: !1,
              isFeedConfigInitialized: !1,
              isManageModalOpen: !1,
              isExplanationModalOpen: !1,
              isShowingToast: !1
            } : {
              isSearchPersonalized: !0,
              isFeedPersonalized: !0,
              isSearchConfigInitialized: !1,
              isFeedConfigInitialized: !1,
              isManageModalOpen: !1,
              isExplanationModalOpen: !1,
              isShowingToast: !1
            })), {
          rehydrationKey: "webapp.personalization"
        }), p = (0,
            d.i)(f, function (e, t) {
          return {
            setIsShowingToast: function (e) {
              t(f, function (t) {
                return (0,
                    r._)((0,
                    s._)({}, t), {
                  isShowingToast: e
                })
              })
            },
            setIsManageModalOpen: function (e) {
              t(f, function (t) {
                return (0,
                    r._)((0,
                    s._)({}, t), {
                  isManageModalOpen: e
                })
              })
            },
            setIsExplanationModalOpen: function (e) {
              t(f, function (t) {
                return (0,
                    r._)((0,
                    s._)({}, t), {
                  isExplanationModalOpen: e
                })
              })
            },
            setIsSearchPersonalized: function (e) {
              t(f, function (t) {
                return (0,
                    r._)((0,
                    s._)({}, t), {
                  isSearchPersonalized: e
                })
              })
            },
            setIsFeedPersonalized: function (e) {
              t(f, function (t) {
                return (0,
                    r._)((0,
                    s._)({}, t), {
                  isFeedPersonalized: e
                })
              })
            },
            setSearchConfigInitialized: function (e) {
              t(f, function (t) {
                return (0,
                    r._)((0,
                    s._)({}, t), {
                  isSearchConfigInitialized: e
                })
              })
            },
            setFeedConfigInitialized: function (e) {
              t(f, function (t) {
                return (0,
                    r._)((0,
                    s._)({}, t), {
                  isFeedConfigInitialized: e
                })
              })
            },
            init: function (i) {
              return (0,
                  o._)(function () {
                var n, o, u, d, c, l, I, _, T;
                return (0,
                    a.__generator)(this, function (a) {
                  return o = i.isFeed,
                      u = (0,
                          h.x)(),
                      c = (d = e(f)).isSearchConfigInitialized,
                      l = d.isFeedConfigInitialized,
                  c && !o || l && o || (_ = null != (I = null == (n = u.user) ? void 0 : n.uid) ? I : "",
                      T = (0,
                          v.eI)(_, o),
                      o ? t(f, function (e) {
                        return (0,
                            r._)((0,
                            s._)({}, e), {
                          isFeedPersonalized: !T,
                          isFeedConfigInitialized: !0
                        })
                      }) : t(f, function (e) {
                        return (0,
                            r._)((0,
                            s._)({}, e), {
                          isSearchPersonalized: !T,
                          isSearchConfigInitialized: !0
                        })
                      })),
                      [2]
                })
              })()
            }
          }
        }), E = p.useAtomService, m = p.useServiceState, S = p.useServiceDispatchers, g = p.getStaticApi
  },
  15771: function (e, t, i) {
    i.d(t, {
      Sw: function () {
        return u
      },
      eI: function () {
        return s
      },
      i1: function () {
        return a
      },
      mx: function () {
        return d
      }
    });
    var n = i(75434)
        , o = i(87803)
        , s = function (e, t, i, s) {
      if (!e)
        return !!t && "1" === (0,
            n.MJ)(o.Fc);
      var r = s ? o.Lq : t ? o.MW : o.eh
          , a = (0,
          n.MJ)(r);
      if (a)
        try {
          var u = i ? decodeURIComponent(a) : a;
          return JSON.parse(u).includes(e)
        } catch (e) {
          console.warn("getIsNonPersonalized get JSON failed")
        }
      return !1
    }
        , r = function (e, t, i) {
      var n, o = !1;
      return e && (o = s(null != (n = null == t ? void 0 : t.uid) ? n : "", !0, i)),
          o
    }
        , a = function (e, t) {
      return r("v2" === t, e, !0)
    }
        , u = function () {
      var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "";
      return s(e, void 0, void 0, !0)
    }
        , d = function (e) {
      var t, i = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "",
          n = (null == e || null == (t = e.parameters[o.W$]) ? void 0 : t.vid) === "v2", r = u(i), a = !1;
      return (n || r) && (a = s(i, !0, !1)),
          a
    }
  },
  92876: function (e, t, i) {
    i.d(t, {
      L: function () {
        return o
      },
      z: function () {
        return s
      }
    });
    var n, o = ((n = {})[n.Low = 0] = "Low",
        n[n.Medium = 1] = "Medium",
        n[n.High = 2] = "High",
        n), s = {
      hardware_score_avg: {
        levels: [{
          threshold: 6.5,
          target: 0
        }, {
          threshold: 7.6,
          target: 1
        }, {
          threshold: 10,
          target: 2
        }],
        default: {
          threshold: 10,
          target: 2
        }
      },
      network_score_avg: {
        levels: [{
          threshold: 6,
          target: 0
        }, {
          threshold: 8.5,
          target: 1
        }, {
          threshold: 10,
          target: 2
        }],
        default: {
          threshold: 10,
          target: 2
        }
      }
    }
  },
  6372: function (e, t, i) {
    i.d(t, {
      BX: function () {
        return C
      },
      u4: function () {
        return L
      },
      tR: function () {
        return A
      }
    });
    var n = i(5377)
        , o = i(93085)
        , s = i(73455)
        , r = i(4676)
        , a = i(10625)
        , u = i(90542)
        , d = i(35104)
        , c = i(66772)
        , l = i(26869)
        , h = i(35144)
        , I = i(72961)
        , _ = i(92876)
        , v = function (e) {
      var t, i = e.currentPortraitValue, n = e.portraitStrategy, o = e.defaultStrategy, s = e.enable, r = e.portraitKey,
          a = null == (t = (0,
              l.parse)(location.search)) ? void 0 : t[r];
      if (!a && (!s || !i || isNaN(i)))
        return o;
      for (var u = a ? Number(a) : i, d = (0,
          I.L$)(n).levels, c = void 0 === d ? [] : d, h = 0; h < c.length; h++) {
        var _ = c[h];
        if (_.threshold > Number(u))
          return _
      }
      return o
    }
        , T = function (e) {
      var t, i, n, o, s, r = (0,
              h.x)().abTestVersion,
          a = null != (o = null == r || null == (i = r.parameters) || null == (t = i.vv_avg_per_day_portrait) ? void 0 : t.vid) ? o : {
            vid: "v0"
          }, u = null == r || null == (n = r.parameters.change_list_length_new) ? void 0 : n.vid,
          d = null != (s = null == a ? void 0 : a.vid) ? s : "v0", c = {
            target: Number(u)
          };
      return v({
        currentPortraitValue: Number(null != e ? e : 0),
        portraitStrategy: a,
        defaultStrategy: c,
        enable: "v0" !== d,
        portraitKey: "vv_avg_per_day"
      }).target
    }
        , f = function (e) {
      var t, i, n, o, s = (0,
              h.x)().abTestVersion,
          r = null != (n = null == s || null == (i = s.parameters) || null == (t = i.ff_avg_duration_portrait) ? void 0 : t.vid) ? n : {
            vid: "v0"
          }, a = null != (o = null == r ? void 0 : r.vid) ? o : "v0", u = {
            target: _.L.High
          };
      return v({
        currentPortraitValue: Number(null != e ? e : 0),
        portraitStrategy: r,
        defaultStrategy: u,
        enable: "v0" !== a,
        portraitKey: "ff_duration_avg"
      }).target
    }
        , p = function (e, t) {
      var i = {
        target: _.L.High
      };
      return v({
        currentPortraitValue: Number(null != e ? e : 0),
        portraitStrategy: _.z[t],
        defaultStrategy: i,
        enable: !0,
        portraitKey: t
      }).target
    }
        , E = function (e) {
      for (var t, i, n, o, s, r, a, u, d = Object.keys(e), c = (0,
          h.x)().webIdCreatedTime, l = Date.now() / 1e3 - (void 0 === c ? 0 : c) < 86400, I = 0, _ = 0, v = 0, T = 0; T < d.length; T++) {
        var f = e[d[T]]
            , p = f.type;
        f.rawValue && ("user" === p ? I++ : "device" === p ? _++ : v++)
      }
      return {
        portrait_count: I + _ + v,
        user_portrait_cnt: I,
        device_portrait_cnt: _,
        item_portrait_cnt: v,
        ff_avg_duration_portrait: Number(null != (s = null == e || null == (t = e.ff_duration_avg) ? void 0 : t.rawValue) ? s : 0),
        vv_avg_per_day: Number(null != (r = null == e || null == (i = e.vv_avg_per_day) ? void 0 : i.rawValue) ? r : 0),
        network_score_avg: Number(null != (a = null == e || null == (n = e.network_score_avg) ? void 0 : n.rawValue) ? a : 0),
        hardware_score_avg: Number(null != (u = null == e || null == (o = e.hardware_score_avg) ? void 0 : o.rawValue) ? u : 0),
        is_new_user: +!!l
      }
    }
        , m = {
      rawValue: "0",
      target: 0,
      type: "device"
    }
        , S = (0,
        s._)((0,
        a.p)("portraitHubAtom@tiktok/webapp-atoms", {
      vv_avg_per_day: m,
      ff_duration_avg: m,
      network_score_avg: m,
      hardware_score_avg: m
    }), {
      rehydrationKey: "webapp.portraitHub"
    })
        , g = (0,
        r.i)(S, function (e, t) {
      return {
        initPortraitHub: function () {
          var i, s = e(c.A).bizContext, r = null != (i = null == s ? void 0 : s.solariaPortrait) ? i : {},
              a = r.vv_avg_per_day, l = r.ff_duration_avg, h = r.network_score_avg, I = r.hardware_score_avg, _ = T(a),
              v = f(l), m = p(h, "network_score_avg"), g = p(I, "hardware_score_avg"), L = {
                vv_avg_per_day: {
                  rawValue: a,
                  target: _,
                  type: "user"
                },
                ff_duration_avg: {
                  rawValue: l,
                  target: v,
                  type: "device"
                },
                network_score_avg: {
                  rawValue: h,
                  target: m,
                  type: "device"
                },
                hardware_score_avg: {
                  rawValue: I,
                  target: g,
                  type: "device"
                }
              };
          t(S, function (e) {
            return (0,
                n._)({}, e, L)
          });
          var C = E(L);
          d.a.handlePortraitInit(C);
          var A = (0,
              o.A)(null == s ? void 0 : s.solariaPortrait, function (e) {
            return Number(e)
          });
          u.f.config({
            commonHeaderConfig: {
              "header.custom": (0,
                  n._)({}, A)
            }
          })
        },
        getPortraitTarget: function (t) {
          return e(S)[t].target
        }
      }
    })
        , L = (g.useAtomService,
        g.useServiceDispatchers)
        , C = g.useServiceState
        , A = g.getStaticApi
  },
  20122: function (e, t, i) {
    i.d(t, {
      hu: function () {
        return T
      },
      fL: function () {
        return v
      },
      A8: function () {
        return _
      },
      GU: function () {
        return p
      },
      go: function () {
        return E
      },
      TD: function () {
        return I
      }
    });
    var n = i(79066)
        , o = i(35383)
        , s = i(5377)
        , r = i(45996)
        , a = i(72516)
        , u = i(4676)
        , d = i(10625)
        , c = i(65030)
        , l = i(42646)
        , h = i(56904)
        , I = (0,
        d.p)("searchGeneralItemListAtom@tiktok/webapp-atoms", c.hA)
        , _ = (0,
        d.p)("searchVideoItemListAtom@tiktok/webapp-atoms", c.hA)
        , v = (0,
        d.p)("searchPhotoItemListAtom@tiktok/webapp-atoms", c.hA)
        , T = (0,
        d.p)("searchLiveItemListAtom@tiktok/webapp-atoms", {})
        , f = (0,
        u.i)(T, function (e, t) {
      return {
        checkLIVERelevance: function (e) {
          return (0,
              n._)(function () {
            var t, i, o;
            return (0,
                a.__generator)(this, function (s) {
              switch (s.label) {
                case 0:
                  var r;
                  return [4, (r = {
                    query: e
                  },
                      (0,
                          n._)(function () {
                        return (0,
                            a.__generator)(this, function (e) {
                          return [2, l.h.get("/webcast/room/search/", {
                            query: r,
                            baseUrlType: h.Z4.Webcast
                          })]
                        })
                      })())];
                case 1:
                  if (!(o = void 0 === (i = (void 0 === (t = s.sent().data) ? {} : t).room_list) ? [] : i).length)
                    return [2];
                  return this.setItems(o),
                      [2]
              }
            })
          }).call(this)
        },
        setItems: function (e) {
          var i = e.reduce(function (e, t) {
            var i;
            return (0,
                r._)((0,
                s._)({}, e), (0,
                o._)({}, null != (i = t.id_str) ? i : "", t))
          }, {});
          t(T, function (e) {
            return (0,
                s._)({}, e, i)
          })
        }
      }
    })
        , p = f.useAtomService
        , E = (f.useServiceState,
        f.useServiceDispatchers,
        f.getStaticApi)
  },
  12794: function (e, t, i) {
    i.d(t, {
      i: function () {
        return a
      }
    });
    var n, o = i(35383), s = i(48007), r = i(8561), a = (n = {},
        (0,
            o._)(n, s.m33.FollowRelationUnknown, r.yf.UNKNOW),
        (0,
            o._)(n, s.m33.NoRelationStatus, r.yf.NONE),
        (0,
            o._)(n, s.m33.FollowingStatus, r.yf.FOLLOW),
        (0,
            o._)(n, s.m33.FollowEachOtherStatus, r.yf.MUTAL),
        (0,
            o._)(n, s.m33.FollowRequestStatus, r.yf.FOLLOWING_REQUEST),
        n)
  },
  35379: function (e, t, i) {
    i.d(t, {
      Gp: function () {
        return b
      },
      p9: function () {
        return D
      },
      eI: function () {
        return F
      },
      nW: function () {
        return G
      },
      JY: function () {
        return U
      }
    });
    var n = i(79066)
        , o = i(35383)
        , s = i(5377)
        , r = i(45996)
        , a = i(16327)
        , u = i(72516)
        , d = i(73455)
        , c = i(4676)
        , l = i(10625)
        , h = i(64781)
        , I = i(1366)
        , _ = i(8561)
        , v = i(48007)
        , T = i(47149)
        , f = i(4234)
        , p = i(77060)
        , E = i(35702)
        , m = i(92932)
        , S = i(57007)
        , g = i(13495)
        , L = i(7871)
        , C = i(12794)
        , A = i(6586)
        , R = i(75434)
        , y = i(91402)
        , P = i(64124)
        , M = i(42646)
        , w = i(56904)
        , O = (0,
        y.M)({
      csr: function (e) {
        return (0,
            n._)(function () {
          var t;
          return (0,
              u.__generator)(this, function (i) {
            return (t = (0,
                P.Ni)("userDetail")) ? [2, t] : [2, M.h.get("/api/user/detail/", {
              query: e,
              baseUrlType: w.Z4.FixedWww
            })]
          })
        })()
      },
      ssr: function (e) {
        return (0,
            n._)(function () {
          var t, i, n, o, a, d, c, l;
          return (0,
              u.__generator)(this, function (u) {
            switch (u.label) {
              case 0:
                return t = (0,
                    R.yK)(),
                    i = e.uniqueId,
                    n = e.secUid,
                    o = e.userId,
                    [4, Promise.all([t.service.webapp.data.getUserInfo({
                      uniqueId: i,
                      secUid: n,
                      userId: o
                    }), t.service.location.getNeedFix()])];
              case 1:
                return d = (a = A._.apply(void 0, [u.sent(), 2]))[0],
                    c = a[1],
                0 !== (l = d.statusCode) && 10222 !== l && (t._statusCode = 404),
                    [2, (0,
                        r._)((0,
                        s._)({}, d), {
                      needFix: c
                    })]
            }
          })
        })()
      }
    })
        , B = i(36084)
        , D = (0,
        d._)((0,
        l.p)("userAtom@tiktok/webapp-atoms", {
      users: {},
      stats: {}
    }), {
      rehydrationKey: "webapp.user"
    })
        , N = (0,
        c.i)(D, function (e, t) {
      return {
        multiSetUser: function (i) {
          var n = e(D)
              , o = {};
          i.forEach(function (e) {
            o[e.uniqueId] = (0,
                B.HF)(n.users[e.uniqueId], e)
          }),
              t(D, (0,
                  r._)((0,
                  s._)({}, n), {
                users: (0,
                    s._)({}, n.users, o)
              }))
        },
        setUser: function (e) {
          var i = !(arguments.length > 1) || void 0 === arguments[1] || arguments[1];
          t(D, function (t) {
            return (0,
                r._)((0,
                s._)({}, t), {
              users: (0,
                  r._)((0,
                  s._)({}, t.users), (0,
                  o._)({}, e.uniqueId, (0,
                  B.HF)(t.users[e.uniqueId], e, i)))
            })
          })
        },
        setUserRelation: function (i) {
          var n, a = i.uniqueId, u = i.relation, d = i.shouldUpdateFollowed, c = i.shouldUpdateFollower, l = e(D),
              h = l.users[a];
          if (h) {
            var I = (0,
                r._)((0,
                s._)({}, h), {
              relation: u
            });
            d && (I.extraInfo = (0,
                r._)((0,
                s._)({}, I.extraInfo), {
              followed: (0,
                  m.z)(u, null == (n = I.extraInfo) ? void 0 : n.followed)
            })),
            c && (I.extraInfo = (0,
                r._)((0,
                s._)({}, I.extraInfo), {
              followerStatus: (0,
                  m.L)(u)
            })),
                t(D, (0,
                    r._)((0,
                    s._)({}, l), {
                  users: (0,
                      r._)((0,
                      s._)({}, l.users), (0,
                      o._)({}, a, I))
                }))
          }
        },
        setUserStats: function (e) {
          var i = e.uniqueId
              , n = e.stats
              , a = e.statsV2;
          t(D, function (e) {
            return (0,
                r._)((0,
                s._)({}, e), {
              stats: (0,
                  r._)((0,
                  s._)({}, e.stats), (0,
                  o._)({}, i, (0,
                  B.XY)({
                stats: n,
                statsV2: a
              })))
            })
          })
        },
        multiSetUserStats: function (i) {
          var n = e(D)
              , o = i.reduce(function (e, t) {
            var i = t.uniqueId
                , n = t.stats
                , o = t.statsV2;
            return e[i] = (0,
                B.XY)({
              stats: n,
              statsV2: o
            }),
                e
          }, (0,
              s._)({}, n.stats));
          t(D, (0,
              r._)((0,
              s._)({}, n), {
            stats: o
          }))
        },
        getUserDetail: function (e) {
          return (0,
              n._)(function () {
            var t;
            return (0,
                u.__generator)(this, function (i) {
              switch (i.label) {
                case 0:
                  return i.trys.push([0, 2, , 3]),
                      [4, O(e)];
                case 1:
                  return ((t = i.sent()).statusCode === S.s.Ok || t.statusCode === S.s.UserPrivate) && t.userInfo ? (this.setUser((0,
                      r._)((0,
                      s._)({
                    uniqueIdModifyTime: 0
                  }, t.userInfo.user), {
                    extraInfo: {
                      statusCode: t.statusCode
                    }
                  })),
                      this.setUserStats({
                        stats: (0,
                            r._)((0,
                            s._)({}, t.userInfo.stats), {
                          needFix: !1
                        }),
                        statsV2: t.userInfo.statsV2,
                        uniqueId: t.userInfo.user.uniqueId
                      })) : console.warn("Get user detail failed for getting wrong response"),
                      [2, t];
                case 2:
                  return i.sent(),
                      [2, {
                        statusCode: S.s.UnknownError
                      }];
                case 3:
                  return [2]
              }
            })
          }).call(this)
        },
        postCommitFollowUser: function (t) {
          return (0,
              n._)(function () {
            var i, d, c, l, m, A, R, y, P, O, N, U, b, F, G, k, V, W, x, H, Y, q, z, K, $;
            return (0,
                u.__generator)(this, function (Q) {
              var j, X;
              switch (Q.label) {
                case 0:
                  if (Q.trys.push([0, 5, , 6]),
                      !(i = e(D).users[t.uniqueId]))
                    return [2];
                  if (d = (0,
                      L.T)(),
                      c = i.id,
                      m = void 0 === (l = i.secUid) ? "" : l,
                      R = void 0 === (A = i.relation) ? _.yf.UNKNOW : A,
                      P = {
                        type: +((y = (0,
                            B.gN)(R)) === v.G1Q.Follow),
                        action_type: +(y === v.G1Q.Follow),
                        user_id: c,
                        sec_user_id: m,
                        from: 18,
                        channel_id: S.F.Hot,
                        from_pre: 0
                      },
                      O = t.uniqueId,
                      N = t.useFollowV2,
                      U = t.resetWebappQuery,
                      b = t.group_id,
                      G = void 0 === (F = t.enter_method) ? T.c.ClickNormalFollow : F,
                      k = t.action_position,
                      V = (0,
                          a._)(t, ["uniqueId", "useFollowV2", "resetWebappQuery", "group_id", "enter_method", "action_position"]),
                      this.setUserRelation({
                        uniqueId: O,
                        relation: (0,
                            B.A7)({
                          current: R,
                          targetUser: i
                        })
                      }),
                      !N)
                    return [3, 2];
                  return [4, (j = P,
                      (0,
                          n._)(function () {
                        return (0,
                            u.__generator)(this, function (e) {
                          return [2, M.h.post("/api/follow/", {
                            signal: new AbortController().signal,
                            query: (0,
                                r._)((0,
                                s._)({}, j), {
                              fromWeb: 1
                            }),
                            baseUrlType: w.Z4.FixedWww,
                            headers: (0,
                                o._)({}, w.nk, M.h.csrfToken)
                          })]
                        })
                      })())];
                case 1:
                  return x = Q.sent(),
                      [3, 4];
                case 2:
                  return [4, (X = P,
                      (0,
                          n._)(function () {
                        return (0,
                            u.__generator)(this, function (e) {
                          return [2, M.h.post("/api/commit/follow/user/", {
                            query: (0,
                                r._)((0,
                                s._)({}, X), {
                              fromWeb: 1
                            }),
                            baseUrlType: w.Z4.FixedWww,
                            headers: (0,
                                o._)({}, w.nk, M.h.csrfToken)
                          })]
                        })
                      })())];
                case 3:
                  x = Q.sent(),
                      Q.label = 4;
                case 4:
                  return H = (W = x).status_code,
                      Y = W.follow_status,
                      H === S.s.UserInboxFollowBan ? E.F.open({
                        content: d("inbox_follow_failed_banned"),
                        duration: 3,
                        widthType: "half"
                      }) : H === S.s.UnknownError ? E.F.open({
                        content: d("inbox_follow_failed_noconnection"),
                        duration: 3,
                        widthType: "half"
                      }) : H !== S.s.Ok ? E.F.open({
                        content: d("inbox_follow_failed_other"),
                        duration: 3,
                        widthType: "half"
                      }) : (0,
                          g.G)(H, [S.s.UserInboxFollowBan, S.s.UnknownError, S.s.Ok]),
                      f.ti.handleFollowUser((0,
                          r._)((0,
                          s._)({}, V), {
                        status_code: H,
                        follow_status: Y,
                        group_id: b,
                        enter_method: G,
                        action_position: k,
                        to_user_id: c,
                        author_id: c,
                        follow_type: Y === v.m33.FollowEachOtherStatus ? "mutual" : "single",
                        is_private: +(Y === v.m33.FollowRequestStatus)
                      }), P.type),
                  V.is_ad_event && V.tag && V.value && V.log_extra && P.type === v.G1Q.Unfollow && (q = V.tag,
                      z = V.value,
                      K = V.log_extra,
                      p.pg.handleFollowCancel({
                        log_extra: K,
                        tag: q,
                        value: z,
                        is_ad_event: "1"
                      })),
                      H === S.s.Ok ? (this.setUserRelation({
                        uniqueId: O,
                        relation: C.i[Y],
                        shouldUpdateFollowed: !0
                      }),
                      U && ($ = ["user", O],
                          (0,
                              I.performManualOptimisticUpdate)($, (0,
                              h.eS)({
                            uniqueId: O
                          })))) : this.setUserRelation({
                        uniqueId: O,
                        relation: R
                      }),
                      [3, 6];
                case 5:
                  return Q.sent(),
                      [3, 6];
                case 6:
                  return [2]
              }
            })
          }).call(this)
        },
        blockOrUnblockUser: function (e) {
          return (0,
              n._)(function () {
            var t, i, a, d, c, l;
            return (0,
                u.__generator)(this, function (v) {
              switch (v.label) {
                case 0:
                  var T;
                  return v.trys.push([0, 2, , 3]),
                      t = (0,
                          L.T)(),
                      i = e.secUid,
                      a = e.isBlock,
                      d = e.uniqueId,
                      c = e.resetWebappQuery,
                      [4, (T = {
                        sec_user_id: null != i ? i : "",
                        block_type: +!a
                      },
                          (0,
                              n._)(function () {
                            return (0,
                                u.__generator)(this, function (e) {
                              return [2, M.h.post("/api/user/block/", {
                                query: (0,
                                    r._)((0,
                                    s._)({}, T), {
                                  source: 3
                                }),
                                baseUrlType: w.Z4.FixedWww,
                                headers: (0,
                                    o._)({}, w.nk, M.h.csrfToken)
                              })]
                            })
                          })())];
                case 1:
                  return v.sent().status_code === S.s.Ok && (E.F.open({
                    content: t(a ? "webapp_mig_unblocked" : "webapp_mig_blocked"),
                    duration: 3,
                    e2eTag: "block-toast"
                  }),
                      this.setUserRelation({
                        uniqueId: d,
                        relation: a ? _.yf.NONE : _.yf.BLOCK
                      }),
                  c && (l = ["user", d],
                      (0,
                          I.performManualOptimisticUpdate)(l, (0,
                          h.IX)({
                        uniqueId: d,
                        secUid: i,
                        isBlock: a
                      })))),
                      [3, 3];
                case 2:
                  return v.sent(),
                      [3, 3];
                case 3:
                  return [2]
              }
            })
          }).call(this)
        },
        handleWebappQueryOptimisticUpdate: function (e) {
          return (0,
              n._)(function () {
            var t, i, n, o;
            return (0,
                u.__generator)(this, function (s) {
              try {
                t = e.uniqueId,
                    i = e.isBlock,
                    n = e.targetUser,
                    o = e.relation,
                    void 0 !== i ? this.setUserRelation({
                      uniqueId: t,
                      relation: i ? _.yf.NONE : _.yf.BLOCK
                    }) : n && void 0 !== o && this.setUserRelation({
                      uniqueId: t,
                      relation: (0,
                          B.A7)({
                        current: o,
                        targetUser: n
                      }),
                      shouldUpdateFollowed: !0
                    })
              } catch (e) {
              }
              return [2]
            })
          }).call(this)
        }
      }
    })
        , U = N.useAtomService
        , b = N.getStaticApi
        , F = N.useServiceDispatchers
        , G = N.useServiceState
  },
  36084: function (e, t, i) {
    i.d(t, {
      A7: function () {
        return v
      },
      E: function () {
        return p
      },
      HF: function () {
        return I
      },
      XY: function () {
        return f
      },
      gN: function () {
        return T
      }
    });
    var n = i(5377)
        , o = i(45996)
        , s = i(67425)
        , r = i(56110)
        , a = i(23112)
        , u = i(8561)
        , d = i(48007)
        , c = i(92932)
        , l = ["roomId"]
        , h = ["uniqueId", "avatarThumb", "avatarMedium", "avatarLarger", "nickname", "signature"];

    function I(e, t, i) {
      if (!e)
        return t;
      var n, o, u = null != (o = t.relation) ? o : e.relation, d = (0,
          s.A)({}, e, t, {
        extraInfo: {
          followed: (0,
              c.z)(u, null == (n = e.extraInfo) ? void 0 : n.followed)
        }
      }, function (e, t, n) {
        return "canExpPlaylist" === n ? e || t : !l.includes(n) && (0,
            r.A)(t) || !i && h.includes(n) && (!(0,
            a.A)(e) || (0,
            a.A)(t)) || ("uniqueIdModifyTime" === n || "ttSeller" === n || "nickNameModifyTime" === n || "verified" === n) && !t ? e : void 0
      });
      return i && void 0 === t.roomId && d.roomId && (d.roomId = void 0),
          d
    }

    function _(e) {
      var t = e.relation
          , i = e.handleIsUnfollow
          , n = e.handleIsFollow;
      switch (t) {
        case u.yf.NONE:
        case u.yf.UNKNOW:
        case u.yf.BLOCK:
        case u.yf.BLOCKED:
        case u.yf.FOLLOWER:
          return i();
        default:
          return n()
      }
    }

    function v(e) {
      var t, i, n = e.current;
      switch (_({
        relation: null != (i = (t = e.targetUser).relation) ? i : u.yf.UNKNOW,
        handleIsUnfollow: function () {
          var e;
          return t.privateAccount ? 1 : (null == (e = t.extraInfo) ? void 0 : e.followed) || t.relation === u.yf.FOLLOWER ? 2 : 0
        },
        handleIsFollow: function () {
          return 3
        }
      })) {
        case 3:
          return u.yf.NONE;
        case 0:
          return _({
            relation: n,
            handleIsFollow: function () {
              return n
            },
            handleIsUnfollow: function () {
              return u.yf.FOLLOW
            }
          });
        case 1:
          return _({
            relation: n,
            handleIsFollow: function () {
              return n
            },
            handleIsUnfollow: function () {
              return u.yf.FOLLOWING_REQUEST
            }
          });
        case 2:
          return _({
            relation: n,
            handleIsFollow: function () {
              return n
            },
            handleIsUnfollow: function () {
              return u.yf.MUTAL
            }
          });
        default:
          return _({
            relation: n,
            handleIsFollow: function () {
              return n
            },
            handleIsUnfollow: function () {
              return u.yf.UNKNOW
            }
          })
      }
    }

    function T(e) {
      return _({
        relation: e,
        handleIsUnfollow: function () {
          return d.G1Q.Follow
        },
        handleIsFollow: function () {
          return d.G1Q.Unfollow
        }
      })
    }

    function f(e) {
      var t, i, n, o, s, r, a, u, d, c, l, h, I, _, v = e.stats, T = e.statsV2;
      return {
        followingCount: BigInt(null != (i = null != (t = null == T ? void 0 : T.followingCount) ? t : null == v ? void 0 : v.followingCount) ? i : 0),
        followerCount: BigInt(null != (o = null != (n = null == T ? void 0 : T.followerCount) ? n : null == v ? void 0 : v.followerCount) ? o : 0),
        heartCount: BigInt(null != (r = null != (s = null == T ? void 0 : T.heartCount) ? s : null == v ? void 0 : v.heartCount) ? r : 0),
        videoCount: BigInt(null != (u = null != (a = null == T ? void 0 : T.videoCount) ? a : null == v ? void 0 : v.videoCount) ? u : 0),
        diggCount: BigInt(null != (c = null != (d = null == T ? void 0 : T.diggCount) ? d : null == v ? void 0 : v.diggCount) ? c : 0),
        heart: BigInt(null != (h = null != (l = null == T ? void 0 : T.heart) ? l : null == v ? void 0 : v.heart) ? h : 0),
        friendCount: BigInt(null != (_ = null != (I = null == T ? void 0 : T.friendCount) ? I : null == v ? void 0 : v.friendCount) ? _ : 0)
      }
    }

    var p = function (e) {
      var t, i, s, r, a, u, d, c, l, h, I, _, v, T, f, p, E, m, S, g, L, C, A, R = function (e) {
        var t, i;
        return (0,
            o._)((0,
            n._)({}, e), {
          width: Number(null != (t = null == e ? void 0 : e.width) ? t : 0),
          height: Number(null != (i = null == e ? void 0 : e.height) ? i : 0)
        })
      };
      return {
        uid: null != (h = e.id_str) ? h : "",
        unique_id: null != (I = e.display_id) ? I : "",
        nickname: null != (_ = e.nickname) ? _ : "",
        sec_uid: null != (v = e.sec_uid) ? v : "",
        short_id: "",
        avatar_thumb: R(null != (T = e.avatar_thumb) ? T : {}),
        avatar_medium: R(null != (f = e.avatar_medium) ? f : {}),
        avatar_larger: R(null != (p = e.avatar_large) ? p : {}),
        signature: null != (E = e.bio_description) ? E : "",
        follow_status: Number(null != (S = null != (m = e.follow_status) ? m : null == (t = e.follow_info) ? void 0 : t.follow_status) ? S : 0),
        follower_count: Number(null != (L = null != (g = null == (i = e.follow_info) ? void 0 : i.follower_count) ? g : null == (s = e.stats) ? void 0 : s.follower_count) ? L : 0),
        following_count: Number(null != (A = null != (C = null == (r = e.follow_info) ? void 0 : r.following_count) ? C : null == (a = e.stats) ? void 0 : a.following_count) ? A : 0),
        room_id: null == (d = e.own_room) || null == (u = d.room_ids) ? void 0 : u[0],
        room_id_str: null == (l = e.own_room) || null == (c = l.room_ids_str) ? void 0 : c[0],
        gender: -1,
        birthday: ""
      }
    }
  },
  7871: function (e, t, i) {
    i.d(t, {
      T: function () {
        return s
      }
    });
    var n = i(63822)
        , o = i(75434)
        , s = (0,
        i(91402).M)({
      csr: function () {
        return n.default.t
      },
      ssr: function () {
        return (0,
            o.yK)().t
      }
    })
  },
  34412: function (e, t, i) {
    i.d(t, {
      Q3: function () {
        return T
      },
      dv: function () {
        return p
      },
      hy: function () {
        return v
      },
      jD: function () {
        return h
      },
      uI: function () {
        return f
      }
    });
    var n = i(35383)
        , o = i(5377)
        , s = i(16327)
        , r = i(73455)
        , a = i(4676)
        , u = i(11854)
        , d = i(10625)
        , c = {
      contentType: "video",
      duration: 0,
      videoPercent: 0,
      currentTime: 0
    }
        , l = {
      contentType: "photo",
      index: -1,
      length: 0
    }
        , h = (0,
        r._)((0,
        d.p)("playProgressAtom@tiktok/webapp-atoms", {}), {
      rehydrationKey: "webapp.videoControl.playProgress"
    })
        , I = (0,
        a.i)(h, function (e, t) {
      return {
        setVideoInfo: function (e) {
          var i = e.itemId
              , r = (0,
              s._)(e, ["itemId"]);
          t(h, function (e) {
            var t;
            return (0,
                n._)({}, i, (0,
                o._)({}, c, (null == (t = e[i]) ? void 0 : t.contentType) === "video" && e[i], r))
          })
        },
        setPhotoInfo: function (e) {
          var i = e.itemId
              , r = (0,
              s._)(e, ["itemId"]);
          t(h, function (e) {
            var t;
            return (0,
                n._)({}, i, (0,
                o._)({}, l, (null == (t = e[i]) ? void 0 : t.contentType) === "photo" && e[i], r))
          })
        },
        getVideoPlayProgressState: function (t) {
          var i = t.itemId
              , n = e(h);
          return i in n && n[i] && "video" === n[i].contentType ? n[i] : c
        }
      }
    })
        , _ = (I.useAtomService,
        I.useServiceState)
        , v = I.useServiceDispatchers
        , T = I.getStaticApi
        , f = function (e) {
      return _(function (t) {
        return e in t && t[e] && "video" === t[e].contentType ? t[e] : c
      }, u.bN)
    }
        , p = function (e) {
      return _(function (t) {
        return e in t && t[e] && "photo" === t[e].contentType ? t[e] : l
      }, u.bN)
    }
  },
  56186: function (e, t, i) {
    i.d(t, {
      D: function () {
        return o
      }
    });
    var n, o = ((n = {})[n.Reported = 1] = "Reported",
        n[n.Dislike = 2] = "Dislike",
        n[n.General = 3] = "General",
        n[n.Photosensitive = 4] = "Photosensitive",
        n)
  },
  33040: function (e, t, i) {
    i.d(t, {
      Jw: function () {
        return y
      },
      QH: function () {
        return R
      },
      T8: function () {
        return C
      },
      u7: function () {
        return P
      }
    });
    var n = i(79066)
        , o = i(5377)
        , s = i(45996)
        , r = i(6586)
        , a = i(72516)
        , u = i(73455)
        , d = i(4676)
        , c = i(10625)
        , l = i(80514)
        , h = i(35144)
        , I = i(75434)
        , _ = i(91402)
        , v = i(42646)
        , T = i(56904)
        , f = i(66772)
        , p = i(17769)
        , E = i(89671)
        , m = i(65030)
        , S = i(89458)
        , g = i(38306)
        , L = (0,
        _.M)({
      csr: function (e) {
        return (0,
            n._)(function () {
          var t;
          return (0,
              a.__generator)(this, function (i) {
            switch (i.label) {
              case 0:
                return [4, (0,
                    l.e)()];
              case 1:
                return t = i.sent(),
                    [2, v.h.get("/api/challenge/item_list/", {
                      query: (0,
                          s._)((0,
                          o._)({}, e), {
                        clientABVersions: t.join(",")
                      }),
                      baseUrlType: T.Z4.FixedWww
                    })]
            }
          })
        })()
      },
      ssr: function (e) {
        return (0,
            n._)(function () {
          var t, i, n, o, s, u, d, c, l, h, _, v, T, f, S, g, L, C, A, R, y, P, M;
          return (0,
              a.__generator)(this, function (a) {
            switch (a.label) {
              case 0:
                return t = (0,
                    I.yK)(),
                    i = e.count,
                    n = e.challengeID,
                    o = e.coverFormat,
                    [4, Promise.all([t.service.location.getUserCountryCode(), t.service.sharedUtil.appId(), t.service.sharedSeo.isGoogleBot(), t.service.sharedSeo.isSearchEngineBot(), t.i18n.getLanguage()])];
              case 1:
                return u = (s = r._.apply(void 0, [a.sent(), 5]))[0],
                    d = s[1],
                    c = s[2],
                    l = s[3],
                    h = s[4],
                    v = null != (_ = t.headers[m.UA]) ? _ : "",
                    T = c ? i : 16,
                    f = E.IC.ITEMLIST_CHALLENGE,
                    c ? f = E.IC.ITEMLIST_CHALLENGE_BOT_GOOGLE : l && (f = E.IC.GENERAL_BOT_ITEMLIST_CHALLENGE),
                    y = (R = t.service.webapp.data).getItemList,
                    P = {
                      Type: p.SP9.CHALLENGE,
                      Id: n,
                      MaxCursor: "0",
                      MinCursor: "0",
                      Count: T,
                      AppId: d,
                      Region: u,
                      Language: h,
                      CoverFormat: o,
                      Source: f,
                      Extra: {
                        user_agent: v
                      }
                    },
                    M = {
                      IsSSRReq: !0,
                      UserAgent: v
                    },
                    [4, t.service.webUser.getWebId()];
              case 2:
                return [4, y.apply(R, [(P.CommonParam = (M.WebID = a.sent(),
                    M.LoginUserID = t.service.sessionUser.getUserSession()._spipe_user_id,
                    M.Aid = Number(m.xE),
                    M.EntryPath = t.path,
                    M),
                    P)])];
              case 3:
                return g = (S = a.sent()).statusCode,
                    L = S.maxCursor,
                    C = S.hasMore,
                    A = S.items,
                    [2, {
                      statusCode: g,
                      statusMsg: S.statusMsg,
                      hasMore: C,
                      itemList: A,
                      cursor: L
                    }]
            }
          })
        })()
      }
    })
        , C = (0,
        u._)((0,
        c.p)("challengeListAtom@tiktok/webapp-atoms", m.hA), {
      rehydrationKey: "desktop.challengePage.challengeList"
    })
        , A = (0,
        d.i)(C, function (e, t) {
      return {
        getChallengeList: function (i) {
          return (0,
              n._)(function () {
            var n, r, u, d, c, l, I;
            return (0,
                a.__generator)(this, function (a) {
              switch (a.label) {
                case 0:
                  return a.trys.push([0, 2, , 3]),
                      u = void 0 === (r = e(C).cursor) ? "0" : r,
                      d = i.challengeID,
                      c = (0,
                          h.x)().language,
                      l = e(f.A).bizContext,
                      t(C, function (e) {
                        return (0,
                            s._)((0,
                            o._)({}, e), {
                          loading: !0
                        })
                      }),
                      [4, L({
                        challengeID: d,
                        language: c,
                        cursor: u,
                        aid: m.xE,
                        count: m.vu,
                        coverFormat: null == l || null == (n = l.videoCoverSettings) ? void 0 : n.format
                      })];
                case 1:
                  return I = a.sent(),
                      (0,
                          S.Tj)(e, t, C, g.Lz.Challenge, I),
                      [3, 3];
                case 2:
                  return a.sent(),
                      (0,
                          S.e_)(t, C),
                      [3, 3];
                case 3:
                  return [2]
              }
            })
          })()
        },
        resetChallengeList: function () {
          t(C, m.hA)
        }
      }
    })
        , R = A.useAtomService
        , y = A.useServiceDispatchers
        , P = A.useServiceState
  },
  94238: function (e, t, i) {
    i.d(t, {
      WX: function () {
        return A
      },
      ek: function () {
        return g
      },
      lE: function () {
        return R
      },
      pp: function () {
        return C
      }
    });
    var n = i(79066)
        , o = i(5377)
        , s = i(45996)
        , r = i(6586)
        , a = i(72516)
        , u = i(73455)
        , d = i(4676)
        , c = i(10625)
        , l = i(8561)
        , h = i(35144)
        , I = i(75434)
        , _ = i(91402)
        , v = i(42646)
        , T = i(56904)
        , f = i(17769)
        , p = i(65030)
        , E = i(89458)
        , m = i(38306)
        , S = (0,
        _.M)({
      csr: function (e) {
        return (0,
            n._)(function () {
          return (0,
              a.__generator)(this, function (t) {
            return [2, v.h.get("/api/collection/item_list/", {
              query: e,
              baseUrlType: T.Z4.FixedWww
            })]
          })
        })()
      },
      ssr: function (e) {
        return (0,
            n._)(function () {
          var t, i, n, o, s, u, d, c, h, _, v, T, E, m, S, g;
          return (0,
              a.__generator)(this, function (a) {
            switch (a.label) {
              case 0:
                return t = (0,
                    I.yK)(),
                    i = e.collectionId,
                    n = e.language,
                    s = void 0 === (o = e.count) ? p.vu : o,
                    [4, Promise.all([t.service.location.getUserCountryCode(), t.service.sharedUtil.appId(), t.service.sharedSeo.isGoogleBot(), t.service.commonConfig.getAbTestResultWithDolphin()])];
              case 1:
                return d = (u = r._.apply(void 0, [a.sent(), 4]))[0],
                    c = u[1],
                    h = u[2],
                    _ = u[3],
                    v = h ? s : p.vu,
                    [4, t.service.webapp.data.getItemList({
                      Type: f.SP9.COLLECTION,
                      Id: i,
                      MaxCursor: "0",
                      MinCursor: "0",
                      Count: v,
                      AppId: c,
                      Region: d,
                      Language: n,
                      Source: h ? l.pf.SEO_ITEMLIST_COLLECTION : l.pf.WEBAPP_ITEMLIST_COLLECTION,
                      ClientABVersions: _.versionName.split(","),
                      Extra: {
                        user_agent: t.headers[p.UA] || ""
                      }
                    })];
              case 2:
                return E = (T = a.sent()).statusCode,
                    m = T.maxCursor,
                    S = T.hasMore,
                    g = T.items,
                    [2, {
                      statusCode: E,
                      statusMsg: T.statusMsg,
                      hasMore: S,
                      itemList: g,
                      cursor: m
                    }]
            }
          })
        })()
      }
    })
        , g = (0,
        u._)((0,
        c.p)("collectionListAtom@tiktok/webapp-atoms", p.hA), {
      rehydrationKey: "desktop.collectionPage.collectionList"
    })
        , L = (0,
        d.i)(g, function (e, t) {
      return {
        getCollectionList: function (i) {
          return (0,
              n._)(function () {
            var n, r, u, d, c, I, _;
            return (0,
                a.__generator)(this, function (a) {
              switch (a.label) {
                case 0:
                  return a.trys.push([0, 2, , 3]),
                      n = i.collectionId,
                      u = void 0 === (r = e(g).cursor) ? "0" : r,
                      c = (d = (0,
                          h.x)()).language,
                      I = d.abTestVersion,
                      t(g, function (e) {
                        return (0,
                            s._)((0,
                            o._)({}, e), {
                          loading: !0
                        })
                      }),
                      [4, S({
                        collectionId: n,
                        language: c,
                        cursor: u,
                        aid: p.xE,
                        count: p.vu,
                        sourceType: l.pf.WEBAPP_ITEMLIST_COLLECTION,
                        clientABVersions: null == I ? void 0 : I.versionName
                      })];
                case 1:
                  return _ = a.sent(),
                      (0,
                          E.Tj)(e, t, g, m.Lz.Collection, _),
                      [3, 3];
                case 2:
                  return a.sent(),
                      (0,
                          E.e_)(t, g),
                      [3, 3];
                case 3:
                  return [2]
              }
            })
          })()
        },
        resetCollectionList: function () {
          t(g, (0,
              o._)({}, p.hA))
        },
        addItems: function (e, i) {
          t(g, function (t) {
            var n = (0,
                E.kf)(t, e, {
              itemListKey: m.Lz.Collection,
              addToHead: i
            })
                , r = n.list
                , a = n.browserList;
            return (0,
                s._)((0,
                o._)({}, t), {
              list: r,
              browserList: a
            })
          })
        },
        deleteItems: function (e) {
          (0,
              E.UJ)(t, g, e)
        }
      }
    })
        , C = L.useAtomService
        , A = L.useServiceDispatchers
        , R = L.useServiceState
  },
  65030: function (e, t, i) {
    i.d(t, {
      $H: function () {
        return d
      },
      Bu: function () {
        return u
      },
      HF: function () {
        return l
      },
      Kq: function () {
        return a
      },
      UA: function () {
        return o
      },
      hA: function () {
        return n
      },
      n9: function () {
        return c
      },
      vu: function () {
        return r
      },
      xE: function () {
        return s
      }
    });
    var n = {
      statusCode: i(57007).s.Ok,
      hasMore: !0,
      cursor: "0",
      loading: !0,
      preloadList: [],
      browserList: [],
      list: [],
      items: []
    }
        , o = "user-agent"
        , s = 1988
        , r = 30
        , a = 15
        , u = "w_g_fyp_vv"
        , d = "w_g_vv"
        , c = "tiktok_webapp_theme_source"
        , l = "tiktok_webapp_theme_manual"
  },
  32536: function (e, t, i) {
    i.d(t, {
      BX: function () {
        return m
      },
      DK: function () {
        return f
      },
      ag: function () {
        return S
      },
      sK: function () {
        return E
      }
    });
    var n = i(79066)
        , o = i(5377)
        , s = i(45996)
        , r = i(72516)
        , a = i(73455)
        , u = i(4676)
        , d = i(10625)
        , c = i(21931)
        , l = i(35144)
        , h = i(42646)
        , I = i(56904)
        , _ = i(65030)
        , v = i(89458)
        , T = i(38306)
        , f = (0,
        a._)((0,
        d.p)("creatorTabListAtom@tiktok/webapp-atoms", _.hA), {
      rehydrationKey: "desktop.creatorTabPage.creatorTabList"
    })
        , p = (0,
        u.i)(f, function (e, t) {
      return {
        getCreatorTabList: function (i) {
          return (0,
              n._)(function () {
            var a, u, d, p, E, m, S;
            return (0,
                r.__generator)(this, function (g) {
              switch (g.label) {
                case 0:
                  var L;
                  return g.trys.push([0, 2, , 3]),
                      a = i.secUid,
                      u = i.createTime,
                      d = i.fetchType,
                      p = (0,
                          l.x)().language,
                      t(f, function (e) {
                        return (0,
                            s._)((0,
                            o._)({}, e), {
                          loading: !0
                        })
                      }),
                      [4, (L = {
                        aid: _.xE,
                        count: _.Kq,
                        cursor: String(u),
                        secUid: a,
                        type: d,
                        language: p
                      },
                          (0,
                              n._)(function () {
                            return (0,
                                r.__generator)(this, function (e) {
                              return [2, h.h.get("/api/creator/item_list/", {
                                query: L,
                                baseUrlType: I.Z4.FixedWww
                              })]
                            })
                          })())];
                case 1:
                  return E = g.sent(),
                      m = d === c.N.LoadLatest,
                      S = {
                        secUid: a,
                        addToHead: m
                      },
                      (0,
                          v.Tj)(e, t, f, T.Lz.CreatorTab, E, S),
                      t(f, function (e) {
                        var t, i;
                        return (0,
                            s._)((0,
                            o._)({}, e), {
                          hasMorePrevious: null != (t = E.hasMorePrevious) && t,
                          hasMoreLatest: null != (i = E.hasMoreLatest) && i
                        })
                      }),
                      [3, 3];
                case 2:
                  return g.sent(),
                      (0,
                          v.e_)(t, f),
                      [3, 3];
                case 3:
                  return [2]
              }
            })
          })()
        },
        resetCreatorTabList: function () {
          t(f, _.hA)
        }
      }
    })
        , E = p.useAtomService
        , m = p.useServiceDispatchers
        , S = p.useServiceState
  },
  89458: function (e, t, i) {
    i.d(t, {
      X9: function () {
        return B
      },
      Tj: function () {
        return W
      },
      Qw: function () {
        return D
      },
      kf: function () {
        return F
      },
      bp: function () {
        return b
      },
      UJ: function () {
        return H
      },
      e_: function () {
        return V
      },
      Fx: function () {
        return x
      },
      Jl: function () {
        return N
      }
    });
    var n, o = i(5377), s = i(45996), r = i(54333), a = i(61945), u = i(76186), d = i(18499), c = i(8561), l = i(96152),
        h = i(35144), I = i(42029), _ = i(57007), v = i(82307), T = i(35379), f = i(56186), p = i(72702), E = i(38306),
        m = i(35383), S = i(69513), g = i(75434), L = i(91402), C = i(62650), A = i(74517),
        R = [E.Lz.UserPost, E.Lz.UserLiked, E.Lz.SearchTop, E.Lz.SearchVideo, E.Lz.Music, E.Lz.Challenge, E.Lz.CreatorTab],
        y = [E.Lz.ForYou, E.Lz.Following, E.Lz.Video], P = (n = {},
            (0,
                m._)(n, E.j$.HIGH, "720"),
            (0,
                m._)(n, E.j$.MEDIUM, "480"),
            (0,
                m._)(n, E.j$.LOW, "360"),
            n), M = function (e) {
          var t = e.currentList
              , i = e.itemList
              , n = e.statusCode
              , o = e.disableReportMore
              , s = e.isPlayList;
          t.length && !(void 0 !== o && o) && C.L.handleListMore({
            is_success: +!!i.length,
            error_code: n,
            popup_type: void 0 !== s && s ? "playlist" : void 0
          })
        }, w = (0,
            L.M)({
          csr: S.A,
          ssr: function (e, t) {
            if (e) {
              var i, n, o, s, r, a, u, d, c, l = (0,
                  g.yK)();
              R.includes(t) ? i = null != (o = null == (n = e.zoomCover) ? void 0 : n[P.medium]) ? o : e.cover : y.includes(t) && (i = null != (r = null == (s = e.zoomCover) ? void 0 : s[P.high]) ? r : e.cover),
              i && l.serverPush.prepend({
                url: i,
                type: A.PW.Image,
                rel: A._j.Preload
              }),
              [E.Lz.ForYou].includes(t) && e.size && 2621440 > Number(e.size) && (a = e.bitrateInfo ? null == (c = e.bitrateInfo[0]) || null == (d = c.PlayAddr) || null == (u = d.UrlList) ? void 0 : u[0] : e.playAddr),
              a && l.serverPush.prepend({
                url: a,
                type: A.PW.Video,
                rel: A._j.Preload
              })
            }
          }
        }), O = "live_", B = function (e) {
          return !!e && e.includes(O)
        }, D = function (e) {
          return "".concat(O).concat(e)
        }, N = function (e) {
          return (null == e ? void 0 : e.containerType) === c.Kk.CONTAINERTYPE_LIVE
        }, U = function (e, t) {
          var i = (null != e ? e : []).slice()
              , n = (0,
              h.x)().user
              , o = t.itemListKey
              , s = t.photoSensitiveVideosSetting
              , r = t.secUid;
          return ((null == n ? void 0 : n.photoSensitiveVideosSetting) === l.ll.CLOSE || !n && s === l.ll.CLOSE) && (o !== E.Lz.UserPost || (null == n ? void 0 : n.secUid) !== r) && (o !== E.Lz.Video || i.length > 1) && (i = i.filter(function (e) {
            return e.containerType === c.Kk.CONTAINERTYPE_LIVE || e.maskType !== f.D.Photosensitive
          })),
              i = i.map(function (e) {
                if (N(e)) {
                  var t;
                  e.id = D(null == (t = e.liveRoomInfo) ? void 0 : t.roomID)
                }
                return e
              })
        }, b = function (e) {
          return e.list.reduce(function (e, t) {
            var i = t.id
                , n = t.showNotPass
                , o = t.takeDown;
            return !n && 6 !== o && i && e.push(i),
                e
          }, [])
        }, F = function (e, t, i) {
          var n = i.itemListKey
              , o = i.addToHead
              , s = e.list
              , d = e.browserList
              , c = (0,
              a.A)(t, "id").filter(function (e) {
            return !s.includes(e.id)
          })
              , l = n === E.Lz.Topic || n === E.Lz.Messages;
          if (n === E.Lz.ForYou) {
            var h = t.length
                , _ = h - c.length;
            _ && (0,
                I.Jk)(_, s.length, h)
          }
          if (o)
            return {
              list: c.map(function (e) {
                return e.id
              }).concat(s),
              browserList: (0,
                  r._)(b({
                list: c
              })).concat((0,
                  r._)(d))
            };
          var v = (0,
              u.A)(s, c.map(function (e) {
            return e.id
          }));
          return {
            list: l ? s.concat(t.map(function (e) {
              return e.id
            })) : v,
            browserList: l ? d.concat(b({
              list: t
            })) : (0,
                u.A)(d, b({
              list: t
            }))
          }
        }, G = function (e, t, i, n) {
          var o = Math.min(n, e.length);
          return {
            list: (0,
                r._)(e.slice(0, o)).concat((0,
                r._)(i), (0,
                r._)(e.slice(o))),
            browserList: (0,
                r._)(t.slice(0, o)).concat((0,
                r._)(i), (0,
                r._)(t.slice(o)))
          }
        }, k = function (e) {
          var t = e.filter(function (e) {
            return !!e.author
          }).map(function (e) {
            return e.author
          })
              , i = e.filter(function (e) {
            var t;
            return !!(null == (t = e.liveRoomInfo) ? void 0 : t.ownerInfo)
          }).map(function (e) {
            return (0,
                s._)((0,
                o._)({}, e.liveRoomInfo.ownerInfo), {
              roomId: e.liveRoomInfo.roomID
            })
          });
          return t.concat(i)
        }, V = function (e, t) {
          e(t, function (e) {
            return (0,
                s._)((0,
                o._)({}, e), {
              loading: !1,
              statusCode: _.s.UnknownError
            })
          })
        }, W = function (e, t, i, n, a, u) {
          var l, h, I, _, f, E, m = e(i), S = m.list, g = m.hasLocateItem, L = e(v.x).photoSensitiveVideosSetting,
              C = a.statusCode, A = a.hasMore, R = a.itemList, y = a.cursor, P = a.log_pb, O = a.has_locate_item_id,
              B = a.filter_reasons, D = null == B || null == (h = B.filterReasons) ? void 0 : h.includes(1),
              N = m.filter_reasons || (D ? B : void 0), b = U(void 0 === R ? [] : R, {
                itemListKey: n,
                photoSensitiveVideosSetting: L,
                secUid: null == u ? void 0 : u.secUid
              }), V = F(m, b, {
                itemListKey: n,
                addToHead: null == u ? void 0 : u.addToHead
              }), W = V.list, x = V.browserList;
          if ("number" == typeof (null == u ? void 0 : u.insertIndex) && u.insertIndex >= 0) {
            var H = b.map(function (e) {
              return e.id
            })
                , Y = G(S, m.browserList, H, u.insertIndex);
            W = Y.list,
                x = Y.browserList
          }
          M({
            currentList: S,
            itemList: b,
            statusCode: C,
            disableReportMore: null != (_ = null == u ? void 0 : u.disableReportMore) && _,
            isPlayList: null != (f = null == u ? void 0 : u.isPlayList) && f
          }),
              w(null == (I = b[0]) ? void 0 : I.video, n);
          var q = k(b)
              , z = (l = null == P ? void 0 : P.impr_id,
              b.map(function (e) {
                return (0,
                    s._)((0,
                    o._)({}, e), {
                  logId: l
                })
              }))
              , K = {
            statusCode: C,
            hasMore: void 0 === A || A,
            cursor: y,
            list: W,
            loading: !1,
            browserList: x,
            preloadList: (0,
                r._)(null != (E = m.preloadList) ? E : []).concat((0,
                r._)((null != b ? b : []).filter(function (e) {
              return e.containerType !== c.Kk.CONTAINERTYPE_LIVE
            }).map(function (e) {
              var t, i, n, o;
              return {
                url: null != (n = null == (t = e.video) ? void 0 : t.playAddr) ? n : "",
                id: null != (o = null == (i = e.video) ? void 0 : i.id) ? o : ""
              }
            }))),
            items: z,
            hasLocateItem: !!g || O,
            filter_reasons: N
          };
          (0,
              d.unstable_batchedUpdates)(function () {
            (0,
                T.Gp)().multiSetUser(q),
                (0,
                    p.ud)().multiSetItem(z),
                t(i, K)
          })
        }, x = function (e, t, i) {
          e(t, function (e) {
            return (0,
                s._)((0,
                o._)({}, e), {
              list: e.list.filter(function (e) {
                return e !== i
              }),
              browserList: e.browserList.filter(function (e) {
                return e !== i
              })
            })
          })
        }, H = function (e, t, i) {
          var n = new Set(i);
          e(t, function (e) {
            return (0,
                s._)((0,
                o._)({}, e), {
              list: e.list.filter(function (e) {
                return !n.has(e)
              }),
              browserList: e.browserList.filter(function (e) {
                return !n.has(e)
              })
            })
          })
        }
  },
  38306: function (e, t, i) {
    i.d(t, {
      FB: function () {
        return h
      },
      Lz: function () {
        return d
      },
      j$: function () {
        return c
      },
      r8: function () {
        return l
      }
    });
    var n, o, s, r, a = i(35383), u = i(76446), d = ((n = {}).ForYou = "foryou",
        n.Challenge = "challenge",
        n.ChallengeNew = "challenge_new",
        n.Channel = "channel",
        n.Find = "find",
        n.Following = "following",
        n.Video = "video",
        n.Music = "music",
        n.MusicNew = "music_new",
        n.User = "user",
        n.UserPost = "user-post",
        n.UserPostPublic = "user-post-public",
        n.UserRepost = "user-repost",
        n.UserLiked = "user-liked",
        n.SearchTop = "search_top",
        n.SearchVideo = "search_video",
        n.SearchLive = "search_live",
        n.SearchPhoto = "search_photo",
        n.Question = "question",
        n.Playlist = "playlist",
        n.Topic = "topic",
        n.LiveEvent = "live_event",
        n.VideoPlaylist = "video_playlist",
        n.CreateVideoPlaylist = "create_video_playlist",
        n.Sticker = "sticker",
        n.Effect = "effect",
        n.Messages = "messages",
        n.Discover = "discover",
        n.Poi = "poi",
        n.PoiCategory = "poi_category",
        n.Collection = "collection",
        n.Explore = "explore",
        n.Favorites = "favorites",
        n.KeywordExpansion = "keyword-expansion",
        n.CreatorTab = "creator_tab",
        n.Friends = "friends",
        n.TrendingTopics = "trending_topics",
        n), c = ((o = {}).HIGH = "high",
        o.MEDIUM = "medium",
        o.LOW = "low",
        o), l = (s = {},
        (0,
            a._)(s, u.g.Trending, "foryou"),
        (0,
            a._)(s, u.g.Following, "following"),
        (0,
            a._)(s, u.g.Friends, "friends"),
        (0,
            a._)(s, u.g.Topic, "topic"),
        (0,
            a._)(s, u.g.Video, "video"),
        s), h = (r = {},
        (0,
            a._)(r, "foryou", u.g.Trending),
        (0,
            a._)(r, "following", u.g.Following),
        (0,
            a._)(r, "friends", u.g.Friends),
        (0,
            a._)(r, "topic", u.g.Topic),
        (0,
            a._)(r, "video", u.g.Video),
        (0,
            a._)(r, "effect", u.g.Effect),
        (0,
            a._)(r, "user", u.g.User),
        (0,
            a._)(r, "user-post", u.g.User),
        (0,
            a._)(r, "user-post-public", u.g.User),
        (0,
            a._)(r, "user-repost", u.g.User),
        (0,
            a._)(r, "user-liked", u.g.User),
        (0,
            a._)(r, "explore", u.g.Explore),
        (0,
            a._)(r, "challenge", u.g.Challenge),
        (0,
            a._)(r, "channel", u.g.Channel),
        (0,
            a._)(r, "collection", u.g.Collection),
        (0,
            a._)(r, "discover", u.g.Discover),
        (0,
            a._)(r, "find", u.g.Find),
        (0,
            a._)(r, "live_event", u.g.LiveEvent),
        (0,
            a._)(r, "messages", u.g.Messages),
        (0,
            a._)(r, "music", u.g.Music),
        (0,
            a._)(r, "playlist", u.g.Playlist),
        (0,
            a._)(r, "poi", u.g.Poi),
        (0,
            a._)(r, "poi_category", u.g.PoiCategory),
        (0,
            a._)(r, "question", u.g.Question),
        (0,
            a._)(r, "sticker", u.g.Sticker),
        r)
  },
  78711: function (e, t, i) {
    i.d(t, {
      H: function () {
        return n
      }
    });
    var n = 8
  },
  50668: function (e, t, i) {
    i.d(t, {
      IO: function () {
        return g
      },
      Ql: function () {
        return C
      },
      ZX: function () {
        return L
      },
      dQ: function () {
        return m
      }
    });
    var n = i(79066)
        , o = i(5377)
        , s = i(45996)
        , r = i(72516)
        , a = i(73455)
        , u = i(4676)
        , d = i(10625)
        , c = i(8561)
        , l = i(73691)
        , h = i(35144)
        , I = i(65030)
        , _ = i(89458)
        , v = i(38306)
        , T = i(46036)
        , f = i(78711)
        , p = i(69511)
        , E = i(37630)
        , m = (0,
        a._)((0,
        d.p)("exploreListAtom@tiktok/webapp-atoms", I.hA), {
      rehydrationKey: "desktop.explorePage.exploreList"
    })
        , S = (0,
        u.i)(m, function (e, t) {
      return {
        getExploreList: function (i) {
          return (0,
              n._)(function () {
            var n, a, u, d, S, g, L, C, A, R;
            return (0,
                r.__generator)(this, function (r) {
              switch (r.label) {
                case 0:
                  return r.trys.push([0, 2, , 3]),
                      n = i.categoryType,
                      u = (a = (0,
                          h.x)()).language,
                      d = a.abTestVersion,
                      g = !(null == (S = e(m).list) ? void 0 : S.length) && (0,
                          E.mU)(),
                      L = (0,
                          T.z)(),
                      C = 0 === S.length && n === c.Yl.ALL ? c.su.PULL : c.su.LOADMORE,
                      t(m, function (e) {
                        return (0,
                            s._)((0,
                            o._)({}, e), {
                          loading: !0
                        })
                      }),
                      [4, (0,
                          p.e)({
                        language: (0,
                            l.uk)(u),
                        aid: I.xE,
                        count: f.H,
                        categoryType: n,
                        clientABVersions: null == d ? void 0 : d.versionName,
                        isNonPersonalized: (0,
                            E.XN)(),
                        enable_cache: g,
                        video_encoding: L,
                        pullType: C
                      })];
                case 1:
                  return A = r.sent(),
                      (0,
                          _.Tj)(e, t, m, v.Lz.Explore, A),
                  g && (0,
                      E.zZ)(null != (R = A.itemList) ? R : []),
                      [3, 3];
                case 2:
                  return r.sent(),
                      (0,
                          _.e_)(t, m),
                      [3, 3];
                case 3:
                  return [2]
              }
            })
          })()
        },
        resetExploreList: function () {
          t(m, I.hA)
        }
      }
    })
        , g = S.useAtomService
        , L = S.useServiceDispatchers
        , C = S.useServiceState
  },
  69511: function (e, t, i) {
    i.d(t, {
      $: function () {
        return T
      },
      e: function () {
        return f
      }
    });
    var n = i(79066)
        , o = i(6586)
        , s = i(79262)
        , r = i(72516)
        , a = i(8561)
        , u = i(73691)
        , d = i(75434)
        , c = i(91402)
        , l = i(22160)
        , h = i(42646)
        , I = i(56904)
        , _ = i(96048)
        , v = i(65030)
        , T = function (e) {
      return (0,
          n._)(function () {
        return (0,
            r.__generator)(this, function (t) {
          return [2, h.h.get("/api/record/impression/action/", {
            query: e,
            baseUrlType: I.Z4.FixedWww
          })]
        })
      })()
    }
        , f = (0,
        c.M)({
      csr: function (e) {
        return (0,
            n._)(function () {
          var t;
          return (0,
              r.__generator)(this, function (i) {
            return (t = (0,
                l.DV)("exploreItemList")) ? (_.P.emit("consume_prefetch_data", performance.now(), "unknown", "exploreItemList"),
                [2, t.catch(function () {
                  return _.P.emit("consume_prefetch_data", performance.now(), "fail", "exploreItemList"),
                      h.h.get("/api/explore/item_list/", {
                        query: e,
                        baseUrlType: I.Z4.FixedWww
                      })
                })]) : [2, h.h.get("/api/explore/item_list/", {
              query: e,
              baseUrlType: I.Z4.FixedWww
            })]
          })
        })()
      },
      ssr: function (e) {
        return (0,
            n._)(function () {
          var t, i, n, c, l, h, I, _, T, f, p, E, m, S, g, L, C, A, R, y, P, M, w, O;
          return (0,
              r.__generator)(this, function (r) {
            switch (r.label) {
              case 0:
                return i = (0,
                    d.yK)(),
                    n = e.categoryType,
                    c = e.count,
                    [4, Promise.all([i.service.location.getUserCountryCode(), i.service.sharedUtil.appId(), i.service.sharedSeo.isGoogleBot(), i.i18n.getLanguage(), i.service.commonConfig.getAbTestResultWithDolphin()])];
              case 1:
                return h = (l = o._.apply(void 0, [r.sent(), 5]))[0],
                    I = l[1],
                    _ = l[2],
                    T = l[3],
                    f = l[4],
                    E = null != (p = i.headers[v.UA]) ? p : "",
                    m = (0,
                        u.uk)(T),
                    S = null == f || null == (t = f.parameters.tt_player_dash) ? void 0 : t.vid,
                    g = "",
                "object" == (void 0 === S ? "undefined" : (0,
                    s._)(S)) && "format" in S && (g = S.format.toLowerCase()),
                    M = (P = i.service.webapp.data).getItemList,
                    w = {
                      Id: "",
                      ExploreCategory: n,
                      MaxCursor: "0",
                      MinCursor: "0",
                      Count: c,
                      AppId: I,
                      Region: h,
                      Language: m,
                      Source: _ ? a.pf.SEO_ITEMLIST_EXPLORE : a.pf.WEBAPP_ITEMLIST_EXPLORE,
                      ClientABVersions: f.versionName.split(","),
                      Extra: {
                        user_agent: E,
                        video_encoding: g
                      }
                    },
                    O = {
                      IsSSRReq: !0,
                      UserAgent: E
                    },
                    [4, i.service.webUser.getWebId()];
              case 2:
                return [4, M.apply(P, [(w.CommonParam = (O.WebID = r.sent(),
                    O.LoginUserID = i.service.sessionUser.getUserSession()._spipe_user_id,
                    O.Aid = Number(v.xE),
                    O.EntryPath = i.path,
                    O),
                    w)])];
              case 3:
                return C = (L = r.sent()).statusCode,
                    A = L.statusMsg,
                    R = L.hasMore,
                    y = L.items,
                    [2, {
                      statusCode: C,
                      statusMsg: A,
                      hasMore: R,
                      cursor: L.maxCursor,
                      itemList: y
                    }]
            }
          })
        })()
      }
    })
  },
  37630: function (e, t, i) {
    i.d(t, {
      XN: function () {
        return h
      },
      mU: function () {
        return v
      },
      zZ: function () {
        return T
      }
    });
    var n = i(73691)
        , o = i(35144)
        , s = i(54363)
        , r = i(32049)
        , a = i(95794)
        , u = i(15771)
        , d = i(65030)
        , c = i(46036)
        , l = i(69511)
        , h = function () {
      var e, t, i = (0,
          o.x)().user;
      switch ((0,
          s.d)("pc_non_personalized_explore")) {
        case "v0":
          e = !0;
          break;
        case "v1":
          e = (0,
              u.eI)(null != (t = null == i ? void 0 : i.uid) ? t : "", !0, (0,
              r.fU)())
      }
      return e
    }
        , I = "ENABLED_EXPLORE_CDN_CACHE_TIME"
        , _ = function () {
      var e = Number((0,
          a._S)(I, "0"));
      return Date.now() / 1e3 - (e || 0) > 86400 && ((0,
          a.AP)(I, String(Date.now() / 1e3 || 0)),
          !0)
    }
        , v = function () {
      var e = "v1" === (0,
          s.d)("webapp_explore_cache")
          , t = "v1" === (0,
          s.d)("webapp_disable_explore_cache");
      return !!(!(0,
          r.fU)() && !t && e && _())
    }
        , T = function (e) {
      try {
        var t = (0,
            o.x)()
            , i = t.language
            , s = t.abTestVersion
            , r = (0,
            c.z)();
        (0,
            l.$)({
          aid: d.xE,
          language: (0,
              n.uk)(i),
          itemIds: e.map(function (e) {
            return e.id
          }).join(","),
          clientABVersions: null == s ? void 0 : s.versionName,
          isNonPersonalized: h(),
          isForYouFeedImpression: !1,
          video_encoding: r
        })
      } catch (e) {
        console.error("Record Impression Action failed in /api/explore/item_list with CDN Cache", e)
      }
    }
  },
  84117: function (e, t, i) {
    i.d(t, {
      Cg: function () {
        return h
      },
      D3: function () {
        return c
      }
    });
    var n = i(5377)
        , o = i(45996)
        , s = i(73455)
        , r = i(4676)
        , a = i(10625)
        , u = i(57007)
        , d = i(65030)
        , c = (0,
        s._)((0,
        a.p)("messageListAtom@tiktok/webapp-atoms", d.hA), {
      rehydrationKey: "desktop.messagePage.messageList"
    })
        , l = (0,
        r.i)(c, function (e, t) {
      return {
        setItemListById: function (e) {
          var i = e.list
              , s = e.statusCode
              , r = void 0 === s ? u.s.Ok : s
              , a = e.hasMore
              , d = void 0 === a || a
              , l = e.cursor
              , h = e.level;
          t(c, function (e) {
            return (0,
                o._)((0,
                n._)({}, e), {
              list: i,
              browserList: i,
              statusCode: r,
              hasMore: d,
              cursor: l,
              level: h
            })
          })
        },
        getBrowserList: function () {
          return e(c).browserList
        }
      }
    })
        , h = (l.useAtomService,
        l.useServiceDispatchers,
        l.useServiceState,
        l.getStaticApi)
  },
  32460: function (e, t, i) {
    i.d(t, {
      Ag: function () {
        return R
      },
      DC: function () {
        return y
      },
      l6: function () {
        return C
      },
      pT: function () {
        return P
      }
    });
    var n = i(79066)
        , o = i(5377)
        , s = i(45996)
        , r = i(6586)
        , a = i(72516)
        , u = i(73455)
        , d = i(4676)
        , c = i(10625)
        , l = i(80514)
        , h = i(35144)
        , I = i(75434)
        , _ = i(91402)
        , v = i(42646)
        , T = i(56904)
        , f = i(66772)
        , p = i(89671)
        , E = i(17769)
        , m = i(65030)
        , S = i(89458)
        , g = i(38306)
        , L = (0,
        _.M)({
      csr: function (e) {
        return (0,
            n._)(function () {
          var t;
          return (0,
              a.__generator)(this, function (i) {
            switch (i.label) {
              case 0:
                return [4, (0,
                    l.e)()];
              case 1:
                return t = i.sent(),
                    [2, v.h.get("/api/music/item_list/", {
                      query: (0,
                          s._)((0,
                          o._)({}, e), {
                        clientABVersions: t.join(",")
                      }),
                      baseUrlType: T.Z4.FixedWww
                    })]
            }
          })
        })()
      },
      ssr: function (e) {
        return (0,
            n._)(function () {
          var t, i, n, o, s, u, d, c, l, h, _, v, T, f, S, g, L, C, A, R, y, P;
          return (0,
              a.__generator)(this, function (a) {
            switch (a.label) {
              case 0:
                return t = (0,
                    I.yK)(),
                    i = e.musicID,
                    n = e.count,
                    o = e.language,
                    s = e.coverFormat,
                    [4, Promise.all([t.service.location.getUserCountryCode(), t.service.sharedUtil.appId(), t.service.sharedSeo.isGoogleBot(), t.service.sharedSeo.isSearchEngineBot()])];
              case 1:
                return d = (u = r._.apply(void 0, [a.sent(), 4]))[0],
                    c = u[1],
                    l = u[2],
                    h = u[3],
                    v = null != (_ = t.headers[m.UA]) ? _ : "",
                    T = l ? n : 16,
                    R = (A = t.service.webapp.data).getItemList,
                    y = {
                      Type: E.SP9.MUSIC,
                      Id: i,
                      MaxCursor: "0",
                      MinCursor: "0",
                      Count: T,
                      AppId: c,
                      Region: d,
                      Language: o,
                      PullType: 1,
                      CoverFormat: s,
                      Source: l ? p.IC.ITEMLIST_MUSIC_BOT_GOOGLE : h ? p.IC.GENERAL_BOT_ITEMLIST_MUSIC : p.IC.ITEMLIST_MUSIC,
                      Extra: {
                        user_agent: v
                      }
                    },
                    P = {
                      IsSSRReq: !0,
                      UserAgent: v
                    },
                    [4, t.service.webUser.getWebId()];
              case 2:
                return [4, R.apply(A, [(y.CommonParam = (P.WebID = a.sent(),
                    P.LoginUserID = t.service.sessionUser.getUserSession()._spipe_user_id,
                    P.Aid = Number(m.xE),
                    P.EntryPath = t.path,
                    P),
                    y)])];
              case 3:
                return S = (f = a.sent()).statusCode,
                    g = f.statusMsg,
                    L = f.hasMore,
                    C = f.items,
                    [2, {
                      statusCode: S,
                      statusMsg: g,
                      hasMore: L,
                      cursor: f.maxCursor,
                      itemList: C
                    }]
            }
          })
        })()
      }
    })
        , C = (0,
        u._)((0,
        c.p)("musicListAtom@tiktok/webapp-atoms", m.hA), {
      rehydrationKey: "desktop.musicPage.musicList"
    })
        , A = (0,
        d.i)(C, function (e, t) {
      return {
        getMusicList: function (i) {
          return (0,
              n._)(function () {
            var n, r, u, d, c, l, I, _;
            return (0,
                a.__generator)(this, function (a) {
              switch (a.label) {
                case 0:
                  n = e(C),
                      a.label = 1;
                case 1:
                  return a.trys.push([1, 3, , 4]),
                      u = i.musicID,
                      c = void 0 === (d = n.cursor) ? "0" : d,
                      l = (0,
                          h.x)().language,
                      I = e(f.A).bizContext,
                      t(C, function (e) {
                        return (0,
                            s._)((0,
                            o._)({}, e), {
                          loading: !0
                        })
                      }),
                      [4, L({
                        musicID: u,
                        language: l,
                        cursor: c,
                        aid: m.xE,
                        count: m.vu,
                        coverFormat: null == I || null == (r = I.videoCoverSettings) ? void 0 : r.format
                      })];
                case 2:
                  return _ = a.sent(),
                      (0,
                          S.Tj)(e, t, C, g.Lz.Music, _),
                      [3, 4];
                case 3:
                  return a.sent(),
                      (0,
                          S.e_)(t, C),
                      [3, 4];
                case 4:
                  return [2]
              }
            })
          })()
        },
        resetMusicList: function () {
          t(C, m.hA)
        }
      }
    })
        , R = A.useAtomService
        , y = A.useServiceDispatchers
        , P = A.useServiceState
  },
  17832: function (e, t, i) {
    i.d(t, {
      HG: function () {
        return k
      },
      Lu: function () {
        return G
      },
      NY: function () {
        return b
      },
      e4: function () {
        return N
      },
      sL: function () {
        return F
      }
    });
    var n = i(79066)
        , o = i(5377)
        , s = i(45996)
        , r = i(79262)
        , a = i(72516)
        , u = i(73455)
        , d = i(4676)
        , c = i(10625)
        , l = i(73691)
        , h = i(35144)
        , I = i(75434)
        , _ = i(60724)
        , v = i(48859)
        , T = i(50173)
        , f = i(77060)
        , p = i(63949)
        , E = i(38139)
        , m = i(48700)
        , S = i(66772)
        , g = i(32049)
        , L = i(95794)
        , C = i(287)
        , A = i(92908)
        , R = i(83751)
        , y = i(65030)
        , P = i(89458)
        , M = i(38306)
        , w = i(72140)
        , O = i(89327)
        , B = i(92126)
        , D = i(93960)
        , N = (0,
        u._)((0,
        c.p)("recommendListAtom@tiktok/webapp-atoms", y.hA), {
      rehydrationKey: "desktop.forYouPage.recommendList"
    })
        , U = (0,
        d.i)(N, function (e, t) {
      return {
        getRecommendList: function (i) {
          var u = arguments.length > 1 && void 0 !== arguments[1] && arguments[1];
          return (0,
              n._)(function () {
            var n, d, c, U, b, F, G, k, V, W, x, H, Y, q, z, K, $, Q, j, X, Z, J, ee, et, ei, en, eo, es, er, ea, eu,
                ed, ec, el, eh, eI, e_, ev, eT, ef, ep, eE, em, eS, eg, eL, eC, eA, eR, ey, eP;
            return (0,
                a.__generator)(this, function (a) {
              switch (a.label) {
                case 0:
                  n = u ? w.Hx : N,
                      d = u ? M.Lz.Video : M.Lz.ForYou,
                      a.label = 1;
                case 1:
                  return a.trys.push([1, 3, , 4]),
                      k = e(n),
                      V = e(S.A).bizContext,
                      x = (W = (0,
                          h.x)()).language,
                      H = W.abTestVersion,
                      Y = W.webIdCreatedTime,
                      q = i.itemId,
                      z = i.watchLiveLastTime,
                      K = i.device_type,
                      $ = i.fromPage,
                      j = void 0 === (Q = i.pullType) ? 2 : Q,
                      Z = void 0 === (X = i.ttamParams) ? {} : X,
                      ee = void 0 !== (J = i.isNonPersonalized) && J,
                      ei = void 0 === (et = i.playModeForTea) ? v.Tk.OneColumn : et,
                      en = i.fypFeederItemId,
                      eo = i.fetchCount,
                      es = i.enableCDNCache,
                      er = i.enableDummyRequest,
                      ea = (0,
                          g.fU)() ? ee : (0,
                          R.PJ)(e(R.WH)),
                      eu = "undefined" != typeof window && "connection" in navigator ? navigator.connection.downlink : void 0,
                      ed = e(A._v).totalDeviceScore,
                      ec = (0,
                          l.uk)(x),
                      el = D.Nu,
                  (eh = null != eo ? eo : null == H || null == (c = H.parameters.change_list_length_new) ? void 0 : c.vid) && (el = Number(eh)),
                      eI = null == H || null == (U = H.parameters.tt_player_dash) ? void 0 : U.vid,
                      e_ = "",
                  "object" == (void 0 === eI ? "undefined" : (0,
                      r._)(eI)) && "format" in eI && (e_ = eI.format.toLowerCase()),
                      console.debug("[getRecommendList]", "originParams", ev = (0,
                          s._)((0,
                          o._)({
                        isNonPersonalized: ea,
                        aid: y.xE,
                        count: 1 === j ? D.K2 : el,
                        insertedItemID: q,
                        language: ec,
                        clientABVersions: null == H ? void 0 : H.versionName,
                        pullType: j,
                        watchLiveLastTime: z,
                        device_type: K
                      }, Z), {
                        coverFormat: null == V || null == (b = V.videoCoverSettings) ? void 0 : b.format,
                        itemID: en,
                        vv_count_fyp: parseInt((0,
                            L._S)(y.Bu, "0"), 10) || 0,
                        video_encoding: e_,
                        is_new_user: (0,
                            C.m)(Y, 1)
                      }), "expParams", eT = (0,
                          D.n5)(i, V, ea), JSON.stringify(eT) === JSON.stringify(ev)),
                      ef = (null == H || null == (G = H.parameters) || null == (F = G.foryou_prefetch) ? void 0 : F.vid) !== "v2" ? ev : eT,
                  $ && Object.assign(ef, {
                    from_page: $
                  }),
                      Object.assign(ef, {
                        launch_mode: (0,
                            L.Hd)(_.O_),
                        device_score: ed.toString(),
                        network: eu,
                        window_height: "undefined" != typeof window ? window.innerHeight : void 0,
                        window_width: "undefined" != typeof window ? window.innerWidth : void 0
                      }),
                      t(n, function (e) {
                        return (0,
                            s._)((0,
                            o._)({}, e), {
                          loading: !0
                        })
                      }),
                      [4, (0,
                          B.Hy)(ef)];
                case 2:
                  ep = a.sent(),
                      eE = k.list.length,
                      (eg = null != (eS = (em = (0,
                          D.r6)(eE, ep)).itemList) ? eS : []).forEach(function (e) {
                        var t;
                        if (e.ad_info) {
                          var i = (0,
                              T.n5)({
                            ad_info: e.ad_info,
                            play_mode: ei
                          });
                          f.pg.handleReceive(i)
                        }
                        p.j.handleVideoReceive({
                          item_id: e.id,
                          group_id: null == e || null == (t = e.video) ? void 0 : t.id
                        })
                      }),
                  u || t(O.R, em),
                      (0,
                          P.Tj)(e, t, n, d, em);
                  try {
                    (es || er) && (null == (eL = ep.__headers) ? void 0 : eL.cache_response) && (eC = ep.__headers.cache_response,
                        E.n.handleCacheResult(eC, m.L.Trending))
                  } catch (e) {
                    console.error("Cache result tracking failed in FYP recommend list", e)
                  }
                  try {
                    ey = (null == H || null == (eR = H.parameters) || null == (eA = eR.webapp_fyp_cache_login) ? void 0 : eA.vid) === "v1",
                    (es || er) && ey && (0,
                        B.$W)({
                      aid: y.xE,
                      language: ec,
                      itemIds: eg.map(function (e) {
                        return e.id
                      }).join(","),
                      clientABVersions: null == H ? void 0 : H.versionName,
                      isNonPersonalized: ea,
                      isForYouFeedImpression: !0
                    })
                  } catch (e) {
                    console.error("Record Impression Action failed in /api/recommend/item_list with CDN Cache", e)
                  }
                  return [3, 4];
                case 3:
                  return eP = a.sent(),
                      (0,
                          I.mH)().warn("getRecommendList err", eP),
                      (0,
                          P.e_)(t, n),
                      [3, 4];
                case 4:
                  return [2]
              }
            })
          })()
        },
        setPrefetchFYP: function (t) {
          return (0,
              n._)(function () {
            var i, n, r, u, d;
            return (0,
                a.__generator)(this, function (a) {
              try {
                i = e(S.A).bizContext,
                    r = (0,
                        g.fU)() ? null != (n = t.isNonPersonalized) && n : (0,
                        R.PJ)(e(R.WH)),
                    u = (0,
                        s._)((0,
                        o._)({}, t), {
                      cache_ttl: Math.max(t.cache_ttl || 0, 3e5)
                    }),
                    d = (0,
                        D.n5)(u, i, r),
                    (0,
                        B.XM)(d)
              } catch (e) {
                (0,
                    I.mH)().warn("getRecommendList err", e)
              }
              return [2]
            })
          })()
        },
        setDeleteVideo: function (e) {
          (0,
              P.Fx)(t, N, e)
        },
        setListFromCache: function (i) {
          (0,
              P.Tj)(e, t, N, M.Lz.ForYou, i, {
            disableReportMore: !0
          })
        },
        getFeedCacheList: function () {
          return (0,
              n._)(function () {
            var t, i, n, o, s, u, d, c, I, v, T, f, p;
            return (0,
                a.__generator)(this, function (a) {
              switch (a.label) {
                case 0:
                  return a.trys.push([0, 2, , 3]),
                      n = e(S.A).bizContext,
                      s = (o = (0,
                          h.x)()).language,
                      u = o.abTestVersion,
                      d = (0,
                          R.PJ)(e(R.WH)),
                      c = (0,
                          l.uk)(s),
                      I = "undefined" != typeof window && "connection" in navigator ? navigator.connection.downlink : void 0,
                      v = e(A._v).totalDeviceScore,
                      T = null == u || null == (t = u.parameters.tt_player_dash) ? void 0 : t.vid,
                      f = "",
                  "object" == (void 0 === T ? "undefined" : (0,
                      r._)(T)) && "format" in T && (f = T.format.toLowerCase()),
                      p = {
                        count: 3,
                        language: c,
                        coverFormat: null == n || null == (i = n.videoCoverSettings) ? void 0 : i.format,
                        isNonPersonalized: d,
                        vv_count_fyp: parseInt((0,
                            L._S)(y.Bu, "0"), 10) || 0,
                        clientABVersions: null == u ? void 0 : u.versionName,
                        launch_mode: (0,
                            L.Hd)(_.O_),
                        device_score: v.toString(),
                        network: I,
                        window_height: "undefined" != typeof window ? window.innerHeight : void 0,
                        window_width: "undefined" != typeof window ? window.innerWidth : void 0,
                        video_encoding: f
                      },
                      [4, (0,
                          B.cD)(p)];
                case 1:
                  return [2, a.sent()];
                case 2:
                  return a.sent(),
                      [2, null];
                case 3:
                  return [2]
              }
            })
          })()
        },
        resetRecommendList: function (e) {
          t(N, (0,
              o._)({}, y.hA, e))
        },
        setRecommendListById: function (e) {
          var i = e.list
              , n = e.browserList
              , r = e.preloadList;
          t(N, function (e) {
            return (0,
                s._)((0,
                o._)({}, e), {
              list: i,
              browserList: null != n ? n : i,
              preloadList: r
            })
          })
        },
        insertCustomItem: function (i) {
          var n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {}
              , o = n.addToHead
              , s = n.insertIndex;
          try {
            (0,
                P.Tj)(e, t, N, M.Lz.ForYou, {
              statusCode: 0,
              hasMore: !0,
              itemList: [i]
            }, {
              addToHead: void 0 !== o && o,
              insertIndex: s,
              disableReportMore: !0
            }),
                console.debug("[insertCustomItem] Successfully inserted custom item:", i.id)
          } catch (e) {
            (0,
                I.mH)().warn("insertCustomItem err", e)
          }
        }
      }
    })
        , b = U.useAtomService
        , F = U.useServiceDispatchers
        , G = U.useServiceState
        , k = U.getStaticApi
  },
  89327: function (e, t, i) {
    i.d(t, {
      R: function () {
        return a
      },
      Z: function () {
        return u
      }
    });
    var n = i(73455)
        , o = i(4676)
        , s = i(10625)
        , r = i(57007)
        , a = (0,
        n._)((0,
        s.p)("recommendListResponseAtom@tiktok/webapp-atoms", {
      statusCode: r.s.Ok
    }), {
      rehydrationKey: "desktop.forYouPage.recommendListResponse"
    })
        , u = (0,
        o.i)(a, function () {
      return {}
    }).useServiceState
  },
  92126: function (e, t, i) {
    i.d(t, {
      $W: function () {
        return g
      },
      Hy: function () {
        return C
      },
      XM: function () {
        return S
      },
      cD: function () {
        return L
      },
      it: function () {
        return A
      }
    });
    var n = i(79066)
        , o = i(5377)
        , s = i(45996)
        , r = i(6586)
        , a = i(54333)
        , u = i(79262)
        , d = i(72516)
        , c = i(33877)
        , l = i(80514)
        , h = i(75434)
        , I = i(91402)
        , _ = i(2727)
        , v = i(22160)
        , T = i(42646)
        , f = i(56904)
        , p = i(88947)
        , E = i(89671)
        , m = i(96048)
        , S = function (e) {
      return (0,
          n._)(function () {
        var t, i, n, r;
        return (0,
            d.__generator)(this, function (u) {
          switch (u.label) {
            case 0:
              return [4, (0,
                  l.e)()];
            case 1:
              return i = u.sent(),
                  r = Array.from(new Set((0,
                      a._)(null != (n = null == (t = e.clientABVersions) ? void 0 : t.split(",")) ? n : []).concat((0,
                      a._)(i)))),
                  [2, T.h.post("/api/prefetch/recommend/item_list/", {
                    query: (0,
                        s._)((0,
                        o._)({}, e), {
                      clientABVersions: r.join(",")
                    }),
                    baseUrlType: f.Z4.FixedWww
                  })]
          }
        })
      })()
    }
        , g = function (e) {
      return (0,
          n._)(function () {
        return (0,
            d.__generator)(this, function (t) {
          return [2, T.h.get("/api/record/impression/action/", {
            query: e,
            baseUrlType: f.Z4.FixedWww
          })]
        })
      })()
    }
        , L = function (e) {
      return (0,
          n._)(function () {
        return (0,
            d.__generator)(this, function (t) {
          return [2, T.h.get("/api/preload/item_list/", {
            query: e,
            baseUrlType: f.Z4.FixedWww
          })]
        })
      })()
    }
        , C = (0,
        I.M)({
      csr: function (e) {
        return (0,
            n._)(function () {
          var t, i, n, r, u, c;
          return (0,
              d.__generator)(this, function (d) {
            switch (d.label) {
              case 0:
                if (i = (0,
                    _.t)("recommendItemList"))
                  return [2, i];
                return n = (0,
                    v.DV)("recommendItemList"),
                    [4, (0,
                        l.e)()];
              case 1:
                if (r = d.sent(),
                    c = Array.from(new Set((0,
                        a._)(null != (u = null == (t = e.clientABVersions) ? void 0 : t.split(",")) ? u : []).concat((0,
                        a._)(r)))),
                    n)
                  return m.P.emit("consume_prefetch_data", performance.now(), "unknown", "recommendItemList"),
                      [2, n.catch(function () {
                        return m.P.emit("consume_prefetch_data", performance.now(), "fail", "recommendItemList"),
                            T.h.get("/api/recommend/item_list/", {
                              query: (0,
                                  s._)((0,
                                  o._)({}, e), {
                                clientABVersions: c.join(",")
                              }),
                              baseUrlType: f.Z4.FixedWww
                            })
                      })];
                return [2, T.h.get("/api/recommend/item_list/", {
                  query: (0,
                      s._)((0,
                      o._)({}, e), {
                    clientABVersions: c.join(",")
                  }),
                  baseUrlType: f.Z4.FixedWww
                })]
            }
          })
        })()
      },
      ssr: function (e) {
        return (0,
            n._)(function () {
          var t, i, n, o, s, a, l, I, _, v, T, f, m, S, g, L, C, A, R;
          return (0,
              d.__generator)(this, function (d) {
            switch (d.label) {
              case 0:
                return [4, Promise.all([(o = (0,
                    h.yK)()).service.location.getUserCountryCode(), o.service.sharedUtil.appId(), o.service.sharedSeo.isGoogleBot(), o.service.sharedSeo.isSearchEngineBot(), o.service.commonConfig.getAbTestResultWithDolphin(), o.service.seoul.getSEOABTestDecision("".concat(c.C).concat(o.path))])];
              case 1:
                return a = (s = r._.apply(void 0, [d.sent(), 6]))[0],
                    l = s[1],
                    I = s[2],
                    _ = s[3],
                    v = s[4],
                    T = !!(null == (t = s[5].parameters.seoFriendlyApi) ? void 0 : t.keywordTags) || !!(null == (i = (null == v ? void 0 : v.parameters).seoFriendlyApi) ? void 0 : i.keywordTags),
                    f = o.i18n.getLanguage(),
                    m = I || _,
                    S = null == v || null == (n = v.parameters.tt_player_dash) ? void 0 : n.vid,
                    g = "",
                "object" == (void 0 === S ? "undefined" : (0,
                    u._)(S)) && "format" in S && (g = S.format.toLowerCase()),
                    L = m ? I ? T ? 157 : E.IC.ITEMLIST_TRENDING_BOT_GOOGLE : T ? E.IC.GENERAL_BOT_ITEMLIST_RELATED : E.IC.GENERAL_BOT_ITEMLIST_TRENDING : E.IC.ITEMLIST_TRENDING,
                    [4, o.service.webapp.data.getRecommendItemList({
                      Id: null != (C = e.itemID) ? C : "",
                      MaxCursor: "0",
                      MinCursor: "0",
                      Count: 9,
                      AppId: l,
                      Region: a,
                      Language: f,
                      PullType: 1,
                      Source: L,
                      Extra: {
                        inserted_item_IDs: null != (A = e.insertedItemID) ? A : "",
                        user_agent: o.headers["user-agent"] || "",
                        from_page: (0,
                            p.sn)(o.path) || "",
                        ip: o.service.location.getIP(),
                        video_encoding: g
                      },
                      ClientABVersions: v.versionName.split(","),
                      CoverFormat: e.coverFormat,
                      IsNonPersonalized: e.isNonPersonalized
                    }, void 0, m)];
              case 2:
                return R = d.sent(),
                m && 0 !== R.statusCode && (o._statusCode = 500),
                    [2, R]
            }
          })
        })()
      }
    })
        , A = function (e) {
      return (0,
          n._)(function () {
        var t;
        return (0,
            d.__generator)(this, function (i) {
          switch (i.label) {
            case 0:
              return i.trys.push([0, 2, , 3]),
                  t = (0,
                      s._)((0,
                      o._)({}, e), {
                    enable_cache: !0,
                    user_is_login: !1,
                    isNonPersonalized: !0,
                    web_id: "0"
                  }),
                  [4, T.h.get("/api/recommend/item_list/", {
                    query: t,
                    baseUrlType: f.Z4.FixedWww
                  })];
            case 1:
              return i.sent(),
                  [3, 3];
            case 2:
              return console.error("Dummy request failed:", i.sent()),
                  [3, 3];
            case 3:
              return [2]
          }
        })
      })()
    }
  },
  93960: function (e, t, i) {
    i.d(t, {
      K2: function () {
        return h
      },
      Nu: function () {
        return I
      },
      n5: function () {
        return v
      },
      r6: function () {
        return _
      }
    });
    var n = i(5377)
        , o = i(45996)
        , s = i(79262)
        , r = i(73691)
        , a = i(35144)
        , u = i(75434)
        , d = i(95794)
        , c = i(287)
        , l = i(65030)
        , h = 6
        , I = 30;

    function _(e, t) {
      var i = t.adsOffset
          , n = t.itemList
          , o = Number(void 0 === i ? 0 : i)
          , s = null == n ? void 0 : n[o];
      return (null == s ? void 0 : s.isTT4BAds) && (null == n || n.splice(o, 1),
      null == n || n.splice(o >= e ? o - e : 0, 0, s),
          t.itemList = n),
          t
    }

    function v(e, t, i) {
      var _, v, T, f, p = null != (f = (0,
              a.x)()) ? f : {}, E = p.language, m = p.abTestVersion, S = p.webIdCreatedTime, g = e.itemId,
          L = e.watchLiveLastTime, C = e.device_type, A = e.pullType, R = void 0 === A ? 2 : A, y = e.ttamParams,
          P = e.fypFeederItemId, M = e.fetchCount, w = e.enableCDNCache, O = e.enableDummyRequest, B = e.cache_ttl,
          D = (0,
              r.uk)(void 0 === E ? "en" : E), N = I,
          U = null != M ? M : null == m || null == (_ = m.parameters.change_list_length_new) ? void 0 : _.vid;
      U && (N = Number(U));
      var b = null == m || null == (v = m.parameters.tt_player_dash) ? void 0 : v.vid
          , F = "";
      return "object" == (void 0 === b ? "undefined" : (0,
          s._)(b)) && "format" in b && (F = b.format.toLowerCase()),
          (0,
              o._)((0,
              n._)({
            isNonPersonalized: !!O || i,
            aid: l.xE,
            count: 1 === R ? h : N,
            insertedItemID: g,
            language: D,
            clientABVersions: null == m ? void 0 : m.versionName,
            pullType: R,
            watchLiveLastTime: L,
            device_type: C
          }, void 0 === y ? {} : y), {
            coverFormat: null == t || null == (T = t.videoCoverSettings) ? void 0 : T.format,
            itemID: P,
            vv_count_fyp: parseInt((0,
                d._S)(l.Bu, "0"), 10) || 0,
            vv_count: parseInt((0,
                d._S)(l.$H, "0"), 10) || 0,
            cpu_core_number: "undefined" != typeof navigator && navigator.hardwareConcurrency ? navigator.hardwareConcurrency : 0,
            dark_mode: "dark" === (0,
                u.MJ)(l.n9) && "1" === (0,
                u.MJ)(l.HF),
            time_of_day: new Date().getHours(),
            day_of_week: new Date().getDay(),
            enable_cache: !!w || !!O,
            user_is_login: !w && !O && void 0,
            is_new_user: (0,
                c.m)(S, 1),
            cache_ttl: B,
            video_encoding: F
          })
    }
  },
  72140: function (e, t, i) {
    i.d(t, {
      AM: function () {
        return D
      },
      Hx: function () {
        return O
      },
      ND: function () {
        return N
      },
      OU: function () {
        return b
      },
      mY: function () {
        return U
      }
    });
    var n = i(79066)
        , o = i(5377)
        , s = i(45996)
        , r = i(79262)
        , a = i(72516)
        , u = i(73455)
        , d = i(4676)
        , c = i(10625)
        , l = i(73691)
        , h = i(80514)
        , I = i(35144)
        , _ = i(42646)
        , v = i(56904)
        , T = i(66772)
        , f = i(95794)
        , p = i(83751)
        , E = i(72702)
        , m = i(65030)
        , S = i(89458)
        , g = i(38306)
        , L = i(59151)
        , C = i(46036)
        , A = i(75434)
        , R = i(93960)
        , y = i(60724)
        , P = i(92908)
        , M = i(92126)
        , w = i(6372)
        , O = (0,
        u._)((0,
        c.p)("relatedListAtom@tiktok/webapp-atoms", m.hA), {
      rehydrationKey: "desktop.videoPage.relatedList"
    })
        , B = (0,
        d.i)(O, function (e, t) {
      return {
        getRelatedList: function (i) {
          return (0,
              n._)(function () {
            var u, d, c, B, D, N, U, b, F, G, k, V, W, x, H, Y, q, z, K, $, Q, j, X, Z, J, ee, et, ei, en, eo, es, er,
                ea, eu, ed, ec, el, eh, eI, e_, ev, eT, ef, ep, eE, em, eS, eg, eL, eC, eA, eR, ey, eP;
            return (0,
                a.__generator)(this, function (eM) {
              switch (eM.label) {
                case 0:
                  if (eM.trys.push([0, 7, , 8]),
                      N = (D = e(O)).loading,
                      U = D.hasMore,
                      F = void 0 === (b = D.cursor) ? "0" : b,
                      G = D.list,
                      N)
                    return [2];
                  if (k = i.itemId,
                      V = i.secUid,
                      x = void 0 === (W = i.pullType) ? 2 : W,
                      Y = (H = (0,
                          I.x)()).language,
                      q = H.abTestVersion,
                      z = H.user,
                      K = e(T.A).bizContext,
                      $ = (0,
                          l.uk)(Y),
                      Q = null == K || null == (u = K.videoCoverSettings) ? void 0 : u.format,
                      j = (0,
                          p.PJ)(e(p.WH)),
                      Z = null != (X = null == (d = e(E.Pu)[k]) ? void 0 : d.CategoryType) ? X : 0,
                      et = "v0" !== (ee = null != (J = null == q || null == (c = q.parameters.video_detail_yml_creator) ? void 0 : c.vid) ? J : "v0") && !z,
                      ei = "v2" === ee,
                      es = "v1" === (eo = null != (en = null == q || null == (B = q.parameters.fyp_on_detail) ? void 0 : B.vid) ? en : "v0") || "v4" === eo || "v5" === eo,
                      t(O, function (e) {
                        return (0,
                            s._)((0,
                            o._)({}, e), {
                          loading: !0
                        })
                      }),
                      !(et && V && U))
                    return [3, 2];
                  return [4, (0,
                      L.Ob)({
                    aid: m.xE,
                    count: 16,
                    cursor: F,
                    secUid: V,
                    language: $,
                    coverFormat: Q
                  })];
                case 1:
                  return (er = eM.sent()).itemList = null == (ea = er.itemList) ? void 0 : ea.filter(function (e) {
                    return ei ? !e.imagePost : !e.isPinnedItem && !e.imagePost
                  }),
                      er.hasMore = !!er.itemList && er.itemList.length > 3 && er.hasMore,
                      [3, 6];
                case 2:
                  if (!(es && U))
                    return [3, 4];
                  return ev = void 0 === (e_ = (eI = null != (eh = (0,
                      I.x)()) ? eh : {}).language) ? "en" : e_,
                      eT = eI.abTestVersion,
                      ef = (0,
                          w.tR)().getPortraitTarget("vv_avg_per_day"),
                      ep = "undefined" != typeof window && "connection" in navigator ? navigator.connection.downlink : void 0,
                      eE = e(P._v).totalDeviceScore,
                      em = (0,
                          l.uk)(ev),
                      eS = R.Nu,
                  (eg = null != ef ? ef : null == eT || null == (eu = eT.parameters.change_list_length_new) ? void 0 : eu.vid) && (eS = Number(eg)),
                      eL = null == eT || null == (ed = eT.parameters.tt_player_dash) ? void 0 : ed.vid,
                      eC = "",
                  "object" == (void 0 === eL ? "undefined" : (0,
                      r._)(eL)) && "format" in eL && (eC = eL.format.toLowerCase()),
                      eA = {
                        isNonPersonalized: j,
                        aid: m.xE,
                        count: 1 === x ? R.K2 : eS,
                        language: em,
                        clientABVersions: null == eT ? void 0 : eT.versionName,
                        pullType: x,
                        coverFormat: null == K || null == (ec = K.videoCoverSettings) ? void 0 : ec.format,
                        vv_count_fyp: parseInt((0,
                            f._S)(m.Bu, "0"), 10) || 0,
                        vv_count: parseInt((0,
                            f._S)(m.$H, "0"), 10) || 0,
                        cpu_core_number: "undefined" != typeof navigator && navigator.hardwareConcurrency ? navigator.hardwareConcurrency : 0,
                        dark_mode: "dark" === (0,
                            A.MJ)(m.n9) && "1" === (0,
                            A.MJ)(m.HF),
                        time_of_day: new Date().getHours(),
                        day_of_week: new Date().getDay(),
                        enable_cache: !1,
                        user_is_login: void 0,
                        video_encoding: eC,
                        launch_mode: (0,
                            f.Hd)(y.O_),
                        device_score: eE.toString(),
                        network: ep,
                        window_height: "undefined" != typeof window ? window.innerHeight : void 0,
                        window_width: "undefined" != typeof window ? window.innerWidth : void 0
                      },
                      [4, (0,
                          M.Hy)(eA)];
                case 3:
                  return eR = eM.sent(),
                      ey = G.length,
                      eR.itemList = null == (el = eR.itemList) ? void 0 : el.filter(function (e) {
                        return !e.liveRoomInfo
                      }),
                      er = (0,
                          R.r6)(ey, eR),
                      [3, 6];
                case 4:
                  var ew;
                  return eP = (0,
                      C.z)(),
                      [4, (ew = {
                        aid: m.xE,
                        count: 16,
                        itemID: k,
                        language: $,
                        coverFormat: Q,
                        isNonPersonalized: j,
                        clientABVersions: null == q ? void 0 : q.versionName,
                        cursor: F,
                        CategoryType: Z,
                        video_encoding: eP,
                        launch_mode: (0,
                            f.Hd)(y.O_)
                      },
                          (0,
                              n._)(function () {
                            var e;
                            return (0,
                                a.__generator)(this, function (t) {
                              switch (t.label) {
                                case 0:
                                  return [4, (0,
                                      h.e)()];
                                case 1:
                                  return e = t.sent(),
                                      [2, _.h.get("/api/related/item_list/", {
                                        query: (0,
                                            s._)((0,
                                            o._)({}, ew), {
                                          clientABVersions: e.join(",")
                                        }),
                                        baseUrlType: v.Z4.FixedWww
                                      })]
                              }
                            })
                          })())];
                case 5:
                  er = eM.sent(),
                      eM.label = 6;
                case 6:
                  return (0,
                      S.Tj)(e, t, O, g.Lz.Video, er),
                      [3, 8];
                case 7:
                  return eM.sent(),
                      (0,
                          S.e_)(t, O),
                      [3, 8];
                case 8:
                  return [2]
              }
            })
          })()
        },
        resetRelatedList: function () {
          t(O, m.hA)
        }
      }
    })
        , D = B.useAtomService
        , N = B.useServiceDispatchers
        , U = B.useServiceState
        , b = B.getStaticApi
  },
  66709: function (e, t, i) {
    i.d(t, {
      Ag: function () {
        return L
      },
      Ds: function () {
        return A
      },
      jf: function () {
        return C
      }
    });
    var n, o = i(79066), s = i(35383), r = i(5377), a = i(45996), u = i(6586), d = i(72516), c = i(4676), l = i(10625),
        h = i(65030), I = i(89458), _ = i(38306), v = i(7434), T = i(8262), f = i(95525), p = i(55882), E = i(28669),
        m = (0,
            l.p)("atomsMapForItemListKey@tiktok/webapp-atoms", (n = {},
            (0,
                s._)(n, _.Lz.UserPost, f.HP),
            (0,
                s._)(n, _.Lz.UserRepost, p.O0),
            (0,
                s._)(n, _.Lz.UserLiked, T.MQ),
            (0,
                s._)(n, _.Lz.Favorites, v.h9),
            n)), S = (0,
            l.p)("userItemListAtom@tiktok/webapp-atoms", function (e) {
          var t;
          return t = {},
              (0,
                  s._)(t, _.Lz.UserPost, e(f.HP)),
              (0,
                  s._)(t, _.Lz.UserRepost, e(p.O0)),
              (0,
                  s._)(t, _.Lz.UserLiked, e(T.MQ)),
              (0,
                  s._)(t, _.Lz.Favorites, e(v.h9)),
              t
        }, function () {
        }), g = (0,
            c.i)(S, function (e, t) {
          return {
            setLoading: function (i, n) {
              (0,
                  E.yI)(i) && t(e(m)[i], function (e) {
                return (0,
                    a._)((0,
                    r._)({}, e), {
                  loading: n
                })
              })
            },
            getItemList: function (e, t) {
              return (0,
                  o._)(function () {
                return (0,
                    d.__generator)(this, function (i) {
                  switch (e) {
                    case _.Lz.UserPost:
                      return [2, (0,
                          f.s5)().getItemList(t)];
                    case _.Lz.UserRepost:
                      return [2, (0,
                          p.rg)().getItemList(t)];
                    case _.Lz.UserLiked:
                      return [2, (0,
                          T.vz)().getItemList(t)];
                    case _.Lz.Favorites:
                      return [2, (0,
                          v.k6)().getItemList(t)];
                    default:
                      return [2, (0,
                          f.s5)().getItemList(t)]
                  }
                })
              })()
            },
            setDeleteVideo: function (i) {
              var n = !0
                  , o = !1
                  , s = void 0;
              try {
                for (var r, a = Object.entries(e(m))[Symbol.iterator](); !(n = (r = a.next()).done); n = !0) {
                  var d = (0,
                      u._)(r.value, 2)
                      , c = d[0]
                      , l = d[1];
                  c === _.Lz.UserPost ? (0,
                      f.s5)().setDeleteVideoForUserPostAtom(i) : (0,
                      I.Fx)(t, l, i)
                }
              } catch (e) {
                o = !0,
                    s = e
              } finally {
                try {
                  n || null == a.return || a.return()
                } finally {
                  if (o)
                    throw s
                }
              }
            },
            resetItemList: function (i) {
              (0,
                  E.yI)(i) && t(e(m)[i], h.hA)
            },
            resetAllLists: function () {
              var e = arguments.length > 0 && void 0 !== arguments[0] && arguments[0];
              (0,
                  f.s5)().resetAllLists(e),
                  (0,
                      p.rg)().resetItemList(e),
                  t(T.MQ, h.hA),
                  t(v.h9, h.hA)
            }
          }
        }), L = (g.useAtomService,
            g.useServiceDispatchers), C = g.useServiceState, A = g.getStaticApi
  },
  7434: function (e, t, i) {
    i.d(t, {
      h9: function () {
        return f
      },
      iK: function () {
        return E
      },
      k6: function () {
        return m
      }
    });
    var n = i(79066)
        , o = i(5377)
        , s = i(45996)
        , r = i(72516)
        , a = i(73455)
        , u = i(4676)
        , d = i(10625)
        , c = i(80514)
        , l = i(42646)
        , h = i(56904)
        , I = i(65030)
        , _ = i(89458)
        , v = i(38306)
        , T = i(28669)
        , f = (0,
        a._)((0,
        d.p)("userFavoriteListAtom@tiktok/webapp-atoms", I.hA), {
      rehydrationKey: "desktop.userPage.userFavoriteList"
    })
        , p = (0,
        u.i)(f, function (e, t) {
      return {
        setLoading: function (e) {
          t(f, function (t) {
            return (0,
                s._)((0,
                o._)({}, t), {
              loading: e
            })
          })
        },
        getItemList: function (i) {
          return (0,
              n._)(function () {
            var a;
            return (0,
                r.__generator)(this, function (u) {
              switch (u.label) {
                case 0:
                  var d;
                  return u.trys.push([0, 2, , 3]),
                      t(f, function (e) {
                        return (0,
                            s._)((0,
                            o._)({}, e), {
                          loading: !0
                        })
                      }),
                      [4, (d = (0,
                          T.bv)(e, f, i),
                          (0,
                              n._)(function () {
                            var e;
                            return (0,
                                r.__generator)(this, function (t) {
                              switch (t.label) {
                                case 0:
                                  return [4, (0,
                                      c.e)()];
                                case 1:
                                  return e = t.sent(),
                                      [2, l.h.get("/api/user/collect/item_list/", {
                                        query: (0,
                                            s._)((0,
                                            o._)({}, d), {
                                          clientABVersions: e.join(",")
                                        }),
                                        baseUrlType: h.Z4.FixedWww
                                      })]
                              }
                            })
                          })())];
                case 1:
                  return a = u.sent(),
                      (0,
                          _.Tj)(e, t, f, v.Lz.Favorites, a, {
                        secUid: i.secUid
                      }),
                      t(f, function (e) {
                        var t;
                        return (0,
                            s._)((0,
                            o._)({}, e), {
                          total: String(null != (t = a.total) ? t : 0)
                        })
                      }),
                      [3, 3];
                case 2:
                  return u.sent(),
                      (0,
                          _.e_)(t, f),
                      [3, 3];
                case 3:
                  return [2]
              }
            })
          })()
        },
        resetItemList: function () {
          t(f, I.hA)
        }
      }
    })
        , E = (p.useAtomService,
        p.useServiceDispatchers,
        p.useServiceState)
        , m = p.getStaticApi
  },
  8262: function (e, t, i) {
    i.d(t, {
      MQ: function () {
        return f
      },
      cI: function () {
        return E
      },
      vz: function () {
        return m
      }
    });
    var n = i(79066)
        , o = i(5377)
        , s = i(45996)
        , r = i(72516)
        , a = i(73455)
        , u = i(4676)
        , d = i(10625)
        , c = i(80514)
        , l = i(42646)
        , h = i(56904)
        , I = i(65030)
        , _ = i(89458)
        , v = i(38306)
        , T = i(28669)
        , f = (0,
        a._)((0,
        d.p)("userLikedListAtom@tiktok/webapp-atoms", I.hA), {
      rehydrationKey: "desktop.userPage.userLikedList"
    })
        , p = (0,
        u.i)(f, function (e, t) {
      return {
        setLoading: function (e) {
          t(f, function (t) {
            return (0,
                s._)((0,
                o._)({}, t), {
              loading: e
            })
          })
        },
        getItemList: function (i) {
          return (0,
              n._)(function () {
            var a;
            return (0,
                r.__generator)(this, function (u) {
              switch (u.label) {
                case 0:
                  var d;
                  return u.trys.push([0, 2, , 3]),
                      t(f, function (e) {
                        return (0,
                            s._)((0,
                            o._)({}, e), {
                          loading: !0
                        })
                      }),
                      [4, (d = (0,
                          T.bv)(e, f, i),
                          (0,
                              n._)(function () {
                            var e;
                            return (0,
                                r.__generator)(this, function (t) {
                              switch (t.label) {
                                case 0:
                                  return [4, (0,
                                      c.e)()];
                                case 1:
                                  return e = t.sent(),
                                      [2, l.h.get("/api/favorite/item_list/", {
                                        query: (0,
                                            s._)((0,
                                            o._)({}, d), {
                                          clientABVersions: e.join(",")
                                        }),
                                        baseUrlType: h.Z4.FixedWww
                                      })]
                              }
                            })
                          })())];
                case 1:
                  return a = u.sent(),
                      (0,
                          _.Tj)(e, t, f, v.Lz.UserLiked, a, {
                        secUid: i.secUid
                      }),
                      [3, 3];
                case 2:
                  return u.sent(),
                      (0,
                          _.e_)(t, f),
                      [3, 3];
                case 3:
                  return [2]
              }
            })
          })()
        },
        resetItemList: function () {
          t(f, I.hA)
        }
      }
    })
        , E = (p.useAtomService,
        p.useServiceDispatchers)
        , m = (p.useServiceState,
        p.getStaticApi)
  },
  59151: function (e, t, i) {
    i.d(t, {
      DN: function () {
        return U
      },
      Ku: function () {
        return D
      },
      Ob: function () {
        return B
      },
      Tx: function () {
        return b
      },
      Ym: function () {
        return O
      }
    });
    var n = i(79066)
        , o = i(5377)
        , s = i(45996)
        , r = i(6586)
        , a = i(72516)
        , u = i(73455)
        , d = i(4676)
        , c = i(10625)
        , l = i(8561)
        , h = i(80514)
        , I = i(35144)
        , _ = i(75434)
        , v = i(91402)
        , T = i(38139)
        , f = i(48700)
        , p = i(2727)
        , E = i(22160)
        , m = i(42646)
        , S = i(56904)
        , g = i(88947)
        , L = i(29245)
        , C = i(89671)
        , A = i(17769)
        , R = i(96048)
        , y = i(65030)
        , P = i(89458)
        , M = i(38306)
        , w = i(28669)
        , O = (0,
        u._)((0,
        c.p)("userPostListLatestAtom@tiktok/webapp-atoms", y.hA), {
      rehydrationKey: "desktop.userPage.userPostListLatest"
    })
        , B = (0,
        v.M)({
      csr: function (e) {
        return (0,
            n._)(function () {
          var t, i, n;
          return (0,
              a.__generator)(this, function (r) {
            switch (r.label) {
              case 0:
                if (t = (0,
                    p.t)("userPostList"))
                  return [2, t];
                return [4, (0,
                    h.e)()];
              case 1:
                if (i = r.sent(),
                    n = (0,
                        E.DV)("userPostList"))
                  return R.P.emit("consume_prefetch_data", performance.now(), "unknown", "userPostList"),
                      [2, n.catch(function () {
                        return R.P.emit("consume_prefetch_data", performance.now(), "fail", "userPostList"),
                            m.h.get("/api/post/item_list/", {
                              query: (0,
                                  s._)((0,
                                  o._)({}, e), {
                                clientABVersions: i.join(",")
                              }),
                              baseUrlType: S.Z4.FixedWww
                            })
                      })];
                return [2, m.h.get("/api/post/item_list/", {
                  query: (0,
                      s._)((0,
                      o._)({}, e), {
                    clientABVersions: i.join(",")
                  }),
                  baseUrlType: S.Z4.FixedWww
                })]
            }
          })
        })()
      },
      ssr: function (e) {
        return (0,
            n._)(function () {
          var t, i, n, o, s, u, d, c, l, h, I, v, T, f, p, E, m;
          return (0,
              a.__generator)(this, function (a) {
            switch (a.label) {
              case 0:
                return t = (0,
                    _.yK)(),
                    i = e.count,
                    n = e.secUid,
                    s = void 0 === (o = e.userId) ? "" : o,
                    [4, Promise.all([t.service.location.getUserCountryCode(), t.service.sharedUtil.appId(), t.service.sharedSeo.isGoogleBot(), t.service.sharedSeo.isSearchEngineBot(), t.i18n.getLanguage(), t.service.commonConfig.getAbTestResultWithDolphin()])];
              case 1:
                return d = (u = r._.apply(void 0, [a.sent(), 5]))[0],
                    c = u[1],
                    l = u[2],
                    h = u[3],
                    I = u[4],
                    v = C.IC.ITEMLIST_POST,
                    l ? v = C.IC.ITEMLIST_POST_BOT_GOOGLE : h && (v = C.IC.GENERAL_BOT_ITEMLIST_POST),
                    [4, t.service.webapp.data.getItemList({
                      Type: A.SP9.POST,
                      SecUid: n,
                      Id: s,
                      MaxCursor: "0",
                      MinCursor: "0",
                      Count: i,
                      AppId: c,
                      Region: d,
                      Language: I,
                      Source: v,
                      Extra: {
                        user_agent: t.headers[y.UA] || ""
                      },
                      CoverFormat: e.coverFormat
                    })];
              case 2:
                return f = (T = a.sent()).statusCode,
                    p = T.hasMore,
                    E = T.maxCursor,
                    m = T.statusMsg,
                    [2, {
                      statusCode: f,
                      hasMore: p,
                      cursor: E,
                      itemList: T.items,
                      statusMsg: m
                    }]
            }
          })
        })()
      }
    })
        , D = function (e) {
      var t = (0,
          d.i)(e, function (t, i) {
        return {
          setLoading: function (t) {
            i(e, function (e) {
              return (0,
                  s._)((0,
                  o._)({}, e), {
                loading: t
              })
            })
          },
          getItemList: function (r) {
            return (0,
                n._)(function () {
              var n, u, d, c, h, v, p, m, S, C, A, R, y, O, D, N, U, b, F, G, k, V, W, x, H;
              return (0,
                  a.__generator)(this, function (a) {
                switch (a.label) {
                  case 0:
                    return a.trys.push([0, 2, , 3]),
                        i(e, function (e) {
                          return (0,
                              s._)((0,
                              o._)({}, e), {
                            loading: !0
                          })
                        }),
                        d = (0,
                            _.xw)().pathname,
                        h = (c = (0,
                            I.x)()).user,
                        v = c.abTestVersion,
                        p = r.secUid,
                        m = r.userId,
                        S = r.count,
                        C = r.postItemListRequestType,
                        A = r.filterPhotoContent,
                        R = r.locateItemID,
                        O = void 0 === (y = r.needPinnedItemIds) || y,
                        D = (0,
                            w.bv)(t, e, (0,
                            o._)({
                          secUid: p,
                          userId: m,
                          count: null != S ? S : E.M4,
                          postItemListRequestType: C,
                          needPinnedItemIds: O
                        }, R && {
                          locateItemID: R
                        })),
                        N = (0,
                            g.sn)(d) !== L.A.SearchResults && "0" === D.cursor && C === l.Fo.LATEST,
                        U = (null == v || null == (n = v.parameters.webapp_profile_page_caching) ? void 0 : n.vid) === "v1",
                        D.enable_cache = b = !h && N && U,
                        F = B(D),
                        i(e, function (e) {
                          return (0,
                              s._)((0,
                              o._)({}, e), {
                            prevPromise: F
                          })
                        }),
                        [4, F];
                  case 1:
                    if (V = null != (k = null == (u = (G = a.sent()).__headers) ? void 0 : u.cache_response) ? k : "",
                    b && T.n.handleCacheResult(V, f.L.User),
                    (W = t(e).prevPromise) && W !== F)
                      return [2];
                    return A && (G.itemList = null == (x = G.itemList) ? void 0 : x.filter(function (e) {
                      return !e.imagePost
                    })),
                        (0,
                            P.Tj)(t, i, e, M.Lz.UserPost, G, {
                          secUid: p
                        }),
                        [3, 3];
                  case 2:
                    return H = a.sent(),
                        (0,
                            _.mH)().warn("user post atom, error getItemList!", H),
                        (0,
                            P.e_)(i, e),
                        [3, 3];
                  case 3:
                    return [2]
                }
              })
            })()
          },
          resetItemList: function () {
            i(e, y.hA)
          }
        }
      });
      return {
        useAtomService: t.useAtomService,
        useServiceDispatchers: t.useServiceDispatchers,
        useServiceState: t.useServiceState,
        getStaticApi: t.getStaticApi
      }
    }
        , N = D(O)
        , U = N.useAtomService
        , b = (N.useServiceDispatchers,
        N.useServiceState,
        N.getStaticApi)
  },
  95525: function (e, t, i) {
    i.d(t, {
      BS: function () {
        return w
      },
      ch: function () {
        return M
      },
      eW: function () {
        return A
      },
      HP: function () {
        return y
      },
      s5: function () {
        return B
      },
      I4: function () {
        return O
      },
      yR: function () {
        return R
      }
    });
    var n, o = i(79066), s = i(35383), r = i(5377), a = i(45996), u = i(72516), d = i(4676), c = i(10625), l = i(8561),
        h = i(65030), I = i(89458), _ = i(59151), v = (0,
            c.p)("userPostListOldestAtom@tiktok/webapp-atoms", h.hA), T = (0,
            _.Ku)(v), f = (T.useAtomService,
            T.useServiceDispatchers,
            T.useServiceState,
            T.getStaticApi), p = (0,
            c.p)("userPostListPopularAtom@tiktok/webapp-atoms", h.hA), E = (0,
            _.Ku)(p), m = (E.useAtomService,
            E.useServiceDispatchers,
            E.useServiceState,
            E.getStaticApi), S = i(28669), g = (0,
            c.p)("atomsMapForPostItemListRequestType@tiktok/webapp-atoms", (n = {},
            (0,
                s._)(n, l.Fo.LATEST, _.Ym),
            (0,
                s._)(n, l.Fo.POPULAR, p),
            (0,
                s._)(n, l.Fo.OLDEST, v),
            n)), L = (0,
            c.p)("sortTypeAtom@tiktok/webapp-atoms", l.Fo.LATEST), C = (0,
            d.i)(L, function (e, t) {
          return {
            setUserPostSortType: function (e) {
              t(L, e)
            }
          }
        }), A = C.useAtomService, R = C.useServiceState, y = (0,
            c.p)("userPostListAtom@tiktok/webapp-atoms", function (e) {
          var t = e(L)
              , i = e(g)[t];
          return e(i)
        }, function () {
        }), P = (0,
            d.i)(y, function (e, t) {
          return {
            setLoading: function (i) {
              (0,
                  S.K8)(e(L)) && t(e(g)[e(L)], function (e) {
                return (0,
                    a._)((0,
                    r._)({}, e), {
                  loading: i
                })
              })
            },
            getItemList: function (t) {
              return (0,
                  o._)(function () {
                return (0,
                    u.__generator)(this, function (i) {
                  switch (e(L)) {
                    case l.Fo.LATEST:
                      return t.postItemListRequestType = l.Fo.LATEST,
                          [2, (0,
                              _.Tx)().getItemList(t)];
                    case l.Fo.POPULAR:
                      return t.postItemListRequestType = l.Fo.POPULAR,
                          [2, m().getItemList(t)];
                    case l.Fo.OLDEST:
                      return t.postItemListRequestType = l.Fo.OLDEST,
                          [2, f().getItemList(t)];
                    default:
                      return t.postItemListRequestType = l.Fo.LATEST,
                          [2, (0,
                              _.Tx)().getItemList(t)]
                  }
                })
              })()
            },
            resetItemList: function () {
              (0,
                  S.K8)(e(L)) && t(e(g)[e(L)], h.hA)
            },
            resetAllLists: function () {
              var e = arguments.length > 0 && void 0 !== arguments[0] && arguments[0];
              t(L, l.Fo.LATEST),
                  t(_.Ym, e ? function (e) {
                        return (0,
                            r._)({
                          prevPromise: e.prevPromise
                        }, h.hA)
                      }
                      : h.hA),
                  t(p, e ? function (e) {
                        return (0,
                            r._)({
                          prevPromise: e.prevPromise
                        }, h.hA)
                      }
                      : h.hA),
                  t(v, e ? function (e) {
                        return (0,
                            r._)({
                          prevPromise: e.prevPromise
                        }, h.hA)
                      }
                      : h.hA)
            },
            setDeleteVideoForUserPostAtom: function (i) {
              var n = !0
                  , o = !1
                  , s = void 0;
              try {
                for (var r, a = Object.values(e(g))[Symbol.iterator](); !(n = (r = a.next()).done); n = !0) {
                  var u = r.value;
                  (0,
                      I.Fx)(t, u, i)
                }
              } catch (e) {
                o = !0,
                    s = e
              } finally {
                try {
                  n || null == a.return || a.return()
                } finally {
                  if (o)
                    throw s
                }
              }
            }
          }
        }), M = P.useAtomService, w = P.useServiceDispatchers, O = P.useServiceState, B = P.getStaticApi
  },
  55882: function (e, t, i) {
    i.d(t, {
      O0: function () {
        return L
      },
      rg: function () {
        return y
      },
      to: function () {
        return R
      },
      zu: function () {
        return A
      }
    });
    var n = i(79066)
        , o = i(5377)
        , s = i(45996)
        , r = i(6586)
        , a = i(79262)
        , u = i(72516)
        , d = i(73455)
        , c = i(4676)
        , l = i(10625)
        , h = i(80514)
        , I = i(75434)
        , _ = i(91402)
        , v = i(42646)
        , T = i(56904)
        , f = i(89671)
        , p = i(65030)
        , E = i(89458)
        , m = i(38306)
        , S = i(28669)
        , g = (0,
        _.M)({
      csr: function (e) {
        return (0,
            n._)(function () {
          var t;
          return (0,
              u.__generator)(this, function (i) {
            switch (i.label) {
              case 0:
                return [4, (0,
                    h.e)()];
              case 1:
                return t = i.sent(),
                    [2, v.h.get("/api/repost/item_list/", {
                      query: (0,
                          s._)((0,
                          o._)({}, e), {
                        clientABVersions: t.join(",")
                      }),
                      baseUrlType: T.Z4.FixedWww
                    })]
            }
          })
        })()
      },
      ssr: function (e) {
        return (0,
            n._)(function () {
          var t, i, n, o, s, d, c, l, h, _, v, T, E, m, S, g, L, C, A, R, y;
          return (0,
              u.__generator)(this, function (u) {
            switch (u.label) {
              case 0:
                return i = (0,
                    I.yK)(),
                    o = void 0 === (n = e.count) ? 15 : n,
                    s = e.secUid,
                    d = e.userId,
                    [4, Promise.all([i.service.location.getUserCountryCode(), i.service.sharedUtil.appId(), i.i18n.getLanguage(), i.service.commonConfig.getAbTestResultWithDolphin(), i.service.sharedSeo.isGoogleBot(), i.service.sharedSeo.isSearchEngineBot()])];
              case 1:
                return l = (c = r._.apply(void 0, [u.sent(), 6]))[0],
                    h = c[1],
                    _ = c[2],
                    v = c[3],
                    T = c[4],
                    E = c[5],
                    m = T ? 159 : E ? 160 : f.IC.WEBAPP_ITEMLIST_REPOST,
                    S = null == v || null == (t = v.parameters.tt_player_dash) ? void 0 : t.vid,
                    g = "",
                "object" == (void 0 === S ? "undefined" : (0,
                    a._)(S)) && "format" in S && (g = S.format.toLowerCase()),
                    [4, i.service.webapp.data.getItemList({
                      SecUid: s,
                      Id: d,
                      MaxCursor: "0",
                      MinCursor: "0",
                      Count: o,
                      AppId: h,
                      Region: l,
                      Language: _,
                      Source: m,
                      Extra: {
                        user_agent: i.headers[p.UA] || "",
                        video_encoding: g
                      },
                      CoverFormat: e.coverFormat
                    })];
              case 2:
                return C = (L = u.sent()).statusCode,
                    A = L.hasMore,
                    R = L.maxCursor,
                    y = L.statusMsg,
                    [2, {
                      statusCode: C,
                      hasMore: A,
                      cursor: R,
                      itemList: L.items,
                      statusMsg: y
                    }]
            }
          })
        })()
      }
    })
        , L = (0,
        d._)((0,
        l.p)("userRepostListAtom@tiktok/webapp-atoms", p.hA), {
      rehydrationKey: "userPage.userRepostList"
    })
        , C = (0,
        c.i)(L, function (e, t) {
      return {
        setLoading: function (e) {
          t(L, function (t) {
            return (0,
                s._)((0,
                o._)({}, t), {
              loading: e
            })
          })
        },
        getItemList: function (i) {
          return (0,
              n._)(function () {
            var n, r, a;
            return (0,
                u.__generator)(this, function (u) {
              switch (u.label) {
                case 0:
                  return u.trys.push([0, 2, , 3]),
                      t(L, function (e) {
                        return (0,
                            s._)((0,
                            o._)({}, e), {
                          loading: !0
                        })
                      }),
                      n = g((0,
                          S.bv)(e, L, i)),
                      t(L, function (e) {
                        return (0,
                            s._)((0,
                            o._)({}, e), {
                          prevPromise: n
                        })
                      }),
                      [4, n];
                case 1:
                  if (r = u.sent(),
                  (a = e(L).prevPromise) && a !== n)
                    return [2];
                  return (0,
                      E.Tj)(e, t, L, m.Lz.UserRepost, r, {
                    secUid: i.secUid
                  }),
                      [3, 3];
                case 2:
                  return u.sent(),
                      (0,
                          E.e_)(t, L),
                      [3, 3];
                case 3:
                  return [2]
              }
            })
          })()
        },
        resetItemList: function () {
          var e = arguments.length > 0 && void 0 !== arguments[0] && arguments[0];
          t(L, e ? function (e) {
                return (0,
                    o._)({
                  prevPromise: e.prevPromise
                }, p.hA)
              }
              : p.hA)
        }
      }
    })
        , A = C.useAtomService
        , R = (C.useServiceDispatchers,
        C.useServiceState)
        , y = C.getStaticApi
  },
  28669: function (e, t, i) {
    i.d(t, {
      K8: function () {
        return v
      },
      bv: function () {
        return I
      },
      yI: function () {
        return _
      }
    });
    var n = i(5377)
        , o = i(45996)
        , s = i(8561)
        , r = i(35144)
        , a = i(66772)
        , u = i(65030)
        , d = i(38306)
        , c = i(46036)
        , l = [d.Lz.UserPost, d.Lz.UserRepost, d.Lz.UserLiked, d.Lz.Favorites]
        , h = [s.Fo.LATEST, s.Fo.POPULAR, s.Fo.OLDEST];

    function I(e, t, i) {
      var d, l = i.secUid, h = i.userId, I = i.count, _ = i.postItemListRequestType, v = i.locateItemID,
          T = i.needPinnedItemIds, f = i.enable_cache, p = e(t).cursor, E = (0,
              r.x)(), m = E.language, S = E.region, g = e(a.A).bizContext, L = (0,
              c.z)();
      return (0,
          o._)((0,
          n._)({
        secUid: l,
        aid: u.xE,
        count: null != I ? I : 30,
        cursor: void 0 === p ? "0" : p,
        region: S,
        language: m,
        userId: h,
        coverFormat: null == g || null == (d = g.videoCoverSettings) ? void 0 : d.format,
        post_item_list_request_type: null != _ ? _ : s.Fo.LATEST,
        needPinnedItemIds: void 0 === T || T,
        video_encoding: L
      }, v && {
        locate_item_id: v
      }), {
        enable_cache: f
      })
    }

    function _(e) {
      return void 0 !== l.find(function (t) {
        return t === e
      })
    }

    function v(e) {
      return void 0 !== h.find(function (t) {
        return t === e
      })
    }
  },
  46036: function (e, t, i) {
    i.d(t, {
      z: function () {
        return o
      }
    });
    var n = i(54363)
        , o = function () {
      var e;
      return (null != (e = (0,
          n.d)("tt_player_dash")) ? e : {
        vid: "v0",
        format: "MP4"
      }).format.toLowerCase()
    }
  },
  20386: function (e, t, i) {
    i.d(t, {
      D: function () {
        return E
      }
    });
    var n = i(54363)
        , o = i(20122)
        , s = i(33040)
        , r = i(94238)
        , a = i(32536)
        , u = i(38306)
        , d = i(50668)
        , c = i(84117)
        , l = i(32460)
        , h = i(17832)
        , I = i(72140)
        , _ = i(95525)
        , v = i(55882)
        , T = i(8262)
        , f = i(7434)
        ,
        p = new Map([[u.Lz.ForYou, h.e4], [u.Lz.Music, l.l6], [u.Lz.Explore, d.dQ], [u.Lz.Challenge, s.T8], [u.Lz.CreatorTab, a.DK], [u.Lz.UserPost, _.HP], [u.Lz.UserRepost, v.O0], [u.Lz.UserLiked, T.MQ], [u.Lz.Favorites, f.h9], [u.Lz.Messages, c.D3], [u.Lz.Video, I.Hx]])
        , E = function (e) {
          if (e) {
            var t, i, s = (null != (t = (0,
                n.d)("webapp_collection_profile")) ? t : "v0") !== "v0";
            if (e === u.Lz.Collection && s)
              return r.ek;
            if ((null != (i = (0,
                n.d)("search_page_jotai")) ? i : "v0") !== "v0") {
              if (e === u.Lz.SearchTop)
                return o.TD;
              if (e === u.Lz.SearchVideo)
                return o.A8;
              if (e === u.Lz.SearchPhoto)
                return o.fL
            }
            return p.get(e)
          }
        }
  },
  38684: function (e, t, i) {
    i.d(t, {
      qV: function () {
        return a
      },
      uq: function () {
        return u
      },
      xy: function () {
        return r
      }
    });
    var n, o, s, r = ((n = {}).Public = "1",
        n.Private = "2",
        n.Friends = "3",
        n), a = ((o = {})[o.DEFAULT = 0] = "DEFAULT",
        o[o.IS_REVIEWING = 1] = "IS_REVIEWING",
        o), u = ((s = {})[s.DEFAULT = 0] = "DEFAULT",
        s[s.COMMENTS_OFF = 1] = "COMMENTS_OFF",
        s[s.COMMENTS_OFF_ADS = 2] = "COMMENTS_OFF_ADS",
        s[s.COMMENTS_SCHEDULED = 3] = "COMMENTS_SCHEDULED",
        s[s.COMMENTS_FRIENDS_ONLY = 4] = "COMMENTS_FRIENDS_ONLY",
        s[s.COMMENTS_ZERO = 5] = "COMMENTS_ZERO",
        s)
  },
  72702: function (e, t, i) {
    i.d(t, {
      ud: function () {
        return x
      },
      F3: function () {
        return Y
      },
      l8: function () {
        return W
      },
      mG: function () {
        return H
      },
      Pu: function () {
        return k
      }
    });
    var n = i(79066)
        , o = i(35383)
        , s = i(5377)
        , r = i(45996)
        , a = i(16327)
        , u = i(54333)
        , d = i(72516)
        , c = i(4237)
        , l = i(53036)
        , h = i(18499)
        , I = i(73455)
        , _ = i(4676)
        , v = i(10625)
        , T = i(8561)
        , f = i(48007)
        , p = i(35144)
        , E = i(60724)
        , m = i(90542)
        , S = i(61868)
        , g = i(47149)
        , L = i(50173)
        , C = i(48859)
        , A = i(21916)
        , R = i(50644)
        , y = i(6984)
        , P = i(35702)
        , M = i(57007)
        , w = i(55453)
        , O = i(35379)
        , B = i(7871)
        , D = i(89458)
        , N = i(38684)
        , U = i(42646)
        , b = i(56904)
        , F = i(57248)
        , G = function (e, t) {
      var i, n, o, a, u, d, c, l, h, I, _, v, T, f, p, E = F.l6.isItemTranslated(null != t ? t : {
        id: ""
      }), m = null != (v = null == (i = e.anchors) ? void 0 : i.filter(function (e) {
        return 54 === e.type
      })) ? v : [], S = null != (T = null == (n = e.anchors) ? void 0 : n.filter(function (e) {
        return 28 === e.type
      })) ? T : [], g = (0,
          r._)((0,
          s._)({}, e), {
        video: e.video,
        nickname: null == (o = e.author) ? void 0 : o.nickname,
        author: null == (a = e.author) ? void 0 : a.uniqueId,
        authorId: null == (u = e.author) ? void 0 : u.id,
        authorSecId: null == (d = e.author) ? void 0 : d.secUid,
        avatarThumb: null == (c = e.author) ? void 0 : c.avatarThumb,
        downloadSetting: null == (l = e.author) ? void 0 : l.downloadSetting,
        authorPrivate: null == (h = e.author) ? void 0 : h.privateAccount,
        stateControlledMedia: null == (I = e.author) ? void 0 : I.stateControlledMedia,
        capcutAnchorsOriginal: m,
        capcutAnchors: (null == (_ = e.poi) ? void 0 : _.id) ? [] : m,
        effectAnchors: S,
        videoSuggestWordsList: null != (f = e.videoSuggestWordsList) ? f : null == t ? void 0 : t.videoSuggestWordsList,
        keywordTags: null != (p = e.keywordTags) ? p : null == t ? void 0 : t.keywordTags
      });
      return E && t && F.l6.mergeItemStructWithTranslation(g, F.l6.getTranslation(t), E),
          g
    }
        , k = (0,
        I._)((0,
        v.p)("itemAtom@tiktok/webapp-atoms", {}), {
      rehydrationKey: "webapp.item"
    })
        , V = (0,
        _.i)(k, function (e, t) {
      return {
        setItem: function (e) {
          var i = e.id;
          t(k, function (t) {
            return (0,
                r._)((0,
                s._)({}, t), (0,
                o._)({}, i, G(e, t[i])))
          })
        },
        multiSetItem: function (i) {
          var n = e(k)
              , o = (0,
              s._)({}, n);
          i.forEach(function (e) {
            var t = e.id;
            o[t] = G(e, n[t])
          }),
              t(k, o)
        },
        updateItem: function (i) {
          e(k)[i.id] && t(k, function (e) {
            return (0,
                r._)((0,
                s._)({}, e), (0,
                o._)({}, i.id, (0,
                c.A)(e[i.id], i)))
          })
        },
        setLike: function (i) {
          var n = i.id
              , a = i.liked
              , u = i.count
              , d = e(k)[n];
          d && (d.stats && (d.stats = (0,
              r._)((0,
              s._)({}, d.stats), {
            diggCount: u
          })),
          d.statsV2 && (d.statsV2 = (0,
              r._)((0,
              s._)({}, d.statsV2), {
            diggCount: u.toString()
          })),
              t(k, function (e) {
                return (0,
                    r._)((0,
                    s._)({}, e), (0,
                    o._)({}, n, (0,
                    r._)((0,
                    s._)({}, d), {
                  digged: a
                })))
              }))
        },
        setCollect: function (i) {
          var n = i.id
              , a = i.collected
              , u = i.count
              , d = e(k)[n];
          d && (d.stats && (d.stats = (0,
              r._)((0,
              s._)({}, d.stats), {
            collectCount: u
          })),
          d.statsV2 && (d.statsV2 = (0,
              r._)((0,
              s._)({}, d.statsV2), {
            collectCount: u.toString()
          })),
              t(k, function (e) {
                return (0,
                    r._)((0,
                    s._)({}, e), (0,
                    o._)({}, n, (0,
                    r._)((0,
                    s._)({}, d), {
                  collected: a
                })))
              }))
        },
        setCommentCount: function (i) {
          var n = i.id
              , a = i.commentCount
              , u = e(k)[n];
          u && (u.stats && (u.stats = (0,
              r._)((0,
              s._)({}, u.stats), {
            commentCount: a
          })),
          u.statsV2 && (u.statsV2 = (0,
              r._)((0,
              s._)({}, u.statsV2), {
            commentCount: a.toString()
          })),
              t(k, function (e) {
                return (0,
                    r._)((0,
                    s._)({}, e), (0,
                    o._)({}, n, (0,
                    s._)({}, u)))
              }))
        },
        setResolutionList: function (t) {
          var i = t.resolutionList
              , n = t.id
              , o = e(k)[n];
          o && (o.resolutionList = ["auto"].concat((0,
              u._)(i.filter(function (e) {
            return "auto" !== e
          }))))
        },
        prependRepost: function (i) {
          var n = i.id
              , a = i.reposted
              , d = i.currentUser
              , c = i.count
              , l = e(k)[n];
          l && (l.statsV2 && (l.statsV2 = (0,
              r._)((0,
              s._)({}, l.statsV2), {
            repostCount: c.toString()
          })),
              t(k, function (e) {
                var t, i, c, h, I, _ = (0,
                    u._)(null != (i = null == (t = e[n]) ? void 0 : t.repostList) ? i : []);
                if (a)
                  _.unshift((0,
                      r._)((0,
                      s._)({}, d), {
                    id: d.uid,
                    avatarThumb: null != (c = d.avatarUri[0]) ? c : "",
                    avatarMedium: null != (h = d.avatarUri[0]) ? h : "",
                    avatarLarger: null != (I = d.avatarUri[0]) ? I : "",
                    nickname: d.nickName,
                    relation: T.yf.NONE
                  }));
                else {
                  var v = _.findIndex(function (e) {
                    return e.secUid === d.secUid
                  });
                  _.splice(v, 1)
                }
                return (0,
                    r._)((0,
                    s._)({}, e), (0,
                    o._)({}, n, (0,
                    r._)((0,
                    s._)({}, l), {
                  repostList: _
                })))
              }))
        },
        reduceOrIncreaseCommentCount: function (i) {
          var n = i.id
              , a = i.isReduce
              , u = i.min
              , d = void 0 === u ? 0 : u
              , c = e(k)
              , l = c[n];
          if (l) {
            if (l.stats) {
              var h = a ? Math.max(d, l.stats.commentCount - 1) : l.stats.commentCount + 1;
              l.stats = (0,
                  r._)((0,
                  s._)({}, l.stats), {
                commentCount: h
              })
            }
            if (l.statsV2) {
              var I = a ? BigInt(l.statsV2.commentCount) - BigInt(1) : BigInt(l.statsV2.commentCount) + BigInt(1);
              I < BigInt(d) && (I = BigInt(d)),
                  l.statsV2 = (0,
                      r._)((0,
                      s._)({}, l.statsV2), {
                    commentCount: I.toString()
                  })
            }
            t(k, (0,
                r._)((0,
                s._)({}, c), (0,
                o._)({}, n, (0,
                s._)({}, l))))
          }
        },
        addItems: function (e, t) {
          var i = this
              , n = e.filter(function (e) {
            return !!e.author
          }).map(function (e) {
            return e.author
          })
              , o = e.filter(function (e) {
            var t;
            return !!((null == e || null == (t = e.liveRoomInfo) ? void 0 : t.ownerInfo) && (0,
                D.Jl)(e))
          }).map(function (e) {
            return (0,
                r._)((0,
                s._)({}, e.liveRoomInfo.ownerInfo), {
              roomId: e.liveRoomInfo.roomID
            })
          })
              , a = e.map(function (e) {
            return (0,
                r._)((0,
                s._)({}, e), {
              logId: t
            })
          })
              , u = (0,
              O.Gp)();
          (0,
              h.unstable_batchedUpdates)(function () {
            u.multiSetUser(n.concat(o)),
                i.multiSetItem(a)
          })
        },
        postCollectVideo: function (t) {
          return (0,
              n._)(function () {
            var i, s, r, a, u, c, l, h, I, _, v, f, p, m, g, L, C;
            return (0,
                d.__generator)(this, function (A) {
              switch (A.label) {
                case 0:
                  i = this,
                      s = e(k),
                      r = e(O.p9),
                      u = s[a = t.itemId],
                      l = r.users[null != (c = null == u ? void 0 : u.author) ? c : ""],
                      I = void 0 !== (h = u.collected) && h,
                      f = Number(null != (v = null == (_ = u.stats) ? void 0 : _.collectCount) ? v : 0),
                      p = I ? T.Pm.ITEM_CANCEL_COLLECT : T.Pm.ITEM_COLLECT,
                      g = {
                        aid: E.xE,
                        itemId: a,
                        action: p,
                        secUid: null != (m = null == l ? void 0 : l.secUid) ? m : ""
                      },
                      this.setCollect({
                        id: a,
                        collected: !I,
                        count: I ? Math.max(0, f - 1) : f + 1
                      }),
                      A.label = 1;
                case 1:
                  var R;
                  return A.trys.push([1, 3, , 4]),
                      [4, (R = g,
                          (0,
                              n._)(function () {
                            return (0,
                                d.__generator)(this, function (e) {
                              return [2, U.h.post("/api/item/collect/", {
                                query: R,
                                baseUrlType: b.Z4.FixedWww,
                                headers: (0,
                                    o._)({}, b.nk, U.h.csrfToken)
                              })]
                            })
                          })())];
                case 2:
                  if (L = A.sent(),
                      S.W.handleFavoriteResult({
                        group_id: a,
                        author_id: null != (C = null == l ? void 0 : l.id) ? C : ""
                      }, p),
                  L.statusCode !== M.s.Ok)
                    return [2, void setTimeout(function () {
                      i.setCollect({
                        id: a,
                        collected: I,
                        count: f
                      })
                    }, 3e3)];
                  return [2, L];
                case 3:
                  return A.sent(),
                      [3, 4];
                case 4:
                  return [2]
              }
            })
          }).call(this)
        },
        postLikeVideo: function (t) {
          return (0,
              n._)(function () {
            var i, u, c, l, h, I, _, v, T, E, m, S, R, y, w, D, N, F, G, V, W, x, H, Y, q, z, K, $, Q, j, X, Z, J, ee;
            return (0,
                d.__generator)(this, function (et) {
              switch (et.label) {
                case 0:
                  if (i = this,
                      u = e(k),
                      c = e(O.p9),
                      l = u[t.id],
                      I = c.users[null != (h = null == l ? void 0 : l.author) ? h : ""],
                      _ = (0,
                          p.x)().user,
                      v = l.digged,
                      T = l.stats,
                      E = l.poi,
                      m = l.imagePost,
                      S = l.subVideoMeta,
                      R = l.ad_info,
                      y = l.repostList,
                      w = t.id,
                      D = t.forceLike,
                      F = void 0 === (N = t.enter_method) ? g.c.Click : N,
                      G = t.channel_id,
                      V = (0,
                          a._)(t, ["id", "forceLike", "enter_method", "channel_id"]),
                      x = null != (W = null == T ? void 0 : T.diggCount) ? W : 0,
                      H = {
                        aweme_id: w,
                        channel_id: G,
                        friends_upvote: null == y ? void 0 : y.some(function (e) {
                          return e.secUid !== (null == _ ? void 0 : _.secUid)
                        }),
                        type: D ? f.u9F.Digg : v ? f.u9F.Undigg : f.u9F.Digg
                      },
                  D && v)
                    return [2];
                  et.label = 1;
                case 1:
                  et.trys.push([1, 6, , 7]),
                      this.setLike({
                        id: w,
                        liked: !v,
                        count: v ? Math.max(0, x - 1) : x + 1
                      }),
                      et.label = 2;
                case 2:
                  var ei;
                  return et.trys.push([2, 4, , 5]),
                      [4, (ei = H,
                          (0,
                              n._)(function () {
                            return (0,
                                d.__generator)(this, function (e) {
                              return [2, U.h.post("/api/commit/item/digg/", {
                                query: ei,
                                baseUrlType: b.Z4.FixedWww,
                                headers: (0,
                                    o._)({}, b.nk, U.h.csrfToken)
                              })]
                            })
                          })())];
                case 3:
                  return q = et.sent(),
                      [3, 5];
                case 4:
                  return et.sent(),
                      q = {
                        status_code: M.s.UnknownError
                      },
                      [3, 5];
                case 5:
                  return z = q.status_code,
                      K = q.status_msg,
                      Q = void 0 === ($ = q.log_pb) ? {} : $,
                      j = q.is_digg,
                  (z === M.s.VideoLikeFreq || z === M.s.VideoLikeFreq2) && (X = (0,
                      B.T)(),
                  K && P.F.open({
                    content: X(K),
                    duration: 3,
                    widthType: "half"
                  })),
                      Z = {},
                  R && (Z = (0,
                      L.n5)({
                    ad_info: R,
                    play_mode: null != (J = V.play_mode) ? J : C.Tk.OneColumn
                  })),
                      A.z.handleLikeVideoResult((0,
                          r._)((0,
                          s._)({}, V, Z), {
                        group_id: l.id,
                        author_id: null != (ee = null == I ? void 0 : I.id) ? ee : "",
                        log_pb: Q,
                        enter_method: F,
                        poi_id: null == E ? void 0 : E.id,
                        aweme_type: 150 * !!m,
                        pic_cnt: null == m || null == (Y = m.images) ? void 0 : Y.length,
                        is_sub_only_video: +!!S
                      }), H.type),
                  (z !== M.s.Ok || j === H.type) && setTimeout(function () {
                    return i.setLike({
                      id: l.id,
                      liked: v,
                      count: x
                    })
                  }, 3e3),
                      [3, 7];
                case 6:
                  return et.sent(),
                      [3, 7];
                case 7:
                  return [2]
              }
            })
          }).call(this)
        },
        postRepostVideo: function (t) {
          return (0,
              n._)(function () {
            var i, o, s, r, a, u, c, l, h, I, _, v, T, f, E, S, g, L;
            return (0,
                d.__generator)(this, function (C) {
              var A, R;
              switch (C.label) {
                case 0:
                  if (i = this,
                      o = (0,
                          B.T)(),
                      s = e(k)[t.id],
                      r = (0,
                          p.x)().user,
                  !s || !r)
                    return [2];
                  a = s.statsV2,
                      u = s.repostList,
                      c = t.id,
                      l = t.playMode,
                      h = t.playlistId,
                      _ = (null != (I = null == u ? void 0 : u.findIndex(function (e) {
                        return e.secUid === r.secUid
                      })) ? I : -1) >= 0,
                      T = Number(null != (v = null == a ? void 0 : a.repostCount) ? v : 0),
                      f = !_,
                      C.label = 1;
                case 1:
                  C.trys.push([1, 9, , 10]),
                      this.prependRepost({
                        id: c,
                        reposted: f,
                        currentUser: r,
                        count: _ ? Math.max(0, T - 1) : T + 1
                      }),
                      E = {
                        page_name: m.f.commonParams.page_name,
                        group_id: c,
                        play_mode: l,
                        playlist_id: h
                      },
                      C.label = 2;
                case 2:
                  if (C.trys.push([2, 7, , 8]),
                      g = {
                        item_id: c
                      },
                      !f)
                    return [3, 4];
                  return m.f.sendEvent("click_repost", E),
                      [4, (A = g,
                          (0,
                              n._)(function () {
                            return (0,
                                d.__generator)(this, function (e) {
                              return [2, U.h.post("/tiktok/v1/upvote/publish", {
                                query: A,
                                baseUrlType: b.Z4.FixedWww
                              })]
                            })
                          })())];
                case 3:
                  return S = C.sent().status_code,
                      [3, 6];
                case 4:
                  return m.f.sendEvent("click_repost_remove", E),
                      [4, (R = g,
                          (0,
                              n._)(function () {
                            return (0,
                                d.__generator)(this, function (e) {
                              return [2, U.h.post("/tiktok/v1/upvote/delete", {
                                query: R,
                                baseUrlType: b.Z4.FixedWww
                              })]
                            })
                          })())];
                case 5:
                  S = C.sent().status_code,
                      C.label = 6;
                case 6:
                  return [3, 8];
                case 7:
                  return C.sent(),
                      S = M.s.UnknownError,
                      [3, 8];
                case 8:
                  return P.F.destroy(),
                      L = f ? "pcWeb_reposted_toast" : "pcWeb_repostRemoved_toast",
                      S !== M.s.Ok ? (L = "Sorry, something wrong with the server, please try again.",
                          setTimeout(function () {
                            return i.prependRepost({
                              id: c,
                              reposted: _,
                              currentUser: r,
                              count: T
                            })
                          }, 3e3)) : f ? m.f.sendEvent("repost_success", E) : m.f.sendEvent("repost_remove_success", E),
                      P.F.open({
                        content: o(L),
                        duration: 3,
                        widthType: "half",
                        getContainer: w.M,
                        getContainerPosition: "fixed"
                      }),
                      [3, 10];
                case 9:
                  return C.sent(),
                      [3, 10];
                case 10:
                  return [2]
              }
            })
          }).call(this)
        },
        postDislikeVideo: function (t) {
          return (0,
              n._)(function () {
            var i, r, a, u, c, l, h, I, _;
            return (0,
                d.__generator)(this, function (v) {
              switch (v.label) {
                case 0:
                  i = e(k),
                      r = t.id,
                      a = t.author_id,
                      u = t.play_mode,
                      l = null == (c = i[r]) ? void 0 : c.ad_info,
                      h = {},
                  l && ((h = (0,
                      L.n5)({
                    ad_info: l,
                    play_mode: u
                  })).refer = R.Hq.Button),
                      y.V.handleClickDislike((0,
                          s._)({
                        group_id: r,
                        author_id: a,
                        play_mode: u
                      }, h)),
                      I = (0,
                          B.T)(),
                      P.F.open({
                        content: I("webapp_forYoufeed_videoRemoved_toast"),
                        duration: 3,
                        widthType: "half",
                        getContainer: w.M,
                        getContainerPosition: "fixed"
                      }),
                      _ = {
                        item_id: r,
                        item_author_id: a
                      },
                      v.label = 1;
                case 1:
                  v.trys.push([1, 6, , 7]),
                      v.label = 2;
                case 2:
                  var T;
                  return v.trys.push([2, 4, , 5]),
                      [4, (T = _,
                          (0,
                              n._)(function () {
                            return (0,
                                d.__generator)(this, function (e) {
                              return [2, U.h.post("/api/dislike/item/", {
                                query: T,
                                baseUrlType: b.Z4.FixedWww,
                                headers: (0,
                                    o._)({}, b.nk, U.h.csrfToken)
                              })]
                            })
                          })())];
                case 3:
                case 4:
                  return v.sent(),
                      [3, 5];
                case 5:
                  return [3, 7];
                case 6:
                  return v.sent(),
                      [3, 7];
                case 7:
                  return [2]
              }
            })
          })()
        },
        checkItemValidation: function (e) {
          return (0,
              n._)(function () {
            var t;
            return (0,
                d.__generator)(this, function (i) {
              switch (i.label) {
                case 0:
                  t = {
                    itemIds: e
                  },
                      i.label = 1;
                case 1:
                  var o;
                  return i.trys.push([1, 3, , 4]),
                      [4, (o = t,
                          (0,
                              n._)(function () {
                            return (0,
                                d.__generator)(this, function (e) {
                              return [2, U.h.get("/api/item/availability/", {
                                query: o,
                                baseUrlType: b.Z4.FixedWww
                              })]
                            })
                          })())];
                case 2:
                  return [2, i.sent()];
                case 3:
                  return i.sent(),
                      [3, 4];
                case 4:
                  return [2]
              }
            })
          })()
        },
        setItemPrivateState: function (i) {
          var n = i.id
              , a = i.visibility
              , u = e(k)
              , d = u[n];
          if (d) {
            var c = (0,
                r._)((0,
                s._)({}, d), {
              forFriend: a === N.xy.Friends,
              secret: a === N.xy.Private
            });
            t(k, (0,
                r._)((0,
                s._)({}, u), (0,
                o._)({}, n, c)))
          }
        },
        setDeleteVideo: function (e) {
          t(k, function (t) {
            return (0,
                l.A)(t, e)
          })
        },
        getStaticItem: function (t) {
          return e(k)[t]
        }
      }
    })
        , W = V.useAtomService
        , x = V.getStaticApi
        , H = V.useServiceDispatchers
        , Y = V.useServiceState
  },
  89671: function (e, t, i) {
    i.d(t, {
      IC: function () {
        return N
      },
      M$: function () {
        return B
      }
    });
    var n, o, s, r, a, u, d, c, l, h, I, _, v, T, f, p, E, m, S, g, L, C, A, R, y, P, M, w, O, B, D = i(95170);
    (o = (n = B || (B = {})).WebScene || (n.WebScene = {}))[o.REFLOW = 0] = "REFLOW",
        o[o.ACTIVITY = 1] = "ACTIVITY",
        o[o.EXTENSION = 2] = "EXTENSION",
        o[o.EXPLORE = 3] = "EXPLORE",
        o[o.ECOMMERCE = 4] = "ECOMMERCE",
        o[o.NEWYEAR = 5] = "NEWYEAR",
        o[o.WEBAPP = 6] = "WEBAPP",
        o[o.ITEMLIST_RECOMMEND = 7] = "ITEMLIST_RECOMMEND",
        o[o.ITEMLIST_POST = 8] = "ITEMLIST_POST",
        o[o.ITEMLIST_LIKE = 9] = "ITEMLIST_LIKE",
        o[o.ITEMLIST_CHALLENGE = 10] = "ITEMLIST_CHALLENGE",
        o[o.ITEMLIST_MUSIC = 11] = "ITEMLIST_MUSIC",
        o[o.ITEMLIST_TRENDING = 12] = "ITEMLIST_TRENDING",
        o[o.ITEMLIST_STICKER = 13] = "ITEMLIST_STICKER",
        o[o.ITEMLIST_PREVIEW = 14] = "ITEMLIST_PREVIEW",
        o[o.RECOMMEND_USER_PROFILE = 15] = "RECOMMEND_USER_PROFILE",
        o[o.RECOMMEND_USER_DISCOVER = 16] = "RECOMMEND_USER_DISCOVER",
        o[o.RECOMMEND_USER_TRENDING = 17] = "RECOMMEND_USER_TRENDING",
        o[o.ITEMLIST_FOLLOWINGFEED = 18] = "ITEMLIST_FOLLOWINGFEED",
        o[o.ITEMLIST_EDM = 19] = "ITEMLIST_EDM",
        o[o.FOLLOWINGLIST_HOT_DEPRECATED = 20] = "FOLLOWINGLIST_HOT_DEPRECATED",
        o[o.FOLLOWINGLIST_ALL = 21] = "FOLLOWINGLIST_ALL",
        o[o.ITEM_BOT_GOOGLE = 22] = "ITEM_BOT_GOOGLE",
        o[o.ITEMLIST_TRENDING_BOT_GOOGLE = 23] = "ITEMLIST_TRENDING_BOT_GOOGLE",
        o[o.ITEMLIST_POST_BOT_GOOGLE = 24] = "ITEMLIST_POST_BOT_GOOGLE",
        o[o.ITEMLIST_CHALLENGE_BOT_GOOGLE = 25] = "ITEMLIST_CHALLENGE_BOT_GOOGLE",
        o[o.ITEMLIST_MUSIC_BOT_GOOGLE = 26] = "ITEMLIST_MUSIC_BOT_GOOGLE",
        o[o.ITEMLIST_CATEGORY_TV = 27] = "ITEMLIST_CATEGORY_TV",
        o[o.ITEMLIST_FYP_TV = 28] = "ITEMLIST_FYP_TV",
        o[o.DISCOVERYLIST_TV = 29] = "DISCOVERYLIST_TV",
        o[o.REFLOW_USER_DETAIL = 30] = "REFLOW_USER_DETAIL",
        o[o.REFLOW_MUSIC_DETAIL = 31] = "REFLOW_MUSIC_DETAIL",
        o[o.REFLOW_CHALLENGE_DETAIL = 32] = "REFLOW_CHALLENGE_DETAIL",
        o[o.REFLOW_ITEM_DETAIL = 33] = "REFLOW_ITEM_DETAIL",
        o[o.REFLOW_STICKER_DETAIL = 34] = "REFLOW_STICKER_DETAIL",
        o[o.REFLOW_LIVE_DETAIL = 35] = "REFLOW_LIVE_DETAIL",
        o[o.REFLOW_ITEMLIST_MUSIC = 36] = "REFLOW_ITEMLIST_MUSIC",
        o[o.REFLOW_ITEMLIST_POST = 37] = "REFLOW_ITEMLIST_POST",
        o[o.REFLOW_ITEMLIST_RECOMMEND = 38] = "REFLOW_ITEMLIST_RECOMMEND",
        o[o.REFLOW_ITEMLIST_CHALLENGE = 39] = "REFLOW_ITEMLIST_CHALLENGE",
        o[o.REFLOW_ITEMLIST_STICKER = 40] = "REFLOW_ITEMLIST_STICKER",
        o[o.EMBED_VIDEO = 41] = "EMBED_VIDEO",
        o[o.ITEMLIST_FOLLOWINGFEED_TV = 42] = "ITEMLIST_FOLLOWINGFEED_TV",
        o[o.ITEMLIST_POST_TV = 43] = "ITEMLIST_POST_TV",
        o[o.ITEMLIST_LIKE_TV = 44] = "ITEMLIST_LIKE_TV",
        o[o.CLIPS = 45] = "CLIPS",
        o[o.USERLIST_CONTACT = 46] = "USERLIST_CONTACT",
        o[o.ITEMLIST_EDM_FOLLOWING = 47] = "ITEMLIST_EDM_FOLLOWING",
        o[o.AMP_ITEMLIST_CHALLENGE = 48] = "AMP_ITEMLIST_CHALLENGE",
        o[o.WEBAPP_USER_DETAIL = 49] = "WEBAPP_USER_DETAIL",
        o[o.WEBAPP_MUSIC_DETAIL = 50] = "WEBAPP_MUSIC_DETAIL",
        o[o.WEBAPP_CHALLENGE_DETAIL = 51] = "WEBAPP_CHALLENGE_DETAIL",
        o[o.WEBAPP_ITEM_DETAIL = 52] = "WEBAPP_ITEM_DETAIL",
        o[o.WEBAPP_STICKER_DETAIL = 53] = "WEBAPP_STICKER_DETAIL",
        o[o.WEBAPP_LIVE_DETAIL = 54] = "WEBAPP_LIVE_DETAIL",
        o[o.LIVE_SEO = 55] = "LIVE_SEO",
        o[o.SEO_EXPANSION = 56] = "SEO_EXPANSION",
        o[o.WEBAPP_USER_BASIC_SESSION = 57] = "WEBAPP_USER_BASIC_SESSION",
        o[o.WEBAPP_ITEM_BASIC_PROMOTE = 58] = "WEBAPP_ITEM_BASIC_PROMOTE",
        o[o.WEBAPP_USER_BASIC_IM = 59] = "WEBAPP_USER_BASIC_IM",
        o[o.WEBAPP_USER_SETTING = 60] = "WEBAPP_USER_SETTING",
        o[o.WEBAPP_ITEMLIST_HONEYPOT = 61] = "WEBAPP_ITEMLIST_HONEYPOT",
        o[o.EDM_DEFAULT = 62] = "EDM_DEFAULT",
        o[o.WEBAPP_ITEM_DETAIL_CREATIVEHUB_LOCAL = 63] = "WEBAPP_ITEM_DETAIL_CREATIVEHUB_LOCAL",
        o[o.WEBAPP_ITEM_DETAIL_CREATIVEHUB_CROSS = 64] = "WEBAPP_ITEM_DETAIL_CREATIVEHUB_CROSS",
        o[o.SEO_EXPANSION_OFFLINE = 65] = "SEO_EXPANSION_OFFLINE",
        o[o.TV_ITEMLIST_CHALLENGE = 66] = "TV_ITEMLIST_CHALLENGE",
        o[o.WEBAPP_USER_LIST_FOLLOWER = 67] = "WEBAPP_USER_LIST_FOLLOWER",
        o[o.WEBAPP_SEARCH_VIDEO = 68] = "WEBAPP_SEARCH_VIDEO",
        o[o.ITEMLIST_POST_RSS_BOT_GOOGLE = 69] = "ITEMLIST_POST_RSS_BOT_GOOGLE",
        o[o.SEO_EXPANSION_BOT_GOOGLE = 70] = "SEO_EXPANSION_BOT_GOOGLE",
        o[o.REFERRAL_VIDEO_DETAIL = 71] = "REFERRAL_VIDEO_DETAIL",
        o[o.REFERRAL_VIDEO_SHARE_LIST = 72] = "REFERRAL_VIDEO_SHARE_LIST",
        o[o.WEBAPP_ITEMLIST_QUESTION = 73] = "WEBAPP_ITEMLIST_QUESTION",
        o[o.WEBAPP_QUESTION_DETAIL = 74] = "WEBAPP_QUESTION_DETAIL",
        o[o.REFLOW_QUESTION_DETAIL = 75] = "REFLOW_QUESTION_DETAIL",
        o[o.REFLOW_ITEMLIST_QUESTION = 76] = "REFLOW_ITEMLIST_QUESTION",
        o[o.ITEMLIST_QUESTION_BOT_GOOGLE = 77] = "ITEMLIST_QUESTION_BOT_GOOGLE",
        o[o.ITEMLIST_TOPIC = 78] = "ITEMLIST_TOPIC",
        o[o.ITEMLIST_TOPIC_BOT_GOOGLE = 79] = "ITEMLIST_TOPIC_BOT_GOOGLE",
        o[o.ITEMLIST_LIVE_EVENT = 80] = "ITEMLIST_LIVE_EVENT",
        o[o.ECOMMERCE_ITEMLIST_LIVE_EVENT = 81] = "ECOMMERCE_ITEMLIST_LIVE_EVENT",
        o[o.REFLOW_ITEMLIST_MIX = 82] = "REFLOW_ITEMLIST_MIX",
        o[o.ITEMLIST_MIX_BOT_GOOGLE = 83] = "ITEMLIST_MIX_BOT_GOOGLE",
        o[o.REFLOW_MIX_DETAIL = 84] = "REFLOW_MIX_DETAIL",
        o[o.WEBAPP_USER_DETAIL_EMBED = 85] = "WEBAPP_USER_DETAIL_EMBED",
        o[o.WEBAPP_ITEMLIST_POST_EMBED = 86] = "WEBAPP_ITEMLIST_POST_EMBED",
        o[o.WEBAPP_USERLIST_BLOCK = 87] = "WEBAPP_USERLIST_BLOCK",
        o[o.REFLOW_ITEMLIST_POST_RECOMMEND = 88] = "REFLOW_ITEMLIST_POST_RECOMMEND",
        o[o.REFLOW_ITEMLIST_CHALLENGE_RECOMMEND = 89] = "REFLOW_ITEMLIST_CHALLENGE_RECOMMEND",
        o[o.REFLOW_ITEMLIST_STICKER_RECOMMEND = 90] = "REFLOW_ITEMLIST_STICKER_RECOMMEND",
        o[o.REFLOW_ITEMLIST_RECOMMEND_BOT_GOOGLE = 91] = "REFLOW_ITEMLIST_RECOMMEND_BOT_GOOGLE",
        o[o.WEBAPP_ITEMLIST_RELATED = 92] = "WEBAPP_ITEMLIST_RELATED",
        o[o.GOOGLE_BOT_CHALLENGE_ITEMLIST_NEWTAB = 93] = "GOOGLE_BOT_CHALLENGE_ITEMLIST_NEWTAB",
        o[o.WEBAPP_CHALLENGE_ITEMLIST_NEWTAB = 94] = "WEBAPP_CHALLENGE_ITEMLIST_NEWTAB",
        o[o.REFLOW_CHALLENGE_ITEMLIST_NEWTAB = 95] = "REFLOW_CHALLENGE_ITEMLIST_NEWTAB",
        o[o.GOOGLE_BOT_MUSIC_ITEMLIST_NEWTAB = 96] = "GOOGLE_BOT_MUSIC_ITEMLIST_NEWTAB",
        o[o.WEBAPP_MUSIC_ITEMLIST_NEWTAB = 97] = "WEBAPP_MUSIC_ITEMLIST_NEWTAB",
        o[o.REFLOW_MUSIC_ITEMLIST_NEWTAB = 98] = "REFLOW_MUSIC_ITEMLIST_NEWTAB",
        o[o.REFLOW_NOW_INVITATION = 99] = "REFLOW_NOW_INVITATION",
        o[o.WEBAPP_CHALLENGE_RELATEDTAB = 100] = "WEBAPP_CHALLENGE_RELATEDTAB",
    o[o.REFLOW_CHALLENGE_RELATEDTAB = 101] = "REFLOW_CHALLENGE_RELATEDTAB",
    o[o.GOOGLE_BOT_CHALLENGE_RELATEDTAB = 102] = "GOOGLE_BOT_CHALLENGE_RELATEDTAB",
    o[o.REFLOW_NOW_ITEM_DETAIL = 103] = "REFLOW_NOW_ITEM_DETAIL",
    o[o.WebScene_WEBAPP_ITEMLIST_MIX = 104] = "WebScene_WEBAPP_ITEMLIST_MIX",
    o[o.WebScene_BOT_GOOGLE_ITEMLIST_MIX = 105] = "WebScene_BOT_GOOGLE_ITEMLIST_MIX",
    o[o.WEBAPP_QUESTION_LIST = 106] = "WEBAPP_QUESTION_LIST",
    o[o.WEBAPP_ANSWER_LIST = 107] = "WEBAPP_ANSWER_LIST",
    o[o.GOOGLE_BOT_QUESTION_LIST = 108] = "GOOGLE_BOT_QUESTION_LIST",
    o[o.GOOGLE_BOT_ANSWER_LIST = 109] = "GOOGLE_BOT_ANSWER_LIST",
    o[o.REFLOW_ALLIGATOR_INVITATION = 110] = "REFLOW_ALLIGATOR_INVITATION",
    o[o.EMBED_ITEMLIST_MUSIC = 111] = "EMBED_ITEMLIST_MUSIC",
    o[o.EMBED_ITEMLIST_CHALLENGE = 112] = "EMBED_ITEMLIST_CHALLENGE",
    o[o.WEBAPP_ITEMLIST_COLLECTION = 113] = "WEBAPP_ITEMLIST_COLLECTION",
    o[o.REFLOW_ITEMLIST_COLLECTION = 114] = "REFLOW_ITEMLIST_COLLECTION",
    o[o.SEO_ITEMLIST_COLLECTION = 115] = "SEO_ITEMLIST_COLLECTION",
    o[o.WEBAPP_DETAIL_COLLECTION = 116] = "WEBAPP_DETAIL_COLLECTION",
    o[o.REFLOW_DETAIL_COLLECTION = 117] = "REFLOW_DETAIL_COLLECTION",
    o[o.SEO_DETAIL_COLLECTION = 118] = "SEO_DETAIL_COLLECTION",
    o[o.REFLOW_POI_DETAIL = 119] = "REFLOW_POI_DETAIL",
    o[o.WEBAPP_POI_DETAIL = 120] = "WEBAPP_POI_DETAIL",
    o[o.SEO_POI_DETAIL = 121] = "SEO_POI_DETAIL",
    o[o.ITEMLIST_POI = 122] = "ITEMLIST_POI",
    o[o.ITEMLIST_POI_BOT_GOOGLE = 123] = "ITEMLIST_POI_BOT_GOOGLE",
    o[o.REFLOW_ITEMLIST_POI = 124] = "REFLOW_ITEMLIST_POI",
    o[o.GENERAL_BOT_ITEMLIST_MUSIC = 125] = "GENERAL_BOT_ITEMLIST_MUSIC",
    o[o.GENERAL_BOT_ITEMLIST_TRENDING = 126] = "GENERAL_BOT_ITEMLIST_TRENDING",
    o[o.GENERAL_BOT_ITEMLIST_POST = 127] = "GENERAL_BOT_ITEMLIST_POST",
    o[o.GENERAL_BOT_ITEMLIST_CHALLENGE = 128] = "GENERAL_BOT_ITEMLIST_CHALLENGE",
    o[o.GENERAL_BOT_ITEMLIST_MIX = 129] = "GENERAL_BOT_ITEMLIST_MIX",
    o[o.GENERAL_BOT_ITEMLIST_TOPIC = 130] = "GENERAL_BOT_ITEMLIST_TOPIC",
    o[o.GENERAL_BOT_ITEMLIST_QUESTION = 131] = "GENERAL_BOT_ITEMLIST_QUESTION",
    o[o.GENERAL_BOT_ITEMLIST_RELATED = 132] = "GENERAL_BOT_ITEMLIST_RELATED",
    o[o.GENERAL_BOT_ITEM_DETAIL = 133] = "GENERAL_BOT_ITEM_DETAIL",
    o[o.GENERAL_BOT_QUESTION_LIST = 134] = "GENERAL_BOT_QUESTION_LIST",
    o[o.GENERAL_BOT_ANSWER_LIST = 135] = "GENERAL_BOT_ANSWER_LIST",
    o[o.WEBAPP_ITEM_DETAIL_TT4B = 136] = "WEBAPP_ITEM_DETAIL_TT4B",
    o[o.GENERAL_BOT_CHALLENGE_ITEMLIST_NEWTAB = 137] = "GENERAL_BOT_CHALLENGE_ITEMLIST_NEWTAB",
    o[o.GENERAL_BOT_MUSIC_ITEMLIST_NEWTAB = 138] = "GENERAL_BOT_MUSIC_ITEMLIST_NEWTAB",
    o[o.GENERAL_BOT_CHALLENGE_RELATEDTAB = 139] = "GENERAL_BOT_CHALLENGE_RELATEDTAB",
    o[o.TV_SEARCH = 140] = "TV_SEARCH",
    o[o.WEBAPP_ITEMLIST_PUBLIC = 141] = "WEBAPP_ITEMLIST_PUBLIC",
    o[o.POSTPAGE_ITEMLIST_PUBLIC = 142] = "POSTPAGE_ITEMLIST_PUBLIC",
    o[o.GOOGLE_BOT_ITEMLIST_PUBLIC = 143] = "GOOGLE_BOT_ITEMLIST_PUBLIC",
    o[o.GENERAL_BOT_ITEMLIST_PUBLIC = 144] = "GENERAL_BOT_ITEMLIST_PUBLIC",
    o[o.WEBAPP_ITEMLIST_EXPLORE = 145] = "WEBAPP_ITEMLIST_EXPLORE",
    o[o.SEO_ITEMLIST_EXPLORE = 146] = "SEO_ITEMLIST_EXPLORE",
    o[o.WEBAPP_MIX_DETAIL = 147] = "WEBAPP_MIX_DETAIL",
    o[o.WEBAPP_USER_ITEMLIST_COLLECT = 148] = "WEBAPP_USER_ITEMLIST_COLLECT",
    o[o.WEBAPP_CREATOR_ITEM_LIST = 149] = "WEBAPP_CREATOR_ITEM_LIST",
    o[o.WEBAPP_USER_LIST_MATCH_FRIEND = 150] = "WEBAPP_USER_LIST_MATCH_FRIEND",
    o[o.WEBAPP_USER_LIST_MATCH_SUGGESTED = 151] = "WEBAPP_USER_LIST_MATCH_SUGGESTED",
    o[o.WEBAPP_ITEMLIST_FRIENDS_FEED = 152] = "WEBAPP_ITEMLIST_FRIENDS_FEED",
    o[o.POST_COVER_PREVIEW = 153] = "POST_COVER_PREVIEW",
    o[o.WEBAPP_ITEMLIST_REPOST = 154] = "WEBAPP_ITEMLIST_REPOST",
    o[o.WEBAPP_ITEMLIST_COLLECTION_CANDIDATE = 155] = "WEBAPP_ITEMLIST_COLLECTION_CANDIDATE",
    o[o.WEBSCENE_ITEM_DETAIL_STUDIO = 156] = "WEBSCENE_ITEM_DETAIL_STUDIO",
    o[o.GOOGLE_BOT_ITEMLIST_RELATED = 157] = "GOOGLE_BOT_ITEMLIST_RELATED",
    o[o.APPCLIPS_ITEM_DETAIL = 158] = "APPCLIPS_ITEM_DETAIL",
    o[o.GOOGLE_BOT_ITEMLIST_REPOST = 159] = "GOOGLE_BOT_ITEMLIST_REPOST",
    o[o.GENERAL_BOT_ITEMLIST_REPOST = 160] = "GENERAL_BOT_ITEMLIST_REPOST",
    (s = n.ParentalGuardianMode || (n.ParentalGuardianMode = {}))[s.UNLINK = 1] = "UNLINK",
    s[s.CHILDMODE = 2] = "CHILDMODE",
    s[s.PARENTMODE = 3] = "PARENTMODE",
    s[s.CHILDUNBINDIMMEDIATELY = 4] = "CHILDUNBINDIMMEDIATELY",
    (r = n.TopicType || (n.TopicType = {}))[r.COMEDY = 0] = "COMEDY",
    r[r.GAMING = 1] = "GAMING",
    r[r.FOOD = 2] = "FOOD",
    r[r.DANCE = 3] = "DANCE",
    r[r.BEAUTY = 4] = "BEAUTY",
    r[r.ANIMALS = 5] = "ANIMALS",
    r[r.SPORTS = 6] = "SPORTS",
    (a = n.ExploreCategoryType || (n.ExploreCategoryType = {}))[a.UNDEFINED = 0] = "UNDEFINED",
    a[a.PERFORMANCE = 1] = "PERFORMANCE",
    a[a.TALENT = 2] = "TALENT",
    a[a.FAMILY_RELATIONSHIP = 3] = "FAMILY_RELATIONSHIP",
    a[a.NATURE = 4] = "NATURE",
    a[a.LIFESTYLE = 5] = "LIFESTYLE",
    a[a.SOCIETY = 6] = "SOCIETY",
    a[a.BEAUTY_STYLE = 7] = "BEAUTY_STYLE",
    a[a.ENTERTAINMENT = 8] = "ENTERTAINMENT",
    a[a.SUPERNATURAL_HORROR = 9] = "SUPERNATURAL_HORROR",
    a[a.CULTURE_EDUCATION_TECHNOLOGY = 10] = "CULTURE_EDUCATION_TECHNOLOGY",
    a[a.SPORT_OUTDOOR = 11] = "SPORT_OUTDOOR",
    a[a.AUTO_VEHICLE = 12] = "AUTO_VEHICLE",
    a[a.ANIME_COMICS = 100] = "ANIME_COMICS",
    a[a.ENTERTAINMENT_CULTURE = 101] = "ENTERTAINMENT_CULTURE",
    a[a.BEAUTY_CARE = 102] = "BEAUTY_CARE",
    a[a.GAMES = 103] = "GAMES",
    a[a.COMEDY = 104] = "COMEDY",
    a[a.DAILY_LIFE = 105] = "DAILY_LIFE",
    a[a.FAMILY = 106] = "FAMILY",
    a[a.RELATIONSHIP = 107] = "RELATIONSHIP",
    a[a.SCRIPTED_DRAMA = 108] = "SCRIPTED_DRAMA",
    a[a.OUTFIT = 109] = "OUTFIT",
    a[a.LIPSYNC = 110] = "LIPSYNC",
    a[a.FOOD_DRINK = 111] = "FOOD_DRINK",
    a[a.SPORTS = 112] = "SPORTS",
    a[a.ANIMALS = 113] = "ANIMALS",
    a[a.SOCIETY_V2 = 114] = "SOCIETY_V2",
    a[a.AUTO_VEHICLE_V2 = 115] = "AUTO_VEHICLE_V2",
    a[a.EDUCATION = 116] = "EDUCATION",
    a[a.FITNESS_HEALTH = 117] = "FITNESS_HEALTH",
    a[a.TECHNOLOGY = 118] = "TECHNOLOGY",
    a[a.SINGING_DANCING = 119] = "SINGING_DANCING",
    a[a.All = 120] = "All",
    a[a.CHRISTMAS = 121] = "CHRISTMAS",
    a[a.NEWYEARS = 122] = "NEWYEARS",
    a[a.CELEBRITIES_AND_TV = 200] = "CELEBRITIES_AND_TV",
    a[a.MUSIC_AND_DANCE = 201] = "MUSIC_AND_DANCE",
    a[a.FASHION = 202] = "FASHION",
    a[a.VIDEO_GAMES = 203] = "VIDEO_GAMES",
    a[a.ANIME_AND_CARTOONS = 204] = "ANIME_AND_CARTOONS",
    a[a.SPORTS_AND_FITNESS = 205] = "SPORTS_AND_FITNESS",
    a[a.COMEDY_TIER3 = 206] = "COMEDY_TIER3",
    a[a.FOOD = 207] = "FOOD",
    a[a.NEWS = 208] = "NEWS",
    a[a.CARS = 209] = "CARS",
    a[a.BABY = 210] = "BABY",
    a[a.PETS = 211] = "PETS",
    a[a.RELATIONSHIP_TIER3 = 212] = "RELATIONSHIP_TIER3",
    a[a.HEALTH = 213] = "HEALTH",
    a[a.HOUSEHOLD_AND_GARDENING = 214] = "HOUSEHOLD_AND_GARDENING",
    a[a.TECHNOLOGY_TIER3 = 215] = "TECHNOLOGY_TIER3",
    (u = n.FYPCategoryType || (n.FYPCategoryType = {}))[u.DAILY_LIFE_FYP = 1] = "DAILY_LIFE_FYP",
    u[u.ENTERTAINMENT_FYP = 2] = "ENTERTAINMENT_FYP",
    u[u.COMEDY_FYP = 3] = "COMEDY_FYP",
    u[u.LEARNING_FYP = 4] = "LEARNING_FYP",
    u[u.DRAMA_FYP = 5] = "DRAMA_FYP",
    u[u.SPORTS_FYP = 6] = "SPORTS_FYP",
    u[u.FOOD_FYP = 7] = "FOOD_FYP",
    u[u.ANIMALS_FYP = 8] = "ANIMALS_FYP",
    u[u.BEAUTY_STYLE_FYP = 9] = "BEAUTY_STYLE_FYP",
    u[u.TALENT_FYP = 10] = "TALENT_FYP",
    u[u.AUTO_FYP = 11] = "AUTO_FYP",
    u[u.DIY_LIFE_HACKS_FYP = 12] = "DIY_LIFE_HACKS_FYP",
    u[u.FAMILY_FYP = 13] = "FAMILY_FYP",
    u[u.ARTS_CRAFTS_FYP = 14] = "ARTS_CRAFTS_FYP",
    u[u.ODDLY_SATISFYING_FYP = 15] = "ODDLY_SATISFYING_FYP",
    u[u.OUTDOORS_FYP = 16] = "OUTDOORS_FYP",
    u[u.FITNESS_HEALTH_FYP = 17] = "FITNESS_HEALTH_FYP",
    u[u.HOME_GARDEN_FYP = 18] = "HOME_GARDEN_FYP",
    u[u.DANCE_FYP = 19] = "DANCE_FYP",
    u[u.GAMING_FYP = 20] = "GAMING_FYP",
    u[u.MUSIC_FYP = 21] = "MUSIC_FYP",
    u[u.FOOD_DRINK_FYP = 22] = "FOOD_DRINK_FYP",
    u[u.AUTO_VEHICLE_FYP = 23] = "AUTO_VEHICLE_FYP",
    u[u.ENTERTAINMENT_CULTURE_FYP = 24] = "ENTERTAINMENT_CULTURE_FYP",
    u[u.SCIENCE_EDUCATION_FYP = 25] = "SCIENCE_EDUCATION_FYP",
    u[u.ART_FYP = 26] = "ART_FYP",
    u[u.TRAVEL_FYP = 27] = "TRAVEL_FYP",
    u[u.MOTIVATION_ADVICE_FYP = 28] = "MOTIVATION_ADVICE_FYP",
    u[u.LIFE_HACKS_FYP = 29] = "LIFE_HACKS_FYP",
    u[u.DIY_FYP = 30] = "DIY_FYP",
    u[u.ANIME_COMICS_FYP = 31] = "ANIME_COMICS_FYP",
    u[u.MEMES_FYP = 32] = "MEMES_FYP",
    u[u.FOOTBALL_FYP = 33] = "FOOTBALL_FYP",
    u[u.CELEBRITIES_FYP = 34] = "CELEBRITIES_FYP",
    u[u.FASHION_FYP = 35] = "FASHION_FYP",
    u[u.BEAUTY_FYP = 36] = "BEAUTY_FYP",
    u[u.TUTORIALS_FYP = 37] = "TUTORIALS_FYP",
    u[u.ANIME_CARTOONS_FYP = 38] = "ANIME_CARTOONS_FYP",
    u[u.ART_DESIGN_FYP = 39] = "ART_DESIGN_FYP",
    u[u.VLOGS_FYP = 40] = "VLOGS_FYP",
    u[u.HEALTH_FITNESS_FYP = 41] = "HEALTH_FITNESS_FYP",
    u[u.TECHNOLOGY_SCIENCE_FYP = 42] = "TECHNOLOGY_SCIENCE_FYP",
    u[u.EXTREME_SPORTS_FYP = 43] = "EXTREME_SPORTS_FYP",
    u[u.ASMR_FYP = 44] = "ASMR_FYP",
    u[u.STARS_FYP = 45] = "STARS_FYP",
    u[u.FUNNY_FYP = 46] = "FUNNY_FYP",
    u[u.COSPLAY_FYP = 47] = "COSPLAY_FYP",
    u[u.PETS_FYP = 48] = "PETS_FYP",
    (d = n.RedDotType || (n.RedDotType = {}))[d.ProfileAvatar = 1] = "ProfileAvatar",
    d[d.BusinessSuite = 2] = "BusinessSuite",
    (c = n.NowType || (n.NowType = {}))[c.UNDEFINED = 0] = "UNDEFINED",
    c[c.PHOTO = 1] = "PHOTO",
    c[c.VIDEO = 2] = "VIDEO",
    (l = n.CoverFormat || (n.CoverFormat = {}))[l.JPEG = 0] = "JPEG",
    l[l.WEBP = 1] = "WEBP",
    l[l.AVIF = 2] = "AVIF",
    (h = n.FollowStatus || (n.FollowStatus = {}))[h.RELATION_UNKNOWN = -1] = "RELATION_UNKNOWN",
    h[h.NOT_FOLLOWING = 0] = "NOT_FOLLOWING",
    h[h.FOLLOWING = 1] = "FOLLOWING",
    h[h.MUTUAL_FOLLOWING = 2] = "MUTUAL_FOLLOWING",
    h[h.FOLLOW_REQUEST_SENT = 4] = "FOLLOW_REQUEST_SENT",
    (I = n.EventType || (n.EventType = {}))[I.EventTypeLive = 1] = "EventTypeLive",
    I[I.EventTypeShowCase = 2] = "EventTypeShowCase",
    I[I.EventTypeThirdPartyCommon = 3] = "EventTypeThirdPartyCommon",
    I[I.EventTypeEcommerce = 4] = "EventTypeEcommerce",
    (_ = n.EventStatus || (n.EventStatus = {}))[_.Created = 1] = "Created",
    _[_.Reviewing = 2] = "Reviewing",
    _[_.ReviewFailed = 3] = "ReviewFailed",
    _[_.Upcoming = 4] = "Upcoming",
    _[_.Started = 5] = "Started",
    _[_.Deleted = 6] = "Deleted",
    _[_.Finished = 7] = "Finished",
    _[_.Cancelled = 8] = "Cancelled",
    _[_.Aborted = 9] = "Aborted",
    (v = n.AgeIntervalEnum || (n.AgeIntervalEnum = {}))[v.UNKNOWN = 0] = "UNKNOWN",
    v[v.CHILDREN = 1] = "CHILDREN",
    v[v.EARLY_TEEN = 2] = "EARLY_TEEN",
    v[v.LATE_TEEN = 3] = "LATE_TEEN",
    v[v.ADULT = 4] = "ADULT",
    (T = n.PaidEventPayMethod || (n.PaidEventPayMethod = {}))[T.Invalid = 0] = "Invalid",
    T[T.Coins = 1] = "Coins",
    T[T.Cash = 2] = "Cash",
    (f = n.UpdateBlockEnum || (n.UpdateBlockEnum = {}))[f.CanUpdate = 0] = "CanUpdate",
    f[f.BlockByUpdateTimesLimit = 1] = "BlockByUpdateTimesLimit",
    f[f.BlockByShowcase = 2] = "BlockByShowcase",
    (p = n.DeleteBlockEnum || (n.DeleteBlockEnum = {}))[p.CanDelete = 0] = "CanDelete",
    p[p.BlockByShowcase = 1] = "BlockByShowcase",
    (E = n.KeywordPageType || (n.KeywordPageType = {}))[E.Discover = 0] = "Discover",
    E[E.Channel = 1] = "Channel",
    E[E.Find = 2] = "Find",
    (m = n.CollectionStatus || (n.CollectionStatus = {}))[m.COLLECTION_PRIVATE = 1] = "COLLECTION_PRIVATE",
    m[m.COLLECTION_PUBLIC = 3] = "COLLECTION_PUBLIC",
    (S = n.CLAToggleStatusEnum || (n.CLAToggleStatusEnum = {}))[S.CLA_TOGGLE_UNKNOWN = 0] = "CLA_TOGGLE_UNKNOWN",
    S[S.CLA_TOGGLE_MANUAL_ON = 1] = "CLA_TOGGLE_MANUAL_ON",
    S[S.CLA_TOGGLE_DEFAULT_ON = 2] = "CLA_TOGGLE_DEFAULT_ON",
    S[S.CLA_TOGGLE_MANUAL_OFF = 3] = "CLA_TOGGLE_MANUAL_OFF",
    S[S.CLA_TOGGLE_DEFAULT_OFF = 4] = "CLA_TOGGLE_DEFAULT_OFF",
    (g = n.UserStoryStatus || (n.UserStoryStatus = {}))[g.STORY_STATUS_DEFAULT = 0] = "STORY_STATUS_DEFAULT",
    g[g.STORY_STATUS_NOT_VIEWED = 1] = "STORY_STATUS_NOT_VIEWED",
    g[g.STORY_STATUS_ALL_VIEWED = 2] = "STORY_STATUS_ALL_VIEWED",
    (L = n.StoryCallScene || (n.StoryCallScene = {}))[L.STORY_CALL_SCENE_DEFAULT = 0] = "STORY_CALL_SCENE_DEFAULT",
    L[L.STORY_CALL_SCENE_PROFILE = 1] = "STORY_CALL_SCENE_PROFILE",
    L[L.STORY_CALL_SCENE_FEED = 2] = "STORY_CALL_SCENE_FEED",
    (C = n.StoryFeedScene || (n.StoryFeedScene = {}))[C.STORY_FEED_SCENE_UNDEFINED = 0] = "STORY_FEED_SCENE_UNDEFINED",
    C[C.STORY_FEED_SCENE_INBOX_TAB = 1] = "STORY_FEED_SCENE_INBOX_TAB",
    C[C.STORY_FEED_SCENE_FRIEND_TAB = 2] = "STORY_FEED_SCENE_FRIEND_TAB",
    C[C.STORY_FEED_SCENE_FOLLOWING_TAB = 3] = "STORY_FEED_SCENE_FOLLOWING_TAB",
    C[C.STORY_FEED_SCENE_FYP_CARD = 4] = "STORY_FEED_SCENE_FYP_CARD",
    C[C.STORY_FEED_SCENE_HOME_PAGE = 5] = "STORY_FEED_SCENE_HOME_PAGE",
    C[C.STORY_FEED_SCENE_FRIEND_TAB_V2 = 6] = "STORY_FEED_SCENE_FRIEND_TAB_V2",
    (A = n.PreviewType || (n.PreviewType = {}))[A.COMMENT = 0] = "COMMENT",
    A[A.TRAY = 1] = "TRAY",
    A[A.ASR_SUMMARY = 2] = "ASR_SUMMARY",
    A[A.TRAFFIC_TAG = 3] = "TRAFFIC_TAG",
    A[A.AI_TITLE = 4] = "AI_TITLE",
    (R = n.ContentSourceToggle || (n.ContentSourceToggle = {}))[R.DEFAULT_ALGO = 0] = "DEFAULT_ALGO",
    R[R.DOC_FILE_BACKUP = 1] = "DOC_FILE_BACKUP",
    R[R.UG_CONTENT_EXTENSION = 2] = "UG_CONTENT_EXTENSION",
    R[R.WEB_CORE_BACKUP = 3] = "WEB_CORE_BACKUP",
    n.FROM_PAGE_TRENDING = "fyp",
    n.FROM_PAGE_FOLLOWING = "following",
    n.FROM_PAGE_VIDEO = "video",
    n.FROM_PAGE_HASHTAG = "hashtag",
    n.FROM_PAGE_USER = "user",
    n.FROM_PAGE_SEARCH = "search",
    n.FROM_PAGE_MUSIC = "music",
    n.FROM_PAGE_DISCOVER = "discover",
    n.FROM_PAGE_LIVE = "live",
    n.FROM_PAGE_MESSAGE = "message",
    n.FROM_PAGE_SETTING = "setting",
    n.FROM_PAGE_EXPLORE = "explore",
    n.WebCommonParam = function e(t) {
      (0,
          D._)(this, e),
      t && (this.IsSSRReq = t.IsSSRReq,
          this.UserAgent = t.UserAgent,
          this.WebID = t.WebID,
          this.LoginUserID = t.LoginUserID,
          this.Aid = t.Aid,
          this.EntryPath = t.EntryPath,
      void 0 !== t.OdinID && (this.OdinID = t.OdinID),
      void 0 !== t.IsUserLogin && (this.IsUserLogin = t.IsUserLogin),
      void 0 !== t.IsGuestModeEnabled && (this.IsGuestModeEnabled = t.IsGuestModeEnabled),
      void 0 !== t.PriorityRegion && (this.PriorityRegion = t.PriorityRegion),
      void 0 !== t.TimezoneName && (this.TimezoneName = t.TimezoneName),
      void 0 !== t.OS && (this.OS = t.OS),
      void 0 !== t.CpuCoreNumber && (this.CpuCoreNumber = t.CpuCoreNumber),
      void 0 !== t.ScreenHeight && (this.ScreenHeight = t.ScreenHeight),
      void 0 !== t.ScreenWidth && (this.ScreenWidth = t.ScreenWidth),
      void 0 !== t.BrowserVersion && (this.BrowserVersion = t.BrowserVersion),
      void 0 !== t.DarkMode && (this.DarkMode = t.DarkMode),
      void 0 !== t.VideoViewCount && (this.VideoViewCount = t.VideoViewCount),
      void 0 !== t.DayOfWeek && (this.DayOfWeek = t.DayOfWeek),
      void 0 !== t.TimeOfDay && (this.TimeOfDay = t.TimeOfDay),
      void 0 !== t.SessionId && (this.SessionId = t.SessionId),
      void 0 !== t.AppLanguage && (this.AppLanguage = t.AppLanguage),
      void 0 !== t.LaunchMode && (this.LaunchMode = t.LaunchMode),
      void 0 !== t.DeviceScore && (this.DeviceScore = t.DeviceScore),
      void 0 !== t.BrowserPlatform && (this.BrowserPlatform = t.BrowserPlatform),
      void 0 !== t.Network && (this.Network = t.Network),
      void 0 !== t.WindowHeight && (this.WindowHeight = t.WindowHeight),
      void 0 !== t.WindowWidth && (this.WindowWidth = t.WindowWidth),
      void 0 !== t.ContentSourceToggle && (this.ContentSourceToggle = t.ContentSourceToggle))
    }
    ,
    n.WalletPackage = function e(t) {
      (0,
          D._)(this, e),
      t && (void 0 !== t.PkgID && (this.PkgID = t.PkgID),
      void 0 !== t.IapID && (this.IapID = t.IapID),
      void 0 !== t.USDPrice && (this.USDPrice = t.USDPrice),
      void 0 !== t.USDPriceDot && (this.USDPriceDot = t.USDPriceDot),
      void 0 !== t.USDPriceShow && (this.USDPriceShow = t.USDPriceShow))
    }
    ,
    n.EventWriteACL = function e(t) {
      (0,
          D._)(this, e),
      t && (void 0 !== t.UpdateBlock && (this.UpdateBlock = t.UpdateBlock),
      void 0 !== t.DeleteBlock && (this.DeleteBlock = t.DeleteBlock))
    }
    ,
    n.EventCreatorData = function e(t) {
      (0,
          D._)(this, e),
      t && (void 0 !== t.SubscriberCountDelta && (this.SubscriberCountDelta = t.SubscriberCountDelta),
      void 0 !== t.Pinned && (this.Pinned = t.Pinned))
    }
    ,
    n.KeywordTag = function e(t) {
      (0,
          D._)(this, e),
      t && (this.Keyword = t.Keyword,
          this.PageType = t.PageType)
    }
    ,
    n.GeoPoiInfo = y = function e(t) {
      (0,
          D._)(this, e),
      t && (void 0 !== t.PoiId && (this.PoiId = t.PoiId),
      void 0 !== t.PoiName && (this.PoiName = t.PoiName))
    }
    ,
    n.AllLevelGeoPoiInfo = function e(t) {
      (0,
          D._)(this, e),
      t && (void 0 !== t.L0PoiGeoInfo && (this.L0PoiGeoInfo = new y(t.L0PoiGeoInfo)),
      void 0 !== t.L1GeoPoiInfo && (this.L1GeoPoiInfo = new y(t.L1GeoPoiInfo)),
      void 0 !== t.L2GeoPoiInfo && (this.L2GeoPoiInfo = new y(t.L2GeoPoiInfo)),
      void 0 !== t.L3GeoPoiInfo && (this.L3GeoPoiInfo = new y(t.L3GeoPoiInfo)),
      void 0 !== t.L4GeoPoiInfo && (this.L4GeoPoiInfo = new y(t.L4GeoPoiInfo)))
    }
    ,
    n.WebImage = P = function e(t) {
      (0,
          D._)(this, e),
      t && (void 0 !== t.Uri && (this.Uri = t.Uri),
      void 0 !== t.AppID && (this.AppID = t.AppID),
      void 0 !== t.Width && (this.Width = t.Width),
      void 0 !== t.Height && (this.Height = t.Height),
      void 0 !== t.ImgFormat && (this.ImgFormat = t.ImgFormat),
      void 0 !== t.ImgType && (this.ImgType = t.ImgType),
      void 0 !== t.UrlList && (this.UrlList = t.UrlList),
      void 0 !== t.AvgColor && (this.AvgColor = t.AvgColor))
    }
    ,
    n.WebFYPRoomTagItem = M = function e(t) {
      (0,
          D._)(this, e),
      t && (void 0 !== t.Id && (this.Id = t.Id),
      void 0 !== t.Style && (this.Style = t.Style),
      void 0 !== t.Content && (this.Content = t.Content),
      void 0 !== t.Icon && (this.Icon = new P(t.Icon)),
      void 0 !== t.DAInfo && (this.DAInfo = t.DAInfo),
      void 0 !== t.RecommendInfo && (this.RecommendInfo = t.RecommendInfo))
    }
    ,
    n.WebFYPRoomTag = function e(t) {
      (0,
          D._)(this, e),
      t && (void 0 !== t.Tag && (this.Tag = Array.isArray(t.Tag) ? t.Tag.map(function (e) {
        return new M(e)
      }) : t.Tag),
      void 0 !== t.SubTag && (this.SubTag = Array.isArray(t.SubTag) ? t.SubTag.map(function (e) {
        return new M(e)
      }) : t.SubTag))
    }
    ,
    n.LanguageSettings = function e(t) {
      (0,
          D._)(this, e),
      t && (void 0 !== t.SelectedTranslationLanguage && (this.SelectedTranslationLanguage = t.SelectedTranslationLanguage),
      void 0 !== t.TranslationDisableLanguages && (this.TranslationDisableLanguages = t.TranslationDisableLanguages),
      void 0 !== t.EnableMasterTranslation && (this.EnableMasterTranslation = t.EnableMasterTranslation),
      void 0 !== t.EnableForeignCaption && (this.EnableForeignCaption = t.EnableForeignCaption),
      void 0 !== t.EnableNativeCaption && (this.EnableNativeCaption = t.EnableNativeCaption))
    }
    ,
    n.PreviewCommentInfo = function e(t) {
      (0,
          D._)(this, e),
      t && (void 0 !== t.PollingInterval && (this.PollingInterval = t.PollingInterval),
      void 0 !== t.CommentList && (this.CommentList = Array.isArray(t.CommentList) ? t.CommentList.map(function (e) {
        return new w(e)
      }) : t.CommentList),
      void 0 !== t.ExpireTime && (this.ExpireTime = t.ExpireTime),
      void 0 !== t.Title && (this.Title = t.Title))
    }
    ,
    n.PreviewCommentItem = w = function e(t) {
      (0,
          D._)(this, e),
      t && (void 0 !== t.ID && (this.ID = t.ID),
      void 0 !== t.Content && (this.Content = t.Content),
      void 0 !== t.PreviewType && (this.PreviewType = t.PreviewType))
    }
    ,
    n.ToggleInfo = function e(t) {
      (0,
          D._)(this, e),
      t && void 0 !== t.BcToggleInfo && (this.BcToggleInfo = new O(t.BcToggleInfo))
    }
    ,
    n.BcToggleInfo = O = function e(t) {
      (0,
          D._)(this, e),
      t && (void 0 !== t.EcomBcToggle && (this.EcomBcToggle = t.EcomBcToggle),
      void 0 !== t.BcToggleText && (this.BcToggleText = t.BcToggleText),
      void 0 !== t.BcToggleShowInterval && (this.BcToggleShowInterval = t.BcToggleShowInterval))
    }
    ,
    n.StreamSnapShot = function e(t) {
      (0,
          D._)(this, e),
      t && (void 0 !== t.URI && (this.URI = t.URI),
      void 0 !== t.URLs && (this.URLs = t.URLs),
      void 0 !== t.Height && (this.Height = t.Height),
      void 0 !== t.Width && (this.Width = t.Width),
      void 0 !== t.FaceCenterX && (this.FaceCenterX = t.FaceCenterX),
      void 0 !== t.FaceCenterY && (this.FaceCenterY = t.FaceCenterY))
    }
    ,
    n.VideoMetaInfo = function e(t) {
      (0,
          D._)(this, e),
      t && (this.Url = t.Url,
          this.Height = t.Height,
          this.Width = t.Width,
          this.Size = t.Size,
          this.Duration = t.Duration)
    }
    ;
    var N = B.WebScene;
    B.ParentalGuardianMode,
        B.TopicType,
        B.ExploreCategoryType,
        B.FYPCategoryType,
        B.RedDotType,
        B.NowType,
        B.CoverFormat,
        B.FollowStatus,
        B.EventType,
        B.EventStatus,
        B.AgeIntervalEnum,
        B.PaidEventPayMethod,
        B.UpdateBlockEnum,
        B.DeleteBlockEnum,
        B.KeywordPageType,
        B.CollectionStatus,
        B.CLAToggleStatusEnum,
        B.UserStoryStatus,
        B.StoryCallScene,
        B.StoryFeedScene,
        B.PreviewType,
        B.ContentSourceToggle,
        B.FROM_PAGE_TRENDING,
        B.FROM_PAGE_FOLLOWING,
        B.FROM_PAGE_VIDEO,
        B.FROM_PAGE_HASHTAG,
        B.FROM_PAGE_USER,
        B.FROM_PAGE_SEARCH,
        B.FROM_PAGE_MUSIC,
        B.FROM_PAGE_DISCOVER,
        B.FROM_PAGE_LIVE,
        B.FROM_PAGE_MESSAGE,
        B.FROM_PAGE_SETTING,
        B.FROM_PAGE_EXPLORE,
        B.WebCommonParam,
        B.WalletPackage,
        B.EventWriteACL,
        B.EventCreatorData,
        B.KeywordTag,
        B.GeoPoiInfo,
        B.AllLevelGeoPoiInfo,
        B.WebImage,
        B.WebFYPRoomTagItem,
        B.WebFYPRoomTag,
        B.LanguageSettings,
        B.PreviewCommentInfo,
        B.PreviewCommentItem,
        B.ToggleInfo,
        B.BcToggleInfo,
        B.StreamSnapShot,
        B.VideoMetaInfo
  },
  17769: function (e, t, i) {
    i.d(t, {
      SP9: function () {
        return tk
      }
    });
    var n, o, s, r, a, u, d, c, l, h, I, _, v, T, f, p, E, m, S, g, L, C, A, R, y, P, M, w, O, B, D, N, U, b, F, G, k,
        V, W, x, H, Y, q, z, K, $, Q, j, X, Z, J, ee, et, ei, en, eo, es, er, ea, eu, ed, ec, el, eh, eI, e_, ev, eT,
        ef, ep, eE, em, eS, eg, eL, eC, eA, eR, ey, eP, eM, ew, eO, eB, eD, eN, eU, eb, eF, eG, ek, eV, eW, ex, eH, eY,
        eq, ez, eK, e$, eQ, ej, eX, eZ, eJ, e0, e1, e2, e4, e3, e6, e5, e7, e9, e8, te, tt, ti, tn, to, ts, tr, ta, tu,
        td, tc, tl, th, tI, t_, tv, tT, tf, tp, tE, tm, tS, tg, tL, tC, tA, tR, ty, tP, tM, tw, tO, tB, tD, tN,
        tU = i(95170), tb = i(6586), tF = i(15400), tG = i(89671);
    (o = (n = tN || (tN = {})).ProAccountStatus || (n.ProAccountStatus = {}))[o.PERSONAL_ACCOUNT = 0] = "PERSONAL_ACCOUNT",
        o[o.PRO_ACCOUNT = 1] = "PRO_ACCOUNT",
        o[o.CREATOR_ACCOUNT = 2] = "CREATOR_ACCOUNT",
        o[o.BUSINESS_ACCOUNT = 3] = "BUSINESS_ACCOUNT",
        (s = n.ProfileEmbedPermission || (n.ProfileEmbedPermission = {}))[s.UNDEFINED = 0] = "UNDEFINED",
        s[s.ALLOW = 1] = "ALLOW",
        s[s.HIDE = 2] = "HIDE",
        s[s.GREYOUT = 3] = "GREYOUT",
        (r = n.RoomLandscape || (n.RoomLandscape = {}))[r.UNDEFINED = 0] = "UNDEFINED",
        r[r.LANDSCAPE = 1] = "LANDSCAPE",
        r[r.PORTRAIT = 2] = "PORTRAIT",
        (a = n.RoomMode || (n.RoomMode = {}))[a.NORMAL = 0] = "NORMAL",
        a[a.OBS = 1] = "OBS",
        a[a.MEDIA = 2] = "MEDIA",
        a[a.AUDIO = 3] = "AUDIO",
        a[a.SCREEN = 4] = "SCREEN",
        (u = n.ZoomCoverSizeEnum || (n.ZoomCoverSizeEnum = {}))[u.Origin = 0] = "Origin",
        u[u.PX_240 = 1] = "PX_240",
        u[u.PX_480 = 2] = "PX_480",
        u[u.PX_720 = 3] = "PX_720",
        u[u.PX_960 = 4] = "PX_960",
        (d = n.WarnInfoType || (n.WarnInfoType = {}))[d.VPA = 0] = "VPA",
        d[d.WARN = 1] = "WARN",
        d[d.NOTICE = 2] = "NOTICE",
        (c = n.DspPlatform || (n.DspPlatform = {}))[c.DspPlatform_Unknown = 0] = "DspPlatform_Unknown",
        c[c.DspPlatform_AppleMusic = 1] = "DspPlatform_AppleMusic",
        c[c.DspPlatform_AmazonMusic = 2] = "DspPlatform_AmazonMusic",
        c[c.DspPlatform_Spotify = 3] = "DspPlatform_Spotify",
        c[c.DspPlatform_TTMusic = 4] = "DspPlatform_TTMusic",
        (l = n.MaskTypeEnum || (n.MaskTypeEnum = {}))[l.REPORT = 1] = "REPORT",
        l[l.DISLIKE = 2] = "DISLIKE",
        l[l.GENERAL = 3] = "GENERAL",
        l[l.PHOTOSENSITIVE = 4] = "PHOTOSENSITIVE",
        (h = n.ContainerType || (n.ContainerType = {}))[h.UNDEFINED = 0] = "UNDEFINED",
        h[h.ITEM = 1] = "ITEM",
        h[h.LIVE = 2] = "LIVE",
        (I = n.PoiType || (n.PoiType = {}))[I.UNDEFINED = 0] = "UNDEFINED",
        I[I.REGION = 1] = "REGION",
        I[I.STORE = 2] = "STORE",
        I[I.INDEPENDENT = 3] = "INDEPENDENT",
        (_ = n.PoiDetailTagContentType || (n.PoiDetailTagContentType = {}))[_.POI_DETAIL_TAG_CONTENT_TYPE_UNKNOWN = 0] = "POI_DETAIL_TAG_CONTENT_TYPE_UNKNOWN",
        _[_.POI_DETAIL_TAG_CONTENT_TYPE_COMMON = 1] = "POI_DETAIL_TAG_CONTENT_TYPE_COMMON",
        _[_.POI_DETAIL_TAG_CONTENT_TYPE_PRICE = 2] = "POI_DETAIL_TAG_CONTENT_TYPE_PRICE",
        _[_.POI_DETAIL_TAG_CONTENT_TYPE_HOTEL_RATING = 3] = "POI_DETAIL_TAG_CONTENT_TYPE_HOTEL_RATING",
        _[_.POI_DETAIL_TAG_CONTENT_TYPE_OPENING_TIME = 4] = "POI_DETAIL_TAG_CONTENT_TYPE_OPENING_TIME",
        _[_.POI_DETAIL_TAG_CONTENT_TYPE_CATEGORY = 5] = "POI_DETAIL_TAG_CONTENT_TYPE_CATEGORY",
        (v = n.StickerTypeEnum || (n.StickerTypeEnum = {}))[v.MESSAGE_BUBBLE_STICKER = 1] = "MESSAGE_BUBBLE_STICKER",
        v[v.PROPS_STICKER = 2] = "PROPS_STICKER",
        v[v.VOTE_STICKER = 3] = "VOTE_STICKER",
        v[v.TEXT_STICKER = 4] = "TEXT_STICKER",
        v[v.AUTO_STICKER = 5] = "AUTO_STICKER",
        v[v.STATUS_STICKER = 6] = "STATUS_STICKER",
        v[v.CUTTING_SAME_STICKER = 7] = "CUTTING_SAME_STICKER",
        v[v.REPLY_STICKER = 8] = "REPLY_STICKER",
        v[v.COVER_STICKER = 9] = "COVER_STICKER",
        (T = n.LinkRisk || (n.LinkRisk = {}))[T.WHITELIST = 0] = "WHITELIST",
        T[T.UNKNOW = 3] = "UNKNOW",
        T[T.SUSPICIOUS = 5] = "SUSPICIOUS",
        T[T.BLACKLIST = 9] = "BLACKLIST",
        (f = n.UserRelation || (n.UserRelation = {}))[f.UNKNOW = -1] = "UNKNOW",
        f[f.NONE = 0] = "NONE",
        f[f.FOLLOW = 1] = "FOLLOW",
        f[f.MUTAL = 2] = "MUTAL",
        f[f.FOLLOWING_REQUEST = 3] = "FOLLOWING_REQUEST",
        f[f.BLOCK = 4] = "BLOCK",
        f[f.BLOCKED = 5] = "BLOCKED",
        f[f.FOLLOWER = 6] = "FOLLOWER",
        (p = n.MutualType || (n.MutualType = {}))[p.MUTUAL_FRIEND = 1] = "MUTUAL_FRIEND",
        p[p.MUTUAL_FOLLOWED = 2] = "MUTUAL_FOLLOWED",
        p[p.MUTUAL_FOLLOWER = 3] = "MUTUAL_FOLLOWER",
        (E = n.ExploreType || (n.ExploreType = {}))[E.MUSIC = 1] = "MUSIC",
        E[E.USER = 2] = "USER",
        E[E.CHALLENGE = 3] = "CHALLENGE",
        E[E.VIDEO = 4] = "VIDEO",
        (m = n.DiscoverType || (n.DiscoverType = {}))[m.Discover = 0] = "Discover",
        m[m.Explore = 1] = "Explore",
        (S = n.FetchType || (n.FetchType = {}))[S.Initial = 0] = "Initial",
        S[S.LoadPrevious = 1] = "LoadPrevious",
        S[S.LoadLatest = 2] = "LoadLatest",
        (g = n.PostItemListRequestType || (n.PostItemListRequestType = {}))[g.LATEST = 0] = "LATEST",
        g[g.POPULAR = 1] = "POPULAR",
        g[g.OLDEST = 2] = "OLDEST",
        g[g.JUST_WATCHED = 3] = "JUST_WATCHED",
        (L = n.PullType || (n.PullType = {}))[L.PULL = 1] = "PULL",
        L[L.LOADMORE = 2] = "LOADMORE",
        (C = n.LiveCardDisplay || (n.LiveCardDisplay = {}))[C.UNDEFINED = 0] = "UNDEFINED",
        C[C.SINGLE_COLUMN_DISPLAY = 1] = "SINGLE_COLUMN_DISPLAY",
        C[C.FULL_DISPLAY = 2] = "FULL_DISPLAY",
        (A = n.FilterReason || (n.FilterReason = {}))[A.CONTENT_CLASSIFICATION_LOGOUT = 1] = "CONTENT_CLASSIFICATION_LOGOUT",
        (R = n.ItemType || (n.ItemType = {}))[R.RECOMMEND = 0] = "RECOMMEND",
        R[R.POST = 1] = "POST",
        R[R.LIKE = 2] = "LIKE",
        R[R.CHALLENGE = 3] = "CHALLENGE",
        R[R.MUSIC = 4] = "MUSIC",
        R[R.TRENDING = 5] = "TRENDING",
        R[R.STICKER = 6] = "STICKER",
        R[R.PREVIEW = 7] = "PREVIEW",
        R[R.COLLECTION = 8] = "COLLECTION",
        (y = n.MusicListType || (n.MusicListType = {}))[y.USER_PROFILE = 0] = "USER_PROFILE",
        y[y.USER_COLLECT = 1] = "USER_COLLECT",
        (P = n.TrendingType || (n.TrendingType = {}))[P.ChallengeTrending = 0] = "ChallengeTrending",
    (M = n.IdType || (n.IdType = {}))[M.UserId = 0] = "UserId",
    M[M.SecUid = 1] = "SecUid",
    M[M.UniqueId = 2] = "UniqueId",
    (w = n.WebSystemNoticeDisplayType || (n.WebSystemNoticeDisplayType = {}))[w.SHOW_CONTENT = 1] = "SHOW_CONTENT",
    w[w.DOWNLOAD_APP = 2] = "DOWNLOAD_APP",
    w[w.REDIRECT_URL = 3] = "REDIRECT_URL",
    (O = n.NoticeType || (n.NoticeType = {}))[O.AnnouncementNotice = 1] = "AnnouncementNotice",
    O[O.UserTextNotice = 2] = "UserTextNotice",
    O[O.Ad = 6] = "Ad",
    O[O.VoteNotice = 9] = "VoteNotice",
    O[O.System_Ann = 11] = "System_Ann",
    O[O.Ann_System = 12] = "Ann_System",
    O[O.Duet = 21] = "Duet",
    O[O.FollowRequestApprove = 23] = "FollowRequestApprove",
    O[O.CommentNotice = 31] = "CommentNotice",
    O[O.FollowNotice = 33] = "FollowNotice",
    O[O.DiggNotice = 41] = "DiggNotice",
    O[O.AtNotice = 45] = "AtNotice",
    O[O.Tcm = 61] = "Tcm",
    O[O.BusinessAccount = 82] = "BusinessAccount",
    O[O.QaNotice = 84] = "QaNotice",
    O[O.TransactionAssitant = 224] = "TransactionAssitant",
    O[O.Live = 254] = "Live",
    (B = n.AdsActionType || (n.AdsActionType = {}))[B.UNDEFINED = 0] = "UNDEFINED",
    B[B.LIKE = 1] = "LIKE",
    B[B.LIKE_CANCLE = 2] = "LIKE_CANCLE",
    B[B.CLICK_ANCHOR = 3] = "CLICK_ANCHOR",
    B[B.CLICK_POPUPS = 4] = "CLICK_POPUPS",
    B[B.CLICK_VIDEO = 5] = "CLICK_VIDEO",
    B[B.CROSS_OUT = 6] = "CROSS_OUT",
    (D = n.AdsBiz || (n.AdsBiz = {}))[D.UNDEFINED = 0] = "UNDEFINED",
    D[D.BIZ_TT4B = 1] = "BIZ_TT4B",
    (N = n.CollectAction || (n.CollectAction = {}))[N.Undefined = 0] = "Undefined",
    N[N.Collect = 1] = "Collect",
    N[N.Cancel = 2] = "Cancel",
    (U = n.CreatorAICommentCategoryType || (n.CreatorAICommentCategoryType = {}))[U.INSPIRATION = 1] = "INSPIRATION",
    U[U.LOVE = 2] = "LOVE",
    U[U.QUESTION = 3] = "QUESTION",
    n.UrlStruct = b = function e(t) {
      (0,
          tU._)(this, e),
      t && (this.Uri = t.Uri,
          this.UrlList = t.UrlList,
      void 0 !== t.Width && (this.Width = t.Width),
      void 0 !== t.Height && (this.Height = t.Height))
    }
    ,
    n.BioLinkStruct = F = function e(t) {
      (0,
          tU._)(this, e),
      t && (void 0 !== t.Link && (this.Link = t.Link),
      void 0 !== t.Risk && (this.Risk = t.Risk))
    }
    ,
    n.CommerceUserInfoStruct = G = function e(t) {
      (0,
          tU._)(this, e),
      t && (void 0 !== t.CommerceUser && (this.CommerceUser = t.CommerceUser),
      void 0 !== t.DownLoadLink && (this.DownLoadLink = t.DownLoadLink))
    }
    ,
    n.ProAccountStruct = k = function e(t) {
      (0,
          tU._)(this, e),
      t && (this.Status = t.Status,
      void 0 !== t.AnalyticOnTime && (this.AnalyticOnTime = t.AnalyticOnTime),
      void 0 !== t.BusinessSuiteEntrance && (this.BusinessSuiteEntrance = t.BusinessSuiteEntrance),
      void 0 !== t.DownloadLink && (this.DownloadLink = t.DownloadLink),
      void 0 !== t.AnalyticOn && (this.AnalyticOn = t.AnalyticOn),
      void 0 !== t.Category && (this.Category = t.Category),
      void 0 !== t.CategoryButton && (this.CategoryButton = t.CategoryButton))
    }
    ,
    n.RedDotInfo = V = function e(t) {
      (0,
          tU._)(this, e),
      t && (this.ShowTypes = t.ShowTypes)
    }
    ,
    n.CreatorM10NSettings = W = function e(t) {
      (0,
          tU._)(this, e),
      t && (void 0 !== t.HasCollectionsAccess && (this.HasCollectionsAccess = t.HasCollectionsAccess),
      void 0 !== t.HasCollectionsRedDot && (this.HasCollectionsRedDot = t.HasCollectionsRedDot))
    }
    ,
    n.ProfileTab = x = function e(t) {
      (0,
          tU._)(this, e),
      t && (void 0 !== t.ShowMusicTab && (this.ShowMusicTab = t.ShowMusicTab),
      void 0 !== t.ShowQuestionTab && (this.ShowQuestionTab = t.ShowQuestionTab),
      void 0 !== t.ShowPlayListTab && (this.ShowPlayListTab = t.ShowPlayListTab))
    }
    ,
    n.StateControlledMedia = H = function e(t) {
      (0,
          tU._)(this, e),
      t && (this.Text = t.Text,
          this.Url = t.Url)
    }
    ,
    n.UserStruct = Y = function e(t) {
      (0,
          tU._)(this, e),
      t && (this.Id = t.Id,
          this.ShortId = t.ShortId,
          this.UniqueId = t.UniqueId,
          this.Nickname = t.Nickname,
          this.AvatarThumb = new b(t.AvatarThumb),
          this.AvatarMedium = new b(t.AvatarMedium),
          this.AvatarLarger = new b(t.AvatarLarger),
          this.Signature = t.Signature,
          this.CreateTime = t.CreateTime,
      void 0 !== t.Verified && (this.Verified = t.Verified),
      void 0 !== t.SecUid && (this.SecUid = t.SecUid),
          this.PrivateAccount = t.PrivateAccount,
          this.Ftc = t.Ftc,
          this.Relation = t.Relation,
          this.OpenFavorite = t.OpenFavorite,
      void 0 !== t.BioLink && (this.BioLink = new F(t.BioLink)),
      void 0 !== t.CommerceUserInfo && (this.CommerceUserInfo = new G(t.CommerceUserInfo)),
      void 0 !== t.CommentSetting && (this.CommentSetting = t.CommentSetting),
      void 0 !== t.DuetSetting && (this.DuetSetting = t.DuetSetting),
      void 0 !== t.StitchSetting && (this.StitchSetting = t.StitchSetting),
      void 0 !== t.ShowPrivateBanner && (this.ShowPrivateBanner = t.ShowPrivateBanner),
      void 0 !== t.IsADVirtual && (this.IsADVirtual = t.IsADVirtual),
      void 0 !== t.RoomId && (this.RoomId = t.RoomId),
      void 0 !== t.ProAccount && (this.ProAccount = new k(t.ProAccount)),
      void 0 !== t.LivePermission && (this.LivePermission = t.LivePermission),
      void 0 !== t.CmplToken && (this.CmplToken = t.CmplToken),
      void 0 !== t.Region && (this.Region = t.Region),
      void 0 !== t.IMPermission && (this.IMPermission = t.IMPermission),
      void 0 !== t.IMSet && (this.IMSet = t.IMSet),
      void 0 !== t.AgeGateRegion && (this.AgeGateRegion = t.AgeGateRegion),
      void 0 !== t.AgeGateTime && (this.AgeGateTime = t.AgeGateTime),
      void 0 !== t.UserMode && (this.UserMode = t.UserMode),
      void 0 !== t.ShowScheduleTips && (this.ShowScheduleTips = t.ShowScheduleTips),
      void 0 !== t.AdAuthorization && (this.AdAuthorization = t.AdAuthorization),
      void 0 !== t.parentalGuardianMode && (this.parentalGuardianMode = t.parentalGuardianMode),
      void 0 !== t.AgeInterval && (this.AgeInterval = t.AgeInterval),
      void 0 !== t.LongVideoMinutes && (this.LongVideoMinutes = t.LongVideoMinutes),
      void 0 !== t.RedDot && (this.RedDot = new V(t.RedDot)),
      void 0 !== t.TCMSetting && (this.TCMSetting = t.TCMSetting),
      void 0 !== t.IsUnderAge18 && (this.IsUnderAge18 = t.IsUnderAge18),
      void 0 !== t.PhotosensitiveVideosSetting && (this.PhotosensitiveVideosSetting = t.PhotosensitiveVideosSetting),
      void 0 !== t.UniqueIdModifyTime && (this.UniqueIdModifyTime = t.UniqueIdModifyTime),
      void 0 !== t.IsBanned && (this.IsBanned = t.IsBanned),
      void 0 !== t.TTSeller && (this.TTSeller = t.TTSeller),
      void 0 !== t.CreatorM10NSettings && (this.CreatorM10NSettings = new W(t.CreatorM10NSettings)),
      void 0 !== t.DownloadSetting && (this.DownloadSetting = t.DownloadSetting),
      void 0 !== t.ProfileTab && (this.ProfileTab = new x(t.ProfileTab)),
      void 0 !== t.NowInvitationCardUrl && (this.NowInvitationCardUrl = t.NowInvitationCardUrl),
      void 0 !== t.FollowingVisibility && (this.FollowingVisibility = t.FollowingVisibility),
      void 0 !== t.RecommendReason && (this.RecommendReason = t.RecommendReason),
      void 0 !== t.NickNameModifyTime && (this.NickNameModifyTime = t.NickNameModifyTime),
      void 0 !== t.NowReferralInfo && (this.NowReferralInfo = new q(t.NowReferralInfo)),
      void 0 !== t.StateControlledMedia && (this.StateControlledMedia = new H(t.StateControlledMedia)),
      void 0 !== t.IsEmbedBanned && (this.IsEmbedBanned = t.IsEmbedBanned),
      void 0 !== t.ProfileEmbedPermission && (this.ProfileEmbedPermission = t.ProfileEmbedPermission),
      void 0 !== t.HasSearchPermission && (this.HasSearchPermission = t.HasSearchPermission),
      void 0 !== t.CanExpPlaylist && (this.CanExpPlaylist = t.CanExpPlaylist),
      void 0 !== t.HasSearchLivePermission && (this.HasSearchLivePermission = t.HasSearchLivePermission),
      void 0 !== t.StoreRegion && (this.StoreRegion = t.StoreRegion),
      void 0 !== t.ShowPodcastTooltips && (this.ShowPodcastTooltips = t.ShowPodcastTooltips),
      void 0 !== t.Language && (this.Language = t.Language),
      void 0 !== t.Events && (this.Events = Array.isArray(t.Events) ? t.Events.map(function (e) {
        return new tm(e)
      }) : t.Events),
      void 0 !== t.SuggestAccountBind && (this.SuggestAccountBind = t.SuggestAccountBind),
      void 0 !== t.LongVideoPopupDisplayedStatus && (this.LongVideoPopupDisplayedStatus = t.LongVideoPopupDisplayedStatus),
      void 0 !== t.IsOrganization && (this.IsOrganization = t.IsOrganization),
      void 0 !== t.HasPromoteEntry && (this.HasPromoteEntry = t.HasPromoteEntry),
      void 0 !== t.LanguageSettings && (this.LanguageSettings = new tG.M$.LanguageSettings(t.LanguageSettings)),
      void 0 !== t.UserStoryStatus && (this.UserStoryStatus = t.UserStoryStatus))
    }
    ,
    n.NowReferralInfoStruct = q = function e(t) {
      (0,
          tU._)(this, e),
      t && (void 0 !== t.InviteCode && (this.InviteCode = t.InviteCode),
      void 0 !== t.Reward && (this.Reward = t.Reward))
    }
    ,
    n.MetaStruct = z = function e(t) {
      (0,
          tU._)(this, e),
      t && (this.Title = t.Title,
          this.Desc = t.Desc,
      void 0 !== t.PreviewImage && (this.PreviewImage = new b(t.PreviewImage)))
    }
    ,
    n.TextExtra = K = function e(t) {
      (0,
          tU._)(this, e),
      t && (void 0 !== t.AwemeId && (this.AwemeId = t.AwemeId),
          this.Start = t.Start,
          this.End = t.End,
      void 0 !== t.HashtagName && (this.HashtagName = t.HashtagName),
      void 0 !== t.HashtagId && (this.HashtagId = t.HashtagId),
          this.Type = t.Type,
      void 0 !== t.UserId && (this.UserId = t.UserId),
      void 0 !== t.IsCommerce && (this.IsCommerce = t.IsCommerce),
      void 0 !== t.UserUniqueId && (this.UserUniqueId = t.UserUniqueId),
      void 0 !== t.SecUid && (this.SecUid = t.SecUid),
      void 0 !== t.QuestionId && (this.QuestionId = t.QuestionId),
      void 0 !== t.QuestionContent && (this.QuestionContent = t.QuestionContent),
      void 0 !== t.SubType && (this.SubType = t.SubType))
    }
    ,
    n.LiveRoomStats = $ = function e(t) {
      (0,
          tU._)(this, e),
      t && (void 0 !== t.UserCount && (this.UserCount = t.UserCount),
      void 0 !== t.EnterCount && (this.EnterCount = t.EnterCount),
      void 0 !== t.DiggCount && (this.DiggCount = t.DiggCount))
    }
    ,
    n.UserStatsStruct = Q = function e(t) {
      (0,
          tU._)(this, e),
      t && (this.FollowingCount = t.FollowingCount,
          this.FollowerCount = t.FollowerCount,
          this.HeartCount = t.HeartCount,
          this.VideoCount = t.VideoCount,
          this.DiggCount = t.DiggCount,
          this.Heart = t.Heart,
      void 0 !== t.FriendCount && (this.FriendCount = t.FriendCount))
    }
    ,
    n.UserStatsV2Struct = j = function e(t) {
      (0,
          tU._)(this, e),
      t && (this.FollowingCount = t.FollowingCount,
          this.FollowerCount = t.FollowerCount,
          this.HeartCount = t.HeartCount,
          this.VideoCount = t.VideoCount,
          this.DiggCount = t.DiggCount,
          this.Heart = t.Heart,
      void 0 !== t.FriendCount && (this.FriendCount = t.FriendCount))
    }
    ,
    n.LiveRoomInfoStruct = X = function e(t) {
      (0,
          tU._)(this, e),
      t && (this.RoomId = t.RoomId,
          this.Status = t.Status,
          this.Title = t.Title,
          this.LiveUrl = t.LiveUrl,
          this.OwnerInfo = new Y(t.OwnerInfo),
      void 0 !== t.LiveRoomStats && (this.LiveRoomStats = new $(t.LiveRoomStats)),
      void 0 !== t.coverUrl && (this.coverUrl = new b(t.coverUrl)),
      void 0 !== t.FilterReason && (this.FilterReason = t.FilterReason),
      void 0 !== t.OwnerStats && (this.OwnerStats = new Q(t.OwnerStats)),
      void 0 !== t.StartTime && (this.StartTime = t.StartTime),
      void 0 !== t.StreamData && (this.StreamData = t.StreamData),
      void 0 !== t.Landscape && (this.Landscape = t.Landscape),
      void 0 !== t.Mode && (this.Mode = t.Mode),
      void 0 !== t.FollowStatus && (this.FollowStatus = t.FollowStatus),
      void 0 !== t.LiveSubOnly && (this.LiveSubOnly = t.LiveSubOnly),
      void 0 !== t.WebFYPRoomTag && (this.WebFYPRoomTag = new tG.M$.WebFYPRoomTag(t.WebFYPRoomTag)),
      void 0 !== t.ShareCount && (this.ShareCount = t.ShareCount),
      void 0 !== t.LikeCount && (this.LikeCount = t.LikeCount),
      void 0 !== t.OwnerStatsV2 && (this.OwnerStatsV2 = new j(t.OwnerStatsV2)),
      void 0 !== t.PreviewCommentInfo && (this.PreviewCommentInfo = new tG.M$.PreviewCommentInfo(t.PreviewCommentInfo)),
      void 0 !== t.ToggleInfo && (this.ToggleInfo = new tG.M$.ToggleInfo(t.ToggleInfo)),
      void 0 !== t.StreamSnapShot && (this.StreamSnapShot = new tG.M$.StreamSnapShot(t.StreamSnapShot)),
      void 0 !== t.Highlights && (this.Highlights = Array.isArray(t.Highlights) ? t.Highlights.map(function (e) {
        return new tG.M$.VideoMetaInfo(e)
      }) : t.Highlights))
    }
    ,
    n.VideoStruct = Z = function e(t) {
      (0,
          tU._)(this, e),
      t && (this.Id = t.Id,
          this.Height = t.Height,
          this.Width = t.Width,
          this.Duration = t.Duration,
          this.Ratio = t.Ratio,
          this.Cover = new b(t.Cover),
          this.OriginCover = new b(t.OriginCover),
      void 0 !== t.DynamicCover && (this.DynamicCover = new b(t.DynamicCover)),
      void 0 !== t.PlayAddr && (this.PlayAddr = new b(t.PlayAddr)),
      void 0 !== t.DownloadAddr && (this.DownloadAddr = new b(t.DownloadAddr)),
      void 0 !== t.ShareCover && (this.ShareCover = new b(t.ShareCover)),
      void 0 !== t.ReflowCover && (this.ReflowCover = new b(t.ReflowCover)),
      void 0 !== t.Bitrate && (this.Bitrate = t.Bitrate),
      void 0 !== t.EncodedType && (this.EncodedType = t.EncodedType),
      void 0 !== t.Format && (this.Format = t.Format),
      void 0 !== t.VideoQuality && (this.VideoQuality = t.VideoQuality),
      void 0 !== t.EncodeUserTag && (this.EncodeUserTag = t.EncodeUserTag),
      void 0 !== t.CodecType && (this.CodecType = t.CodecType),
      void 0 !== t.UrlExpire && (this.UrlExpire = t.UrlExpire),
      void 0 !== t.Definition && (this.Definition = t.Definition),
      void 0 !== t.BitRateInfo && (this.BitRateInfo = Array.isArray(t.BitRateInfo) ? t.BitRateInfo.map(function (e) {
        return new es(e)
      }) : t.BitRateInfo),
      void 0 !== t.SubtitleInfos && (this.SubtitleInfos = Array.isArray(t.SubtitleInfos) ? t.SubtitleInfos.map(function (e) {
        return new en(e)
      }) : t.SubtitleInfos),
      void 0 !== t.ZoomCover && (this.ZoomCover = t.ZoomCover ? Object.fromEntries(Object.entries(t.ZoomCover).map(function (e) {
        var t = (0,
            tb._)(e, 2);
        return [t[0], new b(t[1])]
      })) : t.ZoomCover),
      void 0 !== t.VolumeInfo && (this.VolumeInfo = new ei(t.VolumeInfo)),
      void 0 !== t.Size && (this.Size = t.Size),
      void 0 !== t.BackupAddr && (this.BackupAddr = new b(t.BackupAddr)),
      void 0 !== t.SetOptimizedCover && (this.SetOptimizedCover = t.SetOptimizedCover),
      void 0 !== t.VQScore && (this.VQScore = t.VQScore),
      void 0 !== t.ClaInfo && (this.ClaInfo = new J(t.ClaInfo)),
      void 0 !== t.VideoID && (this.VideoID = t.VideoID),
      void 0 !== t.BitrateAudioInfo && (this.BitrateAudioInfo = Array.isArray(t.BitrateAudioInfo) ? t.BitrateAudioInfo.map(function (e) {
        return new er(e)
      }) : t.BitrateAudioInfo),
      void 0 !== t.PlayAddrStruct && (this.PlayAddrStruct = new eo(t.PlayAddrStruct)))
    }
    ,
    n.CLAInfo = J = function e(t) {
      (0,
          tU._)(this, e),
      t && (void 0 !== t.HasOriginalAudio && (this.HasOriginalAudio = t.HasOriginalAudio),
      void 0 !== t.EnableAutoCaption && (this.EnableAutoCaption = t.EnableAutoCaption),
      void 0 !== t.OriginalLanguageInfo && (this.OriginalLanguageInfo = new ee(t.OriginalLanguageInfo)),
      void 0 !== t.CaptionInfos && (this.CaptionInfos = Array.isArray(t.CaptionInfos) ? t.CaptionInfos.map(function (e) {
        return new et(e)
      }) : t.CaptionInfos),
      void 0 !== t.CaptionsType && (this.CaptionsType = t.CaptionsType),
      void 0 !== t.NoCaptionReason && (this.NoCaptionReason = t.NoCaptionReason))
    }
    ,
    n.OriginalLanguageInfo = ee = function e(t) {
      (0,
          tU._)(this, e),
      t && (void 0 !== t.Language && (this.Language = t.Language),
      void 0 !== t.LanguageID && (this.LanguageID = t.LanguageID),
      void 0 !== t.LanguageCode && (this.LanguageCode = t.LanguageCode),
      void 0 !== t.CanTranslateRealTime && (this.CanTranslateRealTime = t.CanTranslateRealTime),
      void 0 !== t.CanTranslateRealTimeNoCheck && (this.CanTranslateRealTimeNoCheck = t.CanTranslateRealTimeNoCheck))
    }
    ,
    n.CaptionInfoStruct = et = function e(t) {
      (0,
          tU._)(this, e),
      t && (void 0 !== t.Language && (this.Language = t.Language),
      void 0 !== t.LanguageID && (this.LanguageID = t.LanguageID),
      void 0 !== t.URL && (this.URL = t.URL),
      void 0 !== t.Expire && (this.Expire = t.Expire),
      void 0 !== t.CaptionFormat && (this.CaptionFormat = t.CaptionFormat),
      void 0 !== t.IsAutoGen && (this.IsAutoGen = t.IsAutoGen),
      void 0 !== t.SubID && (this.SubID = t.SubID),
      void 0 !== t.CLASubtitleID && (this.CLASubtitleID = t.CLASubtitleID),
      void 0 !== t.LanguageCode && (this.LanguageCode = t.LanguageCode),
      void 0 !== t.IsOriginalCaption && (this.IsOriginalCaption = t.IsOriginalCaption),
      void 0 !== t.UrlList && (this.UrlList = t.UrlList),
      void 0 !== t.Variant && (this.Variant = t.Variant),
      void 0 !== t.SubtitleType && (this.SubtitleType = t.SubtitleType),
      void 0 !== t.TranslationType && (this.TranslationType = t.TranslationType))
    }
    ,
    n.VolumeInfoStruct = ei = function e(t) {
      (0,
          tU._)(this, e),
      t && (void 0 !== t.Loudness && (this.Loudness = t.Loudness),
      void 0 !== t.Peak && (this.Peak = t.Peak))
    }
    ,
    n.SubtitleInfo = en = function e(t) {
      (0,
          tU._)(this, e),
      t && (void 0 !== t.LanguageID && (this.LanguageID = t.LanguageID),
      void 0 !== t.LanguageCodeName && (this.LanguageCodeName = t.LanguageCodeName),
      void 0 !== t.Url && (this.Url = t.Url),
      void 0 !== t.UrlExpire && (this.UrlExpire = t.UrlExpire),
      void 0 !== t.Format && (this.Format = t.Format),
      void 0 !== t.Version && (this.Version = t.Version),
      void 0 !== t.Source && (this.Source = t.Source),
      void 0 !== t.VideoSubtitleID && (this.VideoSubtitleID = t.VideoSubtitleID),
      void 0 !== t.Size && (this.Size = t.Size))
    }
    ,
    n.UrlStructV2 = eo = function e(t) {
      (0,
          tU._)(this, e),
      t && (this.Uri = t.Uri,
          this.UrlList = t.UrlList,
      void 0 !== t.DataSize && (this.DataSize = t.DataSize),
      void 0 !== t.Width && (this.Width = t.Width),
      void 0 !== t.Height && (this.Height = t.Height),
      void 0 !== t.UrlKey && (this.UrlKey = t.UrlKey),
      void 0 !== t.FileHash && (this.FileHash = t.FileHash),
      void 0 !== t.FileCs && (this.FileCs = t.FileCs),
      void 0 !== t.PlayerAccessKey && (this.PlayerAccessKey = t.PlayerAccessKey))
    }
    ,
    n.BitrateStruct = es = function e(t) {
      (0,
          tU._)(this, e),
      t && (this.GearName = t.GearName,
          this.Bitrate = t.Bitrate,
          this.QualityType = t.QualityType,
      void 0 !== t.PlayAddr && (this.PlayAddr = new eo(t.PlayAddr)),
      void 0 !== t.PlayAddrH265 && (this.PlayAddrH265 = new eo(t.PlayAddrH265)),
          this.CodecType = t.CodecType,
      void 0 !== t.PlayAddrByteVC1 && (this.PlayAddrByteVC1 = new eo(t.PlayAddrByteVC1)),
      void 0 !== t.MVMAF && (this.MVMAF = t.MVMAF),
      void 0 !== t.Format && (this.Format = t.Format),
      void 0 !== t.BitrateFPS && (this.BitrateFPS = t.BitrateFPS),
      void 0 !== t.VideoExtra && (this.VideoExtra = t.VideoExtra))
    }
    ,
    n.BitrateAudioStruct = er = function e(t) {
      (0,
          tU._)(this, e),
      t && (this.UrlList = new ea(t.UrlList),
          this.Bitrate = t.Bitrate,
          this.CodecType = t.CodecType,
      void 0 !== t.EncodedType && (this.EncodedType = t.EncodedType),
      void 0 !== t.Format && (this.Format = t.Format),
      void 0 !== t.AudioQuality && (this.AudioQuality = t.AudioQuality),
      void 0 !== t.SubInfo && (this.SubInfo = new eu(t.SubInfo)),
      void 0 !== t.FileHash && (this.FileHash = t.FileHash),
      void 0 !== t.FileId && (this.FileId = t.FileId),
      void 0 !== t.AudioQualityString && (this.AudioQualityString = t.AudioQualityString),
      void 0 !== t.AudioDataSize && (this.AudioDataSize = t.AudioDataSize),
      void 0 !== t.AudioFormat && (this.AudioFormat = t.AudioFormat),
      void 0 !== t.AudioFPS && (this.AudioFPS = t.AudioFPS),
      void 0 !== t.MediaType && (this.MediaType = t.MediaType),
      void 0 !== t.AudioExtra && (this.AudioExtra = t.AudioExtra),
      void 0 !== t.SubInfoString && (this.SubInfoString = t.SubInfoString))
    }
    ,
    n.BitrateAudioUrlList = ea = function e(t) {
      (0,
          tU._)(this, e),
      t && (this.MainUrl = t.MainUrl,
          this.BackupUrl = t.BackupUrl,
          this.FallbackUrl = t.FallbackUrl)
    }
    ,
    n.AudioSubInfo = eu = function e(t) {
      (0,
          tU._)(this, e),
      t && (this.InitRange = t.InitRange,
          this.IndexRange = t.IndexRange,
          this.CheckInfo = t.CheckInfo)
    }
    ,
    n.DuetInfo = ed = function e(t) {
      (0,
          tU._)(this, e),
      t && (this.DuetFromId = t.DuetFromId)
    }
    ,
    n.WarnInfo = ec = function e(t) {
      (0,
          tU._)(this, e),
      t && (this.Text = t.Text,
      void 0 !== t.Url && (this.Url = t.Url),
      void 0 !== t.Type && (this.Type = t.Type),
      void 0 !== t.Lang && (this.Lang = t.Lang),
      void 0 !== t.Key && (this.Key = t.Key))
    }
    ,
    n.CommentStruct = el = function e(t) {
      (0,
          tU._)(this, e),
      t && (this.Id = t.Id,
          this.Text = t.Text,
          this.CreateTime = t.CreateTime,
          this.DiggCount = t.DiggCount,
      void 0 !== t.User && (this.User = new Y(t.User)))
    }
    ,
    n.StickerStatsStruct = eh = function e(t) {
      (0,
          tU._)(this, e),
      t && (this.UseCount = t.UseCount)
    }
    ,
    n.StickerStruct = eI = function e(t) {
      (0,
          tU._)(this, e),
      t && (this.Id = t.Id,
          this.Name = t.Name,
          this.Desc = t.Desc,
      void 0 !== t.CoverUrls && (this.CoverUrls = new b(t.CoverUrls)),
          this.StickerStats = new eh(t.StickerStats))
    }
    ,
    n.StickerInfoStruct = e_ = function e(t) {
      (0,
          tU._)(this, e),
      t && (this.Sticker = new eI(t.Sticker),
      void 0 !== t.Author && (this.Author = new Y(t.Author)))
    }
    ,
    n.MusicStruct = ev = function e(t) {
      (0,
          tU._)(this, e),
      t && (this.Id = t.Id,
          this.Title = t.Title,
      void 0 !== t.PlayUrl && (this.PlayUrl = new b(t.PlayUrl)),
          this.CoverThumb = new b(t.CoverThumb),
          this.CoverMedium = new b(t.CoverMedium),
          this.CoverLarge = new b(t.CoverLarge),
      void 0 !== t.AuthorName && (this.AuthorName = t.AuthorName),
          this.Original = t.Original,
      void 0 !== t.PlayToken && (this.PlayToken = t.PlayToken),
      void 0 !== t.KeyToken && (this.KeyToken = t.KeyToken),
      void 0 !== t.AuthorFtc && (this.AuthorFtc = t.AuthorFtc),
      void 0 !== t.AudioURLWithCookie && (this.AudioURLWithCookie = t.AudioURLWithCookie),
      void 0 !== t.Private && (this.Private = t.Private),
      void 0 !== t.Duration && (this.Duration = t.Duration),
      void 0 !== t.Album && (this.Album = t.Album),
      void 0 !== t.ScheduleSearchTime && (this.ScheduleSearchTime = t.ScheduleSearchTime),
      void 0 !== t.IsAvailable && (this.IsAvailable = t.IsAvailable),
      void 0 !== t.Collected && (this.Collected = t.Collected),
      void 0 !== t.PreciseDuration && (this.PreciseDuration = new em(t.PreciseDuration)),
      void 0 !== t.IsCopyrighted && (this.IsCopyrighted = t.IsCopyrighted),
      void 0 !== t.tt2dsp && (this.tt2dsp = new ef(t.tt2dsp)))
    }
    ,
    n.TT2DspInfoStruct = eT = function e(t) {
      (0,
          tU._)(this, e),
      t && (void 0 !== t.Platform && (this.Platform = t.Platform),
      void 0 !== t.SongId && (this.SongId = t.SongId),
      void 0 !== t.Token && (this.Token = new ep(t.Token)),
      void 0 !== t.ShowStrategy && (this.ShowStrategy = t.ShowStrategy),
      void 0 !== t.MetaSongId && (this.MetaSongId = t.MetaSongId))
    }
    ,
    n.TT2DSP = ef = function e(t) {
      (0,
          tU._)(this, e),
      t && (void 0 !== t.tt_to_dsp_song_infos && (this.tt_to_dsp_song_infos = Array.isArray(t.tt_to_dsp_song_infos) ? t.tt_to_dsp_song_infos.map(function (e) {
        return new eT(e)
      }) : t.tt_to_dsp_song_infos),
      void 0 !== t.dsp_platform_selected_by_user && (this.dsp_platform_selected_by_user = t.dsp_platform_selected_by_user))
    }
    ,
    n.DspAuthToken = ep = function e(t) {
      (0,
          tU._)(this, e),
      t && void 0 !== t.AppleMusicToken && (this.AppleMusicToken = new eE(t.AppleMusicToken))
    }
    ,
    n.AppleMusicToken = eE = function e(t) {
      (0,
          tU._)(this, e),
      t && (void 0 !== t.DeveloperToken && (this.DeveloperToken = t.DeveloperToken),
      void 0 !== t.UserToken && (this.UserToken = t.UserToken))
    }
    ,
    n.PreciseDurationStruct = em = function e(t) {
      (0,
          tU._)(this, e),
      t && (void 0 !== t.PreciseDuration && (this.PreciseDuration = t.PreciseDuration),
      void 0 !== t.PreciseShootDuration && (this.PreciseShootDuration = t.PreciseShootDuration),
      void 0 !== t.PreciseAuditionDuration && (this.PreciseAuditionDuration = t.PreciseAuditionDuration),
      void 0 !== t.PreciseVideoDuration && (this.PreciseVideoDuration = t.PreciseVideoDuration))
    }
    ,
    n.MusicStatsStruct = eS = function e(t) {
      (0,
          tU._)(this, e),
      t && (this.VideoCount = t.VideoCount)
    }
    ,
    n.ChallengeStruct = eg = function e(t) {
      (0,
          tU._)(this, e),
      t && (this.Id = t.Id,
          this.Title = t.Title,
          this.Desc = t.Desc,
          this.ProfileThumb = new b(t.ProfileThumb),
          this.ProfileMedium = new b(t.ProfileMedium),
          this.ProfileLarger = new b(t.ProfileLarger),
          this.CoverThumb = new b(t.CoverThumb),
          this.CoverMedium = new b(t.CoverMedium),
          this.CoverLarger = new b(t.CoverLarger),
      void 0 !== t.isCommerce && (this.isCommerce = t.isCommerce),
      void 0 !== t.SplitTitle && (this.SplitTitle = t.SplitTitle),
      void 0 !== t.Stats && (this.Stats = new eX(t.Stats)))
    }
    ,
    n.ItemStatsStruct = eL = function e(t) {
      (0,
          tU._)(this, e),
      t && (this.DiggCount = t.DiggCount,
          this.ShareCount = t.ShareCount,
          this.CommentCount = t.CommentCount,
          this.PlayCount = t.PlayCount,
      void 0 !== t.CollectCount && (this.CollectCount = t.CollectCount))
    }
    ,
    n.ItemStatsV2Struct = eC = function e(t) {
      (0,
          tU._)(this, e),
      t && (this.DiggCount = t.DiggCount,
          this.ShareCount = t.ShareCount,
          this.CommentCount = t.CommentCount,
          this.PlayCount = t.PlayCount,
      void 0 !== t.CollectCount && (this.CollectCount = t.CollectCount),
      void 0 !== t.RepostCount && (this.RepostCount = t.RepostCount))
    }
    ,
    n.EffectStickerStruct = eA = function e(t) {
      (0,
          tU._)(this, e),
      t && (this.id = t.id,
          this.name = t.name,
      void 0 !== t.StickerStats && (this.StickerStats = new eh(t.StickerStats)))
    }
    ,
    n.StickerOnItemStruct = eR = function e(t) {
      (0,
          tU._)(this, e),
      t && (this.StickerType = t.StickerType,
          this.StickerText = t.StickerText)
    }
    ,
    n.ReviewStatusStruct = ey = function e(t) {
      (0,
          tU._)(this, e),
      t && void 0 !== t.PassedSecondReview && (this.PassedSecondReview = t.PassedSecondReview)
    }
    ,
    n.ImagePostStruct = eP = function e(t) {
      (0,
          tU._)(this, e),
      t && (this.Images = Array.isArray(t.Images) ? t.Images.map(function (e) {
        return new eM(e)
      }) : t.Images,
          this.Cover = new eM(t.Cover),
          this.ShareCover = new eM(t.ShareCover),
      void 0 !== t.Title && (this.Title = t.Title))
    }
    ,
    n.ImageStruct = eM = function e(t) {
      (0,
          tU._)(this, e),
      t && (this.ImageURL = new b(t.ImageURL),
          this.ImageHeight = t.ImageHeight,
          this.ImageWidth = t.ImageWidth)
    }
    ,
    n.StoryStruct = ew = function e(t) {
      (0,
          tU._)(this, e),
      t && (void 0 !== t.ExpiredAt && (this.ExpiredAt = t.ExpiredAt),
      void 0 !== t.Viewed && (this.Viewed = t.Viewed),
      void 0 !== t.TotalComments && (this.TotalComments = t.TotalComments),
      void 0 !== t.IsOfficial && (this.IsOfficial = t.IsOfficial),
      void 0 !== t.ViewerCount && (this.ViewerCount = t.ViewerCount),
      void 0 !== t.IsShareStory && (this.IsShareStory = t.IsShareStory),
      void 0 !== t.IsAvatarTriggeredStory && (this.IsAvatarTriggeredStory = t.IsAvatarTriggeredStory))
    }
    ,
    n.NowStruct = eO = function e(t) {
      (0,
          tU._)(this, e),
      t && (void 0 !== t.CoverImageURL && (this.CoverImageURL = new b(t.CoverImageURL)),
      void 0 !== t.NowType && (this.NowType = t.NowType),
      void 0 !== t.ShareCoverURL && (this.ShareCoverURL = new b(t.ShareCoverURL)))
    }
    ,
    n.Content = eB = function e(t) {
      (0,
          tU._)(this, e),
      t && (void 0 !== t.Desc && (this.Desc = t.Desc),
      void 0 !== t.TextExtra && (this.TextExtra = Array.isArray(t.TextExtra) ? t.TextExtra.map(function (e) {
        return new K(e)
      }) : t.TextExtra))
    }
    ,
    n.ItemStruct = eD = function e(t) {
      (0,
          tU._)(this, e),
      t && (this.Id = t.Id,
          this.Desc = t.Desc,
          this.CreateTime = t.CreateTime,
      void 0 !== t.Video && (this.Video = new Z(t.Video)),
      void 0 !== t.Author && (this.Author = new Y(t.Author)),
      void 0 !== t.Music && (this.Music = new ev(t.Music)),
      void 0 !== t.Challenges && (this.Challenges = Array.isArray(t.Challenges) ? t.Challenges.map(function (e) {
        return new eg(e)
      }) : t.Challenges),
      void 0 !== t.Stats && (this.Stats = new eL(t.Stats)),
      void 0 !== t.DuetInfo && (this.DuetInfo = new ed(t.DuetInfo)),
      void 0 !== t.WarnInfo && (this.WarnInfo = Array.isArray(t.WarnInfo) ? t.WarnInfo.map(function (e) {
        return new ec(e)
      }) : t.WarnInfo),
          this.OriginalItem = t.OriginalItem,
          this.OfficalItem = t.OfficalItem,
          this.TextExtra = Array.isArray(t.TextExtra) ? t.TextExtra.map(function (e) {
            return new K(e)
          }) : t.TextExtra,
          this.PrivateItem = t.PrivateItem,
          this.ForFriend = t.ForFriend,
      void 0 !== t.AuthorStats && (this.AuthorStats = new Q(t.AuthorStats)),
          this.Digged = t.Digged,
          this.ItemCommentStatus = t.ItemCommentStatus,
      void 0 !== t.ShowNotPass && (this.ShowNotPass = t.ShowNotPass),
      void 0 !== t.VL1 && (this.VL1 = t.VL1),
      void 0 !== t.TakeDown && (this.TakeDown = t.TakeDown),
      void 0 !== t.ItemMute && (this.ItemMute = t.ItemMute),
      void 0 !== t.IsActivityItem && (this.IsActivityItem = t.IsActivityItem),
      void 0 !== t.EffectStickers && (this.EffectStickers = Array.isArray(t.EffectStickers) ? t.EffectStickers.map(function (e) {
        return new eA(e)
      }) : t.EffectStickers),
      void 0 !== t.DuetEnabled && (this.DuetEnabled = t.DuetEnabled),
      void 0 !== t.StitchEnabled && (this.StitchEnabled = t.StitchEnabled),
      void 0 !== t.ShareEnabled && (this.ShareEnabled = t.ShareEnabled),
      void 0 !== t.IsAd && (this.IsAd = t.IsAd),
      void 0 !== t.StickersOnItem && (this.StickersOnItem = Array.isArray(t.StickersOnItem) ? t.StickersOnItem.map(function (e) {
        return new eR(e)
      }) : t.StickersOnItem),
      void 0 !== t.ScheduleTime && (this.ScheduleTime = t.ScheduleTime),
      void 0 !== t.Comments && (this.Comments = Array.isArray(t.Comments) ? t.Comments.map(function (e) {
        return new el(e)
      }) : t.Comments),
      void 0 !== t.ReviewStatus && (this.ReviewStatus = new ey(t.ReviewStatus)),
      void 0 !== t.IndexEnabled && (this.IndexEnabled = t.IndexEnabled),
      void 0 !== t.DuetDisplay && (this.DuetDisplay = t.DuetDisplay),
      void 0 !== t.StitchDisplay && (this.StitchDisplay = t.StitchDisplay),
      void 0 !== t.DiversificationLabels && (this.DiversificationLabels = t.DiversificationLabels),
      void 0 !== t.AutoCaptionsURLs && (this.AutoCaptionsURLs = t.AutoCaptionsURLs),
      void 0 !== t.ImagePost && (this.ImagePost = new eP(t.ImagePost)),
      void 0 !== t.MaskType && (this.MaskType = t.MaskType),
      void 0 !== t.MixInfo && (this.MixInfo = new ts(t.MixInfo)),
      void 0 !== t.AdAuthorization && (this.AdAuthorization = t.AdAuthorization),
      void 0 !== t.AdLabelVersion && (this.AdLabelVersion = t.AdLabelVersion),
      void 0 !== t.LocationCreated && (this.LocationCreated = t.LocationCreated),
      void 0 !== t.Story && (this.Story = new ew(t.Story)),
      void 0 !== t.Now && (this.Now = new eO(t.Now)),
      void 0 !== t.PoiInfo && (this.PoiInfo = new ek(t.PoiInfo)),
      void 0 !== t.BAInfo && (this.BAInfo = t.BAInfo),
      void 0 !== t.IsTT4BAds && (this.IsTT4BAds = t.IsTT4BAds),
      void 0 !== t.SuggestedWords && (this.SuggestedWords = t.SuggestedWords),
      void 0 !== t.Contents && (this.Contents = Array.isArray(t.Contents) ? t.Contents.map(function (e) {
        return new eB(e)
      }) : t.Contents),
      void 0 !== t.PlaylistId && (this.PlaylistId = t.PlaylistId),
      void 0 !== t.DiversificationId && (this.DiversificationId = t.DiversificationId),
      void 0 !== t.LiveRoomInfoStruct && (this.LiveRoomInfoStruct = new X(t.LiveRoomInfoStruct)),
      void 0 !== t.ContainerType && (this.ContainerType = t.ContainerType),
      void 0 !== t.Collected && (this.Collected = t.Collected),
      void 0 !== t.MTAnchorsInfo && (this.MTAnchorsInfo = Array.isArray(t.MTAnchorsInfo) ? t.MTAnchorsInfo.map(function (e) {
        return new eG(e)
      }) : t.MTAnchorsInfo),
      void 0 !== t.SubVideoMeta && (this.SubVideoMeta = new eN(t.SubVideoMeta)),
      void 0 !== t.VideoSuggestWordsList && (this.VideoSuggestWordsList = new eU(t.VideoSuggestWordsList)),
      void 0 !== t.ChannelTags && (this.ChannelTags = t.ChannelTags),
      void 0 !== t.IsContentClassified && (this.IsContentClassified = t.IsContentClassified),
      void 0 !== t.ServerABVersions && (this.ServerABVersions = t.ServerABVersions),
      void 0 !== t.BrandOrganicType && (this.BrandOrganicType = t.BrandOrganicType),
      void 0 !== t.IsECVideo && (this.IsECVideo = t.IsECVideo),
      void 0 !== t.Event && (this.Event = new tm(t.Event)),
      void 0 !== t.AdInfo && (this.AdInfo = new tL(t.AdInfo)),
      void 0 !== t.ItemControlInfo && (this.ItemControlInfo = new ty(t.ItemControlInfo)),
      void 0 !== t.IsPinnedItem && (this.IsPinnedItem = t.IsPinnedItem),
      void 0 !== t.KeywordTags && (this.KeywordTags = Array.isArray(t.KeywordTags) ? t.KeywordTags.map(function (e) {
        return new tG.M$.KeywordTag(e)
      }) : t.KeywordTags),
      void 0 !== t.AigcLabelType && (this.AigcLabelType = t.AigcLabelType),
      void 0 !== t.StatsV2 && (this.StatsV2 = new eC(t.StatsV2)),
      void 0 !== t.RepostList && (this.RepostList = Array.isArray(t.RepostList) ? t.RepostList.map(function (e) {
        return new Y(e)
      }) : t.RepostList),
      void 0 !== t.AIGCDescription && (this.AIGCDescription = t.AIGCDescription),
      void 0 !== t.BackendSourceEventTracking && (this.BackendSourceEventTracking = t.BackendSourceEventTracking),
      void 0 !== t.HasPromoteEntry && (this.HasPromoteEntry = t.HasPromoteEntry),
      void 0 !== t.ExploreCategory && (this.ExploreCategory = t.ExploreCategory),
      void 0 !== t.TextLanguage && (this.TextLanguage = t.TextLanguage),
      void 0 !== t.TextTranslatable && (this.TextTranslatable = t.TextTranslatable),
      void 0 !== t.TitleLanguage && (this.TitleLanguage = t.TitleLanguage),
      void 0 !== t.TitleTranslatable && (this.TitleTranslatable = t.TitleTranslatable),
      void 0 !== t.AnchorTypes && (this.AnchorTypes = t.AnchorTypes),
      void 0 !== t.AuthorStatsV2 && (this.AuthorStatsV2 = new j(t.AuthorStatsV2)),
      void 0 !== t.IsReviewing && (this.IsReviewing = t.IsReviewing),
      void 0 !== t.ModerationAigcLabelType && (this.ModerationAigcLabelType = t.ModerationAigcLabelType),
      void 0 !== t.EnterMdpPV && (this.EnterMdpPV = t.EnterMdpPV),
      void 0 !== t.CreatorAIComment && (this.CreatorAIComment = new tD(t.CreatorAIComment)),
      void 0 !== t.ContentClassificationReason && (this.ContentClassificationReason = t.ContentClassificationReason))
    }
    ,
    n.SubVideoMetaStruct = eN = function e(t) {
      (0,
          tU._)(this, e),
      t && void 0 !== t.IsAvailable && (this.IsAvailable = t.IsAvailable)
    }
    ,
    n.VideoSuggestWordsList = eU = function e(t) {
      (0,
          tU._)(this, e),
      t && void 0 !== t.VideoSuggestWords && (this.VideoSuggestWords = Array.isArray(t.VideoSuggestWords) ? t.VideoSuggestWords.map(function (e) {
        return new eb(e)
      }) : t.VideoSuggestWords)
    }
    ,
    n.VideoSuggestWordsStruct = eb = function e(t) {
      (0,
          tU._)(this, e),
      t && (void 0 !== t.Words && (this.Words = Array.isArray(t.Words) ? t.Words.map(function (e) {
        return new eF(e)
      }) : t.Words),
          this.Scene = t.Scene,
      void 0 !== t.HintText && (this.HintText = t.HintText),
      void 0 !== t.ExtraInfo && (this.ExtraInfo = t.ExtraInfo))
    }
    ,
    n.VideoSuggestWord = eF = function e(t) {
      (0,
          tU._)(this, e),
      t && (this.Word = t.Word,
          this.WordId = t.WordId,
      void 0 !== t.Info && (this.Info = t.Info))
    }
    ,
    n.ItemAnchorMTStruct = eG = function e(t) {
      (0,
          tU._)(this, e),
      t && (void 0 !== t.Id && (this.Id = t.Id),
          this.Type = t.Type,
      void 0 !== t.Keyword && (this.Keyword = t.Keyword),
      void 0 !== t.Url && (this.Url = t.Url),
      void 0 !== t.Icon && (this.Icon = new b(t.Icon)),
      void 0 !== t.Schema && (this.Schema = t.Schema),
      void 0 !== t.Language && (this.Language = t.Language),
      void 0 !== t.Extra && (this.Extra = t.Extra),
      void 0 !== t.DeepLink && (this.DeepLink = t.DeepLink),
      void 0 !== t.UniversalLink && (this.UniversalLink = t.UniversalLink),
      void 0 !== t.LogExtra && (this.LogExtra = t.LogExtra),
      void 0 !== t.Description && (this.Description = t.Description),
      void 0 !== t.Thumbnail && (this.Thumbnail = new b(t.Thumbnail)),
      void 0 !== t.ExtraInfo && (this.ExtraInfo = t.ExtraInfo))
    }
    ,
    n.PoiInfoStruct = ek = function e(t) {
      (0,
          tU._)(this, e),
      t && (void 0 !== t.PoiName && (this.PoiName = t.PoiName),
      void 0 !== t.AddressName && (this.AddressName = t.AddressName),
      void 0 !== t.CityName && (this.CityName = t.CityName),
      void 0 !== t.ProvinceName && (this.ProvinceName = t.ProvinceName),
      void 0 !== t.CountryName && (this.CountryName = t.CountryName),
      void 0 !== t.PoiID && (this.PoiID = t.PoiID),
      void 0 !== t.AreaLevel && (this.AreaLevel = t.AreaLevel),
      void 0 !== t.FatherPoiID && (this.FatherPoiID = t.FatherPoiID),
      void 0 !== t.FatherPoiName && (this.FatherPoiName = t.FatherPoiName),
      void 0 !== t.Type && (this.Type = t.Type),
      void 0 !== t.Category && (this.Category = t.Category),
      void 0 !== t.IndexEnabled && (this.IndexEnabled = t.IndexEnabled),
      void 0 !== t.IsCollected && (this.IsCollected = t.IsCollected),
      void 0 !== t.CityCode && (this.CityCode = t.CityCode),
      void 0 !== t.CountryCode && (this.CountryCode = t.CountryCode),
      void 0 !== t.IsClaimed && (this.IsClaimed = t.IsClaimed),
      void 0 !== t.TTTypeCode && (this.TTTypeCode = t.TTTypeCode),
      void 0 !== t.TypeCode && (this.TypeCode = t.TypeCode),
      void 0 !== t.TTTypeNameTiny && (this.TTTypeNameTiny = t.TTTypeNameTiny),
      void 0 !== t.TTTypeNameMedium && (this.TTTypeNameMedium = t.TTTypeNameMedium),
      void 0 !== t.TTTypeNameSuper && (this.TTTypeNameSuper = t.TTTypeNameSuper),
      void 0 !== t.AllLevelGeoPoiInfo && (this.AllLevelGeoPoiInfo = new tG.M$.AllLevelGeoPoiInfo(t.AllLevelGeoPoiInfo)),
      void 0 !== t.PictureAlbum && (this.PictureAlbum = new eV(t.PictureAlbum)),
      void 0 !== t.PoiReviewSummary && (this.PoiReviewSummary = new eW(t.PoiReviewSummary)),
      void 0 !== t.PoiHighlightTagModule && (this.PoiHighlightTagModule = new ex(t.PoiHighlightTagModule)),
      void 0 !== t.ChartTag && (this.ChartTag = new eK(t.ChartTag)),
      void 0 !== t.PoiDetailTags && (this.PoiDetailTags = Array.isArray(t.PoiDetailTags) ? t.PoiDetailTags.map(function (e) {
        return new eq(e)
      }) : t.PoiDetailTags),
      void 0 !== t.DistanceInfo && (this.DistanceInfo = new e$(t.DistanceInfo)),
      void 0 !== t.PhoneInfo && (this.PhoneInfo = new eQ(t.PhoneInfo)))
    }
    ,
    n.PictureAlbum = eV = function e(t) {
      (0,
          tU._)(this, e),
      t && (void 0 !== t.Pictures && (this.Pictures = Array.isArray(t.Pictures) ? t.Pictures.map(function (e) {
        return new b(e)
      }) : t.Pictures),
      void 0 !== t.TotalCount && (this.TotalCount = t.TotalCount))
    }
    ,
    n.PoiReviewSummary = eW = function e(t) {
      (0,
          tU._)(this, e),
      t && (void 0 !== t.TotalCount && (this.TotalCount = t.TotalCount),
      void 0 !== t.Score && (this.Score = t.Score),
      void 0 !== t.MaxScore && (this.MaxScore = t.MaxScore),
      void 0 !== t.NoRating && (this.NoRating = t.NoRating))
    }
    ,
    n.PoiHighlightTagModule = ex = function e(t) {
      (0,
          tU._)(this, e),
      t && void 0 !== t.IconTags && (this.IconTags = Array.isArray(t.IconTags) ? t.IconTags.map(function (e) {
        return new eH(e)
      }) : t.IconTags)
    }
    ,
    n.PoiIconTag = eH = function e(t) {
      (0,
          tU._)(this, e),
      t && (void 0 !== t.TagContent && (this.TagContent = t.TagContent),
      void 0 !== t.TagId && (this.TagId = t.TagId),
      void 0 !== t.Icon && (this.Icon = new eY(t.Icon)))
    }
    ,
    n.DynamicIcon = eY = function e(t) {
      (0,
          tU._)(this, e),
      t && (void 0 !== t.TuxToken && (this.TuxToken = t.TuxToken),
      void 0 !== t.ImageUrl && (this.ImageUrl = t.ImageUrl),
      void 0 !== t.DarkModeUrl && (this.DarkModeUrl = t.DarkModeUrl))
    }
    ,
    n.PoiDetailTag = eq = function e(t) {
      (0,
          tU._)(this, e),
      t && (this.TagType = t.TagType,
      void 0 !== t.Content && (this.Content = t.Content),
      void 0 !== t.PriceLevel && (this.PriceLevel = new ez(t.PriceLevel)))
    }
    ,
    n.PoiPriceLevel = ez = function e(t) {
      (0,
          tU._)(this, e),
      t && (void 0 !== t.actualLevel && (this.actualLevel = t.actualLevel),
      void 0 !== t.totalLevel && (this.totalLevel = t.totalLevel),
      void 0 !== t.currency && (this.currency = t.currency))
    }
    ,
    n.PoiChartTag = eK = function e(t) {
      (0,
          tU._)(this, e),
      t && void 0 !== t.ChartTopicName && (this.ChartTopicName = t.ChartTopicName)
    }
    ,
    n.PoiDistanceInfo = e$ = function e(t) {
      (0,
          tU._)(this, e),
      t && void 0 !== t.DistanceText && (this.DistanceText = t.DistanceText)
    }
    ,
    n.PoiPhoneInfo = eQ = function e(t) {
      (0,
          tU._)(this, e),
      t && void 0 !== t.Exist && (this.Exist = t.Exist)
    }
    ,
    n.ItemInfoStruct = ej = function e(t) {
      (0,
          tU._)(this, e),
      t && (this.ItemStruct = new eD(t.ItemStruct),
      void 0 !== t.SearchRecoWordList && (this.SearchRecoWordList = Array.isArray(t.SearchRecoWordList) ? t.SearchRecoWordList.map(function (e) {
        return new e9(e)
      }) : t.SearchRecoWordList))
    }
    ,
    n.ChallengeStatsStruct = eX = function e(t) {
      (0,
          tU._)(this, e),
      t && (this.VideoCount = t.VideoCount,
          this.ViewCount = t.ViewCount)
    }
    ,
    n.ChallengeStatsV2Struct = eZ = function e(t) {
      (0,
          tU._)(this, e),
      t && (this.VideoCount = t.VideoCount,
          this.ViewCount = t.ViewCount)
    }
    ,
    n.ChallengeAnnouncementStruct = eJ = function e(t) {
      (0,
          tU._)(this, e),
      t && (void 0 !== t.Body && (this.Body = t.Body),
      void 0 !== t.Title && (this.Title = t.Title))
    }
    ,
    n.ChallengeInfoStruct = e0 = function e(t) {
      (0,
          tU._)(this, e),
      t && (this.Challenge = new eg(t.Challenge),
          this.Stats = new eX(t.Stats),
      void 0 !== t.ItemList && (this.ItemList = Array.isArray(t.ItemList) ? t.ItemList.map(function (e) {
        return new eD(e)
      }) : t.ItemList),
      void 0 !== t.ChallengeAnnouncement && (this.ChallengeAnnouncement = new eJ(t.ChallengeAnnouncement)),
      void 0 !== t.StatsV2 && (this.StatsV2 = new eZ(t.StatsV2)))
    }
    ,
    n.CategoryStruct = e1 = function e(t) {
      (0,
          tU._)(this, e),
      t && (this.Id = t.Id,
          this.Title = t.Title)
    }
    ,
    n.CategoryInfoStruct = e2 = function e(t) {
      (0,
          tU._)(this, e),
      t && (this.Category = new e1(t.Category),
      void 0 !== t.ItemList && (this.ItemList = Array.isArray(t.ItemList) ? t.ItemList.map(function (e) {
        return new eD(e)
      }) : t.ItemList))
    }
    ,
    n.UserInfoStruct = e4 = function e(t) {
      (0,
          tU._)(this, e),
      t && (this.User = new Y(t.User),
          this.Stats = new Q(t.Stats),
      void 0 !== t.ItemList && (this.ItemList = Array.isArray(t.ItemList) ? t.ItemList.map(function (e) {
        return new eD(e)
      }) : t.ItemList),
      void 0 !== t.StatsV2 && (this.StatsV2 = new j(t.StatsV2)),
      void 0 !== t.UserRecommendInfo && (this.UserRecommendInfo = new e3(t.UserRecommendInfo)))
    }
    ,
    n.UserRecommendInfo = e3 = function e(t) {
      (0,
          tU._)(this, e),
      t && (this.RecType = t.RecType,
      void 0 !== t.CommonUserData && (this.CommonUserData = new e6(t.CommonUserData)))
    }
    ,
    n.CommonUserData = e6 = function e(t) {
      (0,
          tU._)(this, e),
      t && (this.MutualType = t.MutualType,
          this.TotalCount = t.TotalCount,
      void 0 !== t.MutualUsers && (this.MutualUsers = Array.isArray(t.MutualUsers) ? t.MutualUsers.map(function (e) {
        return new e5(e)
      }) : t.MutualUsers))
    }
    ,
    n.MutualUser = e5 = function e(t) {
      (0,
          tU._)(this, e),
      t && (this.AvatarMedium = new b(t.AvatarMedium))
    }
    ,
    n.MusicInfoStruct = e7 = function e(t) {
      (0,
          tU._)(this, e),
      t && (this.Music = new ev(t.Music),
      void 0 !== t.Author && (this.Author = new Y(t.Author)),
      void 0 !== t.Stats && (this.Stats = new eS(t.Stats)),
      void 0 !== t.ItemList && (this.ItemList = Array.isArray(t.ItemList) ? t.ItemList.map(function (e) {
        return new eD(e)
      }) : t.ItemList),
      void 0 !== t.Artist && (this.Artist = new Y(t.Artist)),
      void 0 !== t.Artists && (this.Artists = Array.isArray(t.Artists) ? t.Artists.map(function (e) {
        return new Y(e)
      }) : t.Artists))
    }
    ,
    n.SearchRecoWordStruct = e9 = function e(t) {
      (0,
          tU._)(this, e),
      t && (this.SearchRecoWord = t.SearchRecoWord,
      void 0 !== t.SearchRecoWordType && (this.SearchRecoWordType = t.SearchRecoWordType))
    }
    ,
    n.TrendingSearchWord = e8 = function e(t) {
      (0,
          tU._)(this, e),
      t && (this.trendingSearchWord = t.trendingSearchWord,
      void 0 !== t.trendingSearchWordType && (this.trendingSearchWordType = t.trendingSearchWordType))
    }
    ,
    n.MultiGetUserAndPostInfoRequest = function e(t) {
      (0,
          tU._)(this, e),
          this.needItemList = !0,
      t && (this.UserIds = t.UserIds,
      void 0 !== t.AppId && (this.AppId = t.AppId),
      void 0 !== t.Region && (this.Region = t.Region),
      void 0 !== t.Language && (this.Language = t.Language),
      void 0 !== t.needItemList && (this.needItemList = t.needItemList),
      void 0 !== t.scene && (this.scene = t.scene),
      void 0 !== t.Base && (this.Base = new tF.M$.Base(t.Base)))
    }
    ,
    n.MultiGetUserAndPostInfoResponse = function e(t) {
      (0,
          tU._)(this, e),
      t && (this.UserInfoList = Array.isArray(t.UserInfoList) ? t.UserInfoList.map(function (e) {
        return new e4(e)
      }) : t.UserInfoList,
      void 0 !== t.BaseResp && (this.BaseResp = new tF.M$.BaseResp(t.BaseResp)))
    }
    ,
    n.MultiGetUserRequest = function e(t) {
      (0,
          tU._)(this, e),
      t && (this.UserIds = t.UserIds,
      void 0 !== t.AppId && (this.AppId = t.AppId),
      void 0 !== t.scene && (this.scene = t.scene),
      void 0 !== t.Base && (this.Base = new tF.M$.Base(t.Base)))
    }
    ,
    n.MultiGetUserResponse = function e(t) {
      (0,
          tU._)(this, e),
      t && (this.UserInfoList = Array.isArray(t.UserInfoList) ? t.UserInfoList.map(function (e) {
        return new e4(e)
      }) : t.UserInfoList,
      void 0 !== t.BaseResp && (this.BaseResp = new tF.M$.BaseResp(t.BaseResp)))
    }
    ,
    n.MultiGetMusicAndPostInfoRequest = function e(t) {
      (0,
          tU._)(this, e),
          this.needItemList = !0,
      t && (this.MusicIds = t.MusicIds,
      void 0 !== t.AppId && (this.AppId = t.AppId),
      void 0 !== t.Region && (this.Region = t.Region),
      void 0 !== t.Language && (this.Language = t.Language),
      void 0 !== t.needItemList && (this.needItemList = t.needItemList),
      void 0 !== t.Base && (this.Base = new tF.M$.Base(t.Base)))
    }
    ,
    n.MultiGetMusicAndPostInfoResponse = function e(t) {
      (0,
          tU._)(this, e),
      t && (this.MusicInfoList = Array.isArray(t.MusicInfoList) ? t.MusicInfoList.map(function (e) {
        return new e7(e)
      }) : t.MusicInfoList,
      void 0 !== t.BaseResp && (this.BaseResp = new tF.M$.BaseResp(t.BaseResp)))
    }
    ,
    n.MultiGetChallengeAndPostInfoRequest = function e(t) {
      (0,
          tU._)(this, e),
          this.needItemList = !0,
      t && (this.ChallengeIds = t.ChallengeIds,
      void 0 !== t.AppId && (this.AppId = t.AppId),
      void 0 !== t.Region && (this.Region = t.Region),
      void 0 !== t.Language && (this.Language = t.Language),
      void 0 !== t.needItemList && (this.needItemList = t.needItemList),
      void 0 !== t.Base && (this.Base = new tF.M$.Base(t.Base)))
    }
    ,
    n.MultiGetChallengeAndPostInfoResponse = function e(t) {
      (0,
          tU._)(this, e),
      t && (this.ChallengeInfoList = Array.isArray(t.ChallengeInfoList) ? t.ChallengeInfoList.map(function (e) {
        return new e0(e)
      }) : t.ChallengeInfoList,
      void 0 !== t.BaseResp && (this.BaseResp = new tF.M$.BaseResp(t.BaseResp)))
    }
    ,
    n.GetAMPChallengeAndPostInfoRequest = function e(t) {
      (0,
          tU._)(this, e),
      t && (void 0 !== t.ChallengeId && (this.ChallengeId = t.ChallengeId),
      void 0 !== t.AppId && (this.AppId = t.AppId),
      void 0 !== t.Region && (this.Region = t.Region),
      void 0 !== t.Language && (this.Language = t.Language),
      void 0 !== t.ChallengeName && (this.ChallengeName = t.ChallengeName),
      void 0 !== t.Scene && (this.Scene = t.Scene),
      void 0 !== t.Base && (this.Base = new tF.M$.Base(t.Base)))
    }
    ,
    n.GetAMPChallengeAndPostInfoResponse = function e(t) {
      (0,
          tU._)(this, e),
      t && (void 0 !== t.ChallengeInfo && (this.ChallengeInfo = new e0(t.ChallengeInfo)),
      void 0 !== t.BaseResp && (this.BaseResp = new tF.M$.BaseResp(t.BaseResp)))
    }
    ,
    n.GetExploreHotIdsRequest = function e(t) {
      (0,
          tU._)(this, e),
      t && (this.type = t.type,
          this.offset = t.offset,
          this.count = t.count,
      void 0 !== t.region && (this.region = t.region),
      void 0 !== t.lang && (this.lang = t.lang),
      void 0 !== t.appId && (this.appId = t.appId),
      void 0 !== t.provinceId && (this.provinceId = t.provinceId),
      void 0 !== t.Extra && (this.Extra = t.Extra),
      void 0 !== t.Base && (this.Base = new tF.M$.Base(t.Base)))
    }
    ,
    n.GetExploreHotIdsResponse = function e(t) {
      (0,
          tU._)(this, e),
      t && (void 0 !== t.ids && (this.ids = t.ids),
      void 0 !== t.offset && (this.offset = t.offset),
          this.hasMore = t.hasMore,
      void 0 !== t.BaseResp && (this.BaseResp = new tF.M$.BaseResp(t.BaseResp)))
    }
    ,
    n.GetRelatedIdsRequest = function e(t) {
      (0,
          tU._)(this, e),
      t && (this.type = t.type,
          this.offset = t.offset,
          this.count = t.count,
          this.keyword = t.keyword,
          this.region = t.region,
      void 0 !== t.Base && (this.Base = new tF.M$.Base(t.Base)))
    }
    ,
    n.GetRelatedIdsResponse = function e(t) {
      (0,
          tU._)(this, e),
      t && (this.ids = t.ids,
          this.offset = t.offset,
          this.hasMore = t.hasMore,
      void 0 !== t.BaseResp && (this.BaseResp = new tF.M$.BaseResp(t.BaseResp)))
    }
    ,
    n.GetMusicDiscoverRequest = function e(t) {
      (0,
          tU._)(this, e),
      t && (this.count = t.count,
          this.offset = t.offset,
          this.region = t.region,
      void 0 !== t.Language && (this.Language = t.Language),
      void 0 !== t.appId && (this.appId = t.appId),
          this.needItemList = t.needItemList,
          this.discoverType = t.discoverType,
          this.keyWord = t.keyWord,
      void 0 !== t.extraIds && (this.extraIds = t.extraIds),
      void 0 !== t.scene && (this.scene = t.scene),
      void 0 !== t.Base && (this.Base = new tF.M$.Base(t.Base)))
    }
    ,
    n.GetMusicDiscoverResponse = function e(t) {
      (0,
          tU._)(this, e),
      t && (this.MusicInfoList = Array.isArray(t.MusicInfoList) ? t.MusicInfoList.map(function (e) {
        return new e7(e)
      }) : t.MusicInfoList,
          this.offset = t.offset,
      void 0 !== t.ExtraMusicInfoList && (this.ExtraMusicInfoList = Array.isArray(t.ExtraMusicInfoList) ? t.ExtraMusicInfoList.map(function (e) {
        return new e7(e)
      }) : t.ExtraMusicInfoList),
      void 0 !== t.BaseResp && (this.BaseResp = new tF.M$.BaseResp(t.BaseResp)))
    }
    ,
    n.GetUserDiscoverRequest = function e(t) {
      (0,
          tU._)(this, e),
      t && (this.count = t.count,
          this.offset = t.offset,
          this.region = t.region,
      void 0 !== t.Language && (this.Language = t.Language),
      void 0 !== t.appId && (this.appId = t.appId),
          this.needItemList = t.needItemList,
          this.discoverType = t.discoverType,
          this.keyWord = t.keyWord,
          this.useRecommend = t.useRecommend,
      void 0 !== t.targetUserId && (this.targetUserId = t.targetUserId),
      void 0 !== t.visitUserId && (this.visitUserId = t.visitUserId),
      void 0 !== t.scene && (this.scene = t.scene),
      void 0 !== t.Extra && (this.Extra = t.Extra),
      void 0 !== t.extraIds && (this.extraIds = t.extraIds),
      void 0 !== t.Base && (this.Base = new tF.M$.Base(t.Base)))
    }
    ,
    n.GetUserDiscoverResponse = function e(t) {
      (0,
          tU._)(this, e),
      t && (this.UserInfoList = Array.isArray(t.UserInfoList) ? t.UserInfoList.map(function (e) {
        return new e4(e)
      }) : t.UserInfoList,
          this.offset = t.offset,
      void 0 !== t.ExtraUserInfoList && (this.ExtraUserInfoList = Array.isArray(t.ExtraUserInfoList) ? t.ExtraUserInfoList.map(function (e) {
        return new e4(e)
      }) : t.ExtraUserInfoList),
      void 0 !== t.BaseResp && (this.BaseResp = new tF.M$.BaseResp(t.BaseResp)))
    }
    ,
    n.GetChallengeDiscoverRequest = function e(t) {
      (0,
          tU._)(this, e),
      t && (this.count = t.count,
          this.offset = t.offset,
          this.region = t.region,
      void 0 !== t.Language && (this.Language = t.Language),
      void 0 !== t.appId && (this.appId = t.appId),
          this.needItemList = t.needItemList,
          this.discoverType = t.discoverType,
          this.keyWord = t.keyWord,
      void 0 !== t.provinceId && (this.provinceId = t.provinceId),
      void 0 !== t.scene && (this.scene = t.scene),
      void 0 !== t.extraIds && (this.extraIds = t.extraIds),
      void 0 !== t.Base && (this.Base = new tF.M$.Base(t.Base)))
    }
    ,
    n.GetChallengeDiscoverResponse = function e(t) {
      (0,
          tU._)(this, e),
      t && (this.ChallengeInfoList = Array.isArray(t.ChallengeInfoList) ? t.ChallengeInfoList.map(function (e) {
        return new e0(e)
      }) : t.ChallengeInfoList,
          this.offset = t.offset,
      void 0 !== t.ExtraChallengeInfoList && (this.ExtraChallengeInfoList = Array.isArray(t.ExtraChallengeInfoList) ? t.ExtraChallengeInfoList.map(function (e) {
        return new e0(e)
      }) : t.ExtraChallengeInfoList),
      void 0 !== t.BaseResp && (this.BaseResp = new tF.M$.BaseResp(t.BaseResp)))
    }
    ,
    n.GetCategoryDiscoverRequest = function e(t) {
      (0,
          tU._)(this, e),
      t && (this.region = t.region,
      void 0 !== t.Language && (this.Language = t.Language),
      void 0 !== t.appId && (this.appId = t.appId),
      void 0 !== t.Base && (this.Base = new tF.M$.Base(t.Base)))
    }
    ,
    n.GetCategoryDiscoverResponse = function e(t) {
      (0,
          tU._)(this, e),
      t && (this.CategoryInfoList = Array.isArray(t.CategoryInfoList) ? t.CategoryInfoList.map(function (e) {
        return new e2(e)
      }) : t.CategoryInfoList,
      void 0 !== t.BaseResp && (this.BaseResp = new tF.M$.BaseResp(t.BaseResp)))
    }
    ,
    n.GetCreatorItemListRequest = function e(t) {
      (0,
          tU._)(this, e),
      t && (this.CreatorId = t.CreatorId,
          this.Cursor = t.Cursor,
          this.Count = t.Count,
      void 0 !== t.AppId && (this.AppId = t.AppId),
      void 0 !== t.Region && (this.Region = t.Region),
      void 0 !== t.SecUid && (this.SecUid = t.SecUid),
      void 0 !== t.creatorItemListFetchType && (this.creatorItemListFetchType = t.creatorItemListFetchType),
      void 0 !== t.language && (this.language = t.language),
      void 0 !== t.Extra && (this.Extra = t.Extra),
      void 0 !== t.Base && (this.Base = new tF.M$.Base(t.Base)))
    }
    ,
    n.GetCreatorItemListResponse = function e(t) {
      (0,
          tU._)(this, e),
          this.MaxCursor = "0",
          this.MinCursor = "0",
      t && (this.Items = Array.isArray(t.Items) ? t.Items.map(function (e) {
        return new eD(e)
      }) : t.Items,
      void 0 !== t.hasMoreCreatorItemsPrevious && (this.hasMoreCreatorItemsPrevious = t.hasMoreCreatorItemsPrevious),
      void 0 !== t.hasMoreCreatorItemsLatest && (this.hasMoreCreatorItemsLatest = t.hasMoreCreatorItemsLatest),
      void 0 !== t.MaxCursor && (this.MaxCursor = t.MaxCursor),
      void 0 !== t.MinCursor && (this.MinCursor = t.MinCursor),
      void 0 !== t.BaseResp && (this.BaseResp = new tF.M$.BaseResp(t.BaseResp)))
    }
    ,
    n.GetItemListRequest = function e(t) {
      (0,
          tU._)(this, e),
      t && (void 0 !== t.Type && (this.Type = t.Type),
          this.Id = t.Id,
          this.MaxCursor = t.MaxCursor,
          this.MinCursor = t.MinCursor,
          this.Count = t.Count,
      void 0 !== t.AppId && (this.AppId = t.AppId),
      void 0 !== t.Region && (this.Region = t.Region),
      void 0 !== t.Extra && (this.Extra = t.Extra),
      void 0 !== t.FilterLevel && (this.FilterLevel = t.FilterLevel),
      void 0 !== t.FilterItemIds && (this.FilterItemIds = t.FilterItemIds),
      void 0 !== t.SecUid && (this.SecUid = t.SecUid),
          this.Source = t.Source,
      void 0 !== t.Language && (this.Language = t.Language),
      void 0 !== t.PullType && (this.PullType = t.PullType),
      void 0 !== t.Level && (this.Level = t.Level),
      void 0 !== t.CommonParam && (this.CommonParam = new tG.M$.WebCommonParam(t.CommonParam)),
      void 0 !== t.Topic && (this.Topic = t.Topic),
      void 0 !== t.ClientABVersions && (this.ClientABVersions = t.ClientABVersions),
      void 0 !== t.ShowAds && (this.ShowAds = t.ShowAds),
      void 0 !== t.WebIdLastTime && (this.WebIdLastTime = t.WebIdLastTime),
      void 0 !== t.IsResetCounterUsed && (this.IsResetCounterUsed = t.IsResetCounterUsed),
      void 0 !== t.PostItemType && (this.PostItemType = t.PostItemType),
      void 0 !== t.ExploreCategory && (this.ExploreCategory = t.ExploreCategory),
      void 0 !== t.CoverFormat && (this.CoverFormat = t.CoverFormat),
      void 0 !== t.IsNonPersonalized && (this.IsNonPersonalized = t.IsNonPersonalized),
      void 0 !== t.WatchLiveLastTime && (this.WatchLiveLastTime = t.WatchLiveLastTime),
      void 0 !== t.NeedPinnedItemIds && (this.NeedPinnedItemIds = t.NeedPinnedItemIds),
      void 0 !== t.UseSati && (this.UseSati = t.UseSati),
      void 0 !== t.PriorityRegion && (this.PriorityRegion = t.PriorityRegion),
      void 0 !== t.PostItemListRequestType && (this.PostItemListRequestType = t.PostItemListRequestType),
      void 0 !== t.LocateItemID && (this.LocateItemID = t.LocateItemID),
      void 0 !== t.VideoViewCount && (this.VideoViewCount = t.VideoViewCount),
      void 0 !== t.DisableImpression && (this.DisableImpression = t.DisableImpression),
      void 0 !== t.EnableCache && (this.EnableCache = t.EnableCache),
      void 0 !== t.IsPrefetch && (this.IsPrefetch = t.IsPrefetch),
      void 0 !== t.PrefetchTTL && (this.PrefetchTTL = t.PrefetchTTL),
      void 0 !== t.Base && (this.Base = new tF.M$.Base(t.Base)))
    }
    ,
    n.GetPreloadItemListRequest = function e(t) {
      (0,
          tU._)(this, e),
      t && (this.Count = t.Count,
      void 0 !== t.Region && (this.Region = t.Region),
      void 0 !== t.Language && (this.Language = t.Language),
      void 0 !== t.UserAgent && (this.UserAgent = t.UserAgent),
      void 0 !== t.CoverFormat && (this.CoverFormat = t.CoverFormat),
      void 0 !== t.IsNonPersonalized && (this.IsNonPersonalized = t.IsNonPersonalized),
      void 0 !== t.CommonParam && (this.CommonParam = new tG.M$.WebCommonParam(t.CommonParam)),
      void 0 !== t.VideoViewCount && (this.VideoViewCount = t.VideoViewCount),
      void 0 !== t.webIdLastTime && (this.webIdLastTime = t.webIdLastTime),
      void 0 !== t.Extra && (this.Extra = t.Extra),
      void 0 !== t.ClientABVersions && (this.ClientABVersions = t.ClientABVersions),
      void 0 !== t.Base && (this.Base = new tF.M$.Base(t.Base)))
    }
    ,
    n.GetPreloadItemListResponse = function e(t) {
      (0,
          tU._)(this, e),
      t && (void 0 !== t.Items && (this.Items = Array.isArray(t.Items) ? t.Items.map(function (e) {
        return new eD(e)
      }) : t.Items),
      void 0 !== t.BaseResp && (this.BaseResp = new tF.M$.BaseResp(t.BaseResp)))
    }
    ,
    n.ABParams = te = function e(t) {
      (0,
          tU._)(this, e),
      t && void 0 !== t.ExpIds && (this.ExpIds = t.ExpIds)
    }
    ,
    n.GetItemListResponse = function e(t) {
      (0,
          tU._)(this, e),
          this.HasMore = !1,
          this.MaxCursor = "0",
          this.MinCursor = "0",
      t && (this.Items = Array.isArray(t.Items) ? t.Items.map(function (e) {
        return new eD(e)
      }) : t.Items,
      void 0 !== t.HasMore && (this.HasMore = t.HasMore),
      void 0 !== t.MaxCursor && (this.MaxCursor = t.MaxCursor),
      void 0 !== t.MinCursor && (this.MinCursor = t.MinCursor),
      void 0 !== t.ABPrams && (this.ABPrams = new te(t.ABPrams)),
      void 0 !== t.Level && (this.Level = t.Level),
      void 0 !== t.ReferralList && (this.ReferralList = Array.isArray(t.ReferralList) ? t.ReferralList.map(function (e) {
        return new eD(e)
      }) : t.ReferralList),
      void 0 !== t.AdsOffset && (this.AdsOffset = t.AdsOffset),
      void 0 !== t.LiveCardDisplay && (this.LiveCardDisplay = t.LiveCardDisplay),
      void 0 !== t.HasLocateItemID && (this.HasLocateItemID = t.HasLocateItemID),
      void 0 !== t.CollectTotalCount && (this.CollectTotalCount = t.CollectTotalCount),
      void 0 !== t.FilterReasons && (this.FilterReasons = new tt(t.FilterReasons)),
      void 0 !== t.BaseResp && (this.BaseResp = new tF.M$.BaseResp(t.BaseResp)))
    }
    ,
    n.FilterReasonsStruct = tt = function e(t) {
      (0,
          tU._)(this, e),
      t && void 0 !== t.FilterReasons && (this.FilterReasons = t.FilterReasons)
    }
    ,
    n.GetUserListRequest = function e(t) {
      (0,
          tU._)(this, e),
      t && (this.Scene = t.Scene,
          this.AppId = t.AppId,
      void 0 !== t.Language && (this.Language = t.Language),
      void 0 !== t.Region && (this.Region = t.Region),
      void 0 !== t.Count && (this.Count = t.Count),
      void 0 !== t.MaxCursor && (this.MaxCursor = t.MaxCursor),
      void 0 !== t.MinCursor && (this.MinCursor = t.MinCursor),
      void 0 !== t.UserID && (this.UserID = t.UserID),
      void 0 !== t.IsNonPersonalized && (this.IsNonPersonalized = t.IsNonPersonalized),
      void 0 !== t.TargetUserId && (this.TargetUserId = t.TargetUserId),
      void 0 !== t.Base && (this.Base = new tF.M$.Base(t.Base)))
    }
    ,
    n.GetUserListResponse = function e(t) {
      (0,
          tU._)(this, e),
      t && (this.UserList = Array.isArray(t.UserList) ? t.UserList.map(function (e) {
        return new e4(e)
      }) : t.UserList,
      void 0 !== t.MaxCursor && (this.MaxCursor = t.MaxCursor),
      void 0 !== t.MinCursor && (this.MinCursor = t.MinCursor),
      void 0 !== t.Total && (this.Total = t.Total),
      void 0 !== t.HasMore && (this.HasMore = t.HasMore),
      void 0 !== t.IsTruncated && (this.IsTruncated = t.IsTruncated),
      void 0 !== t.BaseResp && (this.BaseResp = new tF.M$.BaseResp(t.BaseResp)))
    }
    ,
    n.GetUserMusicListRequest = function e(t) {
      (0,
          tU._)(this, e),
      t && (this.UserId = t.UserId,
          this.Count = t.Count,
          this.Cursor = t.Cursor,
          this.AppId = t.AppId,
      void 0 !== t.Region && (this.Region = t.Region),
      void 0 !== t.Type && (this.Type = t.Type),
      void 0 !== t.Base && (this.Base = new tF.M$.Base(t.Base)))
    }
    ,
    n.GetUserMusicListResponse = function e(t) {
      (0,
          tU._)(this, e),
      t && (void 0 !== t.MusicList && (this.MusicList = Array.isArray(t.MusicList) ? t.MusicList.map(function (e) {
        return new e7(e)
      }) : t.MusicList),
      void 0 !== t.Cursor && (this.Cursor = t.Cursor),
      void 0 !== t.HasMore && (this.HasMore = t.HasMore),
      void 0 !== t.BaseResp && (this.BaseResp = new tF.M$.BaseResp(t.BaseResp)))
    }
    ,
    n.GetItemInfoRequest = function e(t) {
      (0,
          tU._)(this, e),
      t && (this.ItemID = t.ItemID,
      void 0 !== t.UCode && (this.UCode = t.UCode),
      void 0 !== t.AppID && (this.AppID = t.AppID),
      void 0 !== t.Region && (this.Region = t.Region),
      void 0 !== t.Language && (this.Language = t.Language),
      void 0 !== t.Scene && (this.Scene = t.Scene),
      void 0 !== t.Extra && (this.Extra = t.Extra),
      void 0 !== t.CoverFormat && (this.CoverFormat = t.CoverFormat),
      void 0 !== t.ClientABVersions && (this.ClientABVersions = t.ClientABVersions),
      void 0 !== t.Base && (this.Base = new tF.M$.Base(t.Base)))
    }
    ,
    n.GetItemInfoResponse = function e(t) {
      (0,
          tU._)(this, e),
      t && (void 0 !== t.ItemInfo && (this.ItemInfo = new ej(t.ItemInfo)),
      void 0 !== t.ShareUser && (this.ShareUser = new Y(t.ShareUser)),
      void 0 !== t.ShareMeta && (this.ShareMeta = new z(t.ShareMeta)),
      void 0 !== t.BaseResp && (this.BaseResp = new tF.M$.BaseResp(t.BaseResp)))
    }
    ,
    n.GetItemAvailabilityRequest = function e(t) {
      (0,
          tU._)(this, e),
      t && (this.ItemIds = t.ItemIds,
      void 0 !== t.Region && (this.Region = t.Region),
      void 0 !== t.Base && (this.Base = new tF.M$.Base(t.Base)))
    }
    ,
    n.ItemAvailability = ti = function e(t) {
      (0,
          tU._)(this, e),
      t && (this.Id = t.Id,
          this.Available = t.Available)
    }
    ,
    n.GetItemAvailabilityResponse = function e(t) {
      (0,
          tU._)(this, e),
      t && (void 0 !== t.ItemAvailabilities && (this.ItemAvailabilities = Array.isArray(t.ItemAvailabilities) ? t.ItemAvailabilities.map(function (e) {
        return new ti(e)
      }) : t.ItemAvailabilities),
      void 0 !== t.BaseResp && (this.BaseResp = new tF.M$.BaseResp(t.BaseResp)))
    }
    ,
    n.CollectMusicRequest = function e(t) {
      (0,
          tU._)(this, e),
      t && (this.AppID = t.AppID,
          this.MusicID = t.MusicID,
          this.Action = t.Action,
          this.Region = t.Region,
      void 0 !== t.Base && (this.Base = new tF.M$.Base(t.Base)))
    }
    ,
    n.CollectMusicResponse = function e(t) {
      (0,
          tU._)(this, e),
      t && void 0 !== t.BaseResp && (this.BaseResp = new tF.M$.BaseResp(t.BaseResp))
    }
    ,
    n.GetEmbedItemInfoRequest = function e(t) {
      (0,
          tU._)(this, e),
      t && (this.ItemID = t.ItemID,
      void 0 !== t.AppID && (this.AppID = t.AppID),
      void 0 !== t.Region && (this.Region = t.Region),
      void 0 !== t.Language && (this.Language = t.Language),
      void 0 !== t.Base && (this.Base = new tF.M$.Base(t.Base)))
    }
    ,
    n.GetEmbedItemInfoResponse = function e(t) {
      (0,
          tU._)(this, e),
      t && (void 0 !== t.ItemInfo && (this.ItemInfo = new ej(t.ItemInfo)),
      void 0 !== t.BaseResp && (this.BaseResp = new tF.M$.BaseResp(t.BaseResp)))
    }
    ,
    n.MultiGetItemRequest = function e(t) {
      (0,
          tU._)(this, e),
      t && (this.ItemIds = t.ItemIds,
      void 0 !== t.AppId && (this.AppId = t.AppId),
      void 0 !== t.Region && (this.Region = t.Region),
      void 0 !== t.Language && (this.Language = t.Language),
      void 0 !== t.Scene && (this.Scene = t.Scene),
      void 0 !== t.CoverFormat && (this.CoverFormat = t.CoverFormat),
      void 0 !== t.Base && (this.Base = new tF.M$.Base(t.Base)))
    }
    ,
    n.MultiGetItemResponse = function e(t) {
      (0,
          tU._)(this, e),
      t && (this.ItemInfo = Array.isArray(t.ItemInfo) ? t.ItemInfo.map(function (e) {
        return new eD(e)
      }) : t.ItemInfo,
      void 0 !== t.BaseResp && (this.BaseResp = new tF.M$.BaseResp(t.BaseResp)))
    }
    ,
    n.GetUserInfoRequest = function e(t) {
      (0,
          tU._)(this, e),
      t && (void 0 !== t.UserID && (this.UserID = t.UserID),
      void 0 !== t.UCode && (this.UCode = t.UCode),
      void 0 !== t.AppID && (this.AppID = t.AppID),
      void 0 !== t.Region && (this.Region = t.Region),
      void 0 !== t.Language && (this.Language = t.Language),
      void 0 !== t.SecUID && (this.SecUID = t.SecUID),
      void 0 !== t.UniqueID && (this.UniqueID = t.UniqueID),
      void 0 !== t.Scene && (this.Scene = t.Scene),
      void 0 !== t.Extra && (this.Extra = t.Extra),
      void 0 !== t.SessionId && (this.SessionId = t.SessionId),
      void 0 !== t.NeedAudienceControl && (this.NeedAudienceControl = t.NeedAudienceControl),
      void 0 !== t.Base && (this.Base = new tF.M$.Base(t.Base)))
    }
    ,
    n.GetUserInfoResponse = function e(t) {
      (0,
          tU._)(this, e),
      t && (void 0 !== t.UserInfo && (this.UserInfo = new e4(t.UserInfo)),
      void 0 !== t.ShareUser && (this.ShareUser = new Y(t.ShareUser)),
      void 0 !== t.ShareMeta && (this.ShareMeta = new z(t.ShareMeta)),
      void 0 !== t.BaseResp && (this.BaseResp = new tF.M$.BaseResp(t.BaseResp)))
    }
    ,
    n.GetMusicInfoRequest = function e(t) {
      (0,
          tU._)(this, e),
      t && (this.MusicID = t.MusicID,
      void 0 !== t.UCode && (this.UCode = t.UCode),
      void 0 !== t.AppID && (this.AppID = t.AppID),
      void 0 !== t.Region && (this.Region = t.Region),
      void 0 !== t.Language && (this.Language = t.Language),
      void 0 !== t.Scene && (this.Scene = t.Scene),
      void 0 !== t.Base && (this.Base = new tF.M$.Base(t.Base)))
    }
    ,
    n.GetMusicInfoResponse = function e(t) {
      (0,
          tU._)(this, e),
      t && (void 0 !== t.MusicInfo && (this.MusicInfo = new e7(t.MusicInfo)),
      void 0 !== t.ShareUser && (this.ShareUser = new Y(t.ShareUser)),
      void 0 !== t.ShareMeta && (this.ShareMeta = new z(t.ShareMeta)),
      void 0 !== t.BaseResp && (this.BaseResp = new tF.M$.BaseResp(t.BaseResp)))
    }
    ,
    n.GetStickerInfoRequest = function e(t) {
      (0,
          tU._)(this, e),
      t && (this.StickerID = t.StickerID,
      void 0 !== t.UCode && (this.UCode = t.UCode),
      void 0 !== t.AppID && (this.AppID = t.AppID),
      void 0 !== t.Region && (this.Region = t.Region),
      void 0 !== t.Language && (this.Language = t.Language),
      void 0 !== t.Scene && (this.Scene = t.Scene),
      void 0 !== t.Base && (this.Base = new tF.M$.Base(t.Base)))
    }
    ,
    n.GetStickerInfoResponse = function e(t) {
      (0,
          tU._)(this, e),
      t && (void 0 !== t.StickerInfo && (this.StickerInfo = new e_(t.StickerInfo)),
      void 0 !== t.ShareUser && (this.ShareUser = new Y(t.ShareUser)),
      void 0 !== t.ShareMeta && (this.ShareMeta = new z(t.ShareMeta)),
      void 0 !== t.BaseResp && (this.BaseResp = new tF.M$.BaseResp(t.BaseResp)))
    }
    ,
    n.GetLiveInfoRequest = function e(t) {
      (0,
          tU._)(this, e),
      t && (this.RoomID = t.RoomID,
      void 0 !== t.UCode && (this.UCode = t.UCode),
      void 0 !== t.AppID && (this.AppID = t.AppID),
      void 0 !== t.Region && (this.Region = t.Region),
      void 0 !== t.Language && (this.Language = t.Language),
      void 0 !== t.Scene && (this.Scene = t.Scene),
      void 0 !== t.Base && (this.Base = new tF.M$.Base(t.Base)))
    }
    ,
    n.GetLiveInfoResponse = function e(t) {
      (0,
          tU._)(this, e),
      t && (void 0 !== t.LiveRoomInfo && (this.LiveRoomInfo = new X(t.LiveRoomInfo)),
      void 0 !== t.ShareUser && (this.ShareUser = new Y(t.ShareUser)),
      void 0 !== t.ShareMeta && (this.ShareMeta = new z(t.ShareMeta)),
      void 0 !== t.BaseResp && (this.BaseResp = new tF.M$.BaseResp(t.BaseResp)))
    }
    ,
    n.GetChallengeInfoRequest = function e(t) {
      (0,
          tU._)(this, e),
      t && (this.ChallengeID = t.ChallengeID,
      void 0 !== t.UCode && (this.UCode = t.UCode),
      void 0 !== t.AppID && (this.AppID = t.AppID),
      void 0 !== t.Region && (this.Region = t.Region),
      void 0 !== t.ChallengeName && (this.ChallengeName = t.ChallengeName),
      void 0 !== t.Language && (this.Language = t.Language),
      void 0 !== t.Scene && (this.Scene = t.Scene),
      void 0 !== t.Base && (this.Base = new tF.M$.Base(t.Base)))
    }
    ,
    n.GetChallengeInfoResponse = function e(t) {
      (0,
          tU._)(this, e),
      t && (void 0 !== t.ChallengeInfo && (this.ChallengeInfo = new e0(t.ChallengeInfo)),
      void 0 !== t.ShareUser && (this.ShareUser = new Y(t.ShareUser)),
      void 0 !== t.ShareMeta && (this.ShareMeta = new z(t.ShareMeta)),
      void 0 !== t.BaseResp && (this.BaseResp = new tF.M$.BaseResp(t.BaseResp)))
    }
    ,
    n.GetRelatedChallengeListRequest = function e(t) {
      (0,
          tU._)(this, e),
      t && (this.Id = t.Id,
          this.Count = t.Count,
      void 0 !== t.AppId && (this.AppId = t.AppId),
      void 0 !== t.Region && (this.Region = t.Region),
          this.Source = t.Source,
      void 0 !== t.Extra && (this.Extra = t.Extra),
      void 0 !== t.Base && (this.Base = new tF.M$.Base(t.Base)))
    }
    ,
    n.GetRelatedChallengeListResponse = function e(t) {
      (0,
          tU._)(this, e),
      t && (this.ChallengeInfoList = Array.isArray(t.ChallengeInfoList) ? t.ChallengeInfoList.map(function (e) {
        return new e0(e)
      }) : t.ChallengeInfoList,
      void 0 !== t.BaseResp && (this.BaseResp = new tF.M$.BaseResp(t.BaseResp)))
    }
    ,
    n.GetChatInfoRequest = function e(t) {
      (0,
          tU._)(this, e),
      t && (void 0 !== t.Region && (this.Region = t.Region),
      void 0 !== t.Language && (this.Language = t.Language),
      void 0 !== t.AppId && (this.AppId = t.AppId),
      void 0 !== t.scene && (this.scene = t.scene),
      void 0 !== t.ChatName && (this.ChatName = t.ChatName),
      void 0 !== t.ChatAvatarKey && (this.ChatAvatarKey = t.ChatAvatarKey),
      void 0 !== t.Base && (this.Base = new tF.M$.Base(t.Base)))
    }
    ,
    n.GetChatInfoResponse = function e(t) {
      (0,
          tU._)(this, e),
      t && (void 0 !== t.ShareMeta && (this.ShareMeta = new z(t.ShareMeta)),
      void 0 !== t.BaseResp && (this.BaseResp = new tF.M$.BaseResp(t.BaseResp)))
    }
    ,
    n.TrendingStruct = tn = function e(t) {
      (0,
          tU._)(this, e),
      t && (this.trendingType = t.trendingType,
      void 0 !== t.challenge_info && (this.challenge_info = new e0(t.challenge_info)))
    }
    ,
    n.GetTrendingDiscoverRequest = function e(t) {
      (0,
          tU._)(this, e),
      t && (this.count = t.count,
          this.offset = t.offset,
          this.region = t.region,
      void 0 !== t.Language && (this.Language = t.Language),
      void 0 !== t.appId && (this.appId = t.appId),
      void 0 !== t.Base && (this.Base = new tF.M$.Base(t.Base)))
    }
    ,
    n.GetTrendingDiscoverResponse = function e(t) {
      (0,
          tU._)(this, e),
      t && (this.TrendingList = Array.isArray(t.TrendingList) ? t.TrendingList.map(function (e) {
        return new tn(e)
      }) : t.TrendingList,
      void 0 !== t.offset && (this.offset = t.offset),
      void 0 !== t.hasMore && (this.hasMore = t.hasMore),
      void 0 !== t.BaseResp && (this.BaseResp = new tF.M$.BaseResp(t.BaseResp)))
    }
    ,
    n.GetQuestionInfoRequest = function e(t) {
      (0,
          tU._)(this, e),
      t && (this.QuestionID = t.QuestionID,
      void 0 !== t.UCode && (this.UCode = t.UCode),
      void 0 !== t.AppID && (this.AppID = t.AppID),
      void 0 !== t.Language && (this.Language = t.Language),
      void 0 !== t.Scene && (this.Scene = t.Scene),
      void 0 !== t.Region && (this.Region = t.Region),
      void 0 !== t.Base && (this.Base = new tF.M$.Base(t.Base)))
    }
    ,
    n.QuestionInfoStruct = to = function e(t) {
      (0,
          tU._)(this, e),
      t && (void 0 !== t.QuestionID && (this.QuestionID = t.QuestionID),
      void 0 !== t.Creator && (this.Creator = new Y(t.Creator)),
      void 0 !== t.Content && (this.Content = t.Content),
      void 0 !== t.VideoCount && (this.VideoCount = t.VideoCount),
      void 0 !== t.CreateTime && (this.CreateTime = t.CreateTime),
      void 0 !== t.Video && (this.Video = new Z(t.Video)))
    }
    ,
    n.GetQuestionInfoResponse = function e(t) {
      (0,
          tU._)(this, e),
      t && (void 0 !== t.QuestionInfo && (this.QuestionInfo = new to(t.QuestionInfo)),
      void 0 !== t.ShareUser && (this.ShareUser = new Y(t.ShareUser)),
      void 0 !== t.ShareMeta && (this.ShareMeta = new z(t.ShareMeta)),
      void 0 !== t.BaseResp && (this.BaseResp = new tF.M$.BaseResp(t.BaseResp)))
    }
    ,
    n.GetMixInfoRequest = function e(t) {
      (0,
          tU._)(this, e),
      t && (this.MixId = t.MixId,
      void 0 !== t.UCode && (this.UCode = t.UCode),
      void 0 !== t.AppID && (this.AppID = t.AppID),
      void 0 !== t.Language && (this.Language = t.Language),
      void 0 !== t.Scene && (this.Scene = t.Scene),
      void 0 !== t.Base && (this.Base = new tF.M$.Base(t.Base)))
    }
    ,
    n.GetMixInfoResponse = function e(t) {
      (0,
          tU._)(this, e),
      t && (void 0 !== t.MixInfo && (this.MixInfo = new ts(t.MixInfo)),
      void 0 !== t.ShareUser && (this.ShareUser = new Y(t.ShareUser)),
      void 0 !== t.ShareMeta && (this.ShareMeta = new z(t.ShareMeta)),
      void 0 !== t.BaseResp && (this.BaseResp = new tF.M$.BaseResp(t.BaseResp)))
    }
    ,
    n.MixInfoStruct = ts = function e(t) {
      (0,
          tU._)(this, e),
      t && (void 0 !== t.MixId && (this.MixId = t.MixId),
      void 0 !== t.Creator && (this.Creator = new Y(t.Creator)),
      void 0 !== t.Name && (this.Name = t.Name),
      void 0 !== t.VideoCount && (this.VideoCount = t.VideoCount),
      void 0 !== t.Cover && (this.Cover = t.Cover))
    }
    ,
    n.GetPlayListRequest = function e(t) {
      (0,
          tU._)(this, e),
      t && (this.Id = t.Id,
          this.IdType = t.IdType,
      void 0 !== t.Count && (this.Count = t.Count),
      void 0 !== t.Cursor && (this.Cursor = t.Cursor),
      void 0 !== t.NeedTotal && (this.NeedTotal = t.NeedTotal),
      void 0 !== t.Base && (this.Base = new tF.M$.Base(t.Base)))
    }
    ,
    n.GetPlayListResponse = function e(t) {
      (0,
          tU._)(this, e),
      t && (this.PlayList = Array.isArray(t.PlayList) ? t.PlayList.map(function (e) {
        return new tr(e)
      }) : t.PlayList,
          this.HasMore = t.HasMore,
      void 0 !== t.Cursor && (this.Cursor = t.Cursor),
      void 0 !== t.BaseResp && (this.BaseResp = new tF.M$.BaseResp(t.BaseResp)))
    }
    ,
    n.MixStruct = tr = function e(t) {
      (0,
          tU._)(this, e),
      t && (this.MixName = t.MixName,
          this.MixId = t.MixId,
      void 0 !== t.Name && (this.Name = t.Name),
      void 0 !== t.Id && (this.Id = t.Id),
      void 0 !== t.VideoCount && (this.VideoCount = t.VideoCount),
      void 0 !== t.Cover && (this.Cover = t.Cover),
      void 0 !== t.Creator && (this.Creator = new Y(t.Creator)))
    }
    ,
    n.GetCollectionInfoRequest = function e(t) {
      (0,
          tU._)(this, e),
      t && (this.CollectionId = t.CollectionId,
      void 0 !== t.UCode && (this.UCode = t.UCode),
      void 0 !== t.AppId && (this.AppId = t.AppId),
      void 0 !== t.Language && (this.Language = t.Language),
      void 0 !== t.Region && (this.Region = t.Region),
      void 0 !== t.Scene && (this.Scene = t.Scene),
      void 0 !== t.ClientABVersions && (this.ClientABVersions = t.ClientABVersions),
      void 0 !== t.Extra && (this.Extra = t.Extra),
      void 0 !== t.Base && (this.Base = new tF.M$.Base(t.Base)))
    }
    ,
    n.GetCollectionInfoResponse = function e(t) {
      (0,
          tU._)(this, e),
      t && (void 0 !== t.CollectionInfo && (this.CollectionInfo = new ta(t.CollectionInfo)),
      void 0 !== t.ShareUser && (this.ShareUser = new Y(t.ShareUser)),
      void 0 !== t.ShareMeta && (this.ShareMeta = new z(t.ShareMeta)),
      void 0 !== t.BaseResp && (this.BaseResp = new tF.M$.BaseResp(t.BaseResp)))
    }
    ,
    n.CollectionInfoStruct = ta = function e(t) {
      (0,
          tU._)(this, e),
      t && (void 0 !== t.CollectionId && (this.CollectionId = t.CollectionId),
      void 0 !== t.UserId && (this.UserId = t.UserId),
      void 0 !== t.Name && (this.Name = t.Name),
      void 0 !== t.Total && (this.Total = t.Total),
      void 0 !== t.UserName && (this.UserName = t.UserName),
      void 0 !== t.Cover && (this.Cover = new b(t.Cover)),
      void 0 !== t.Status && (this.Status = t.Status))
    }
    ,
    n.GetCollectionListRequest = function e(t) {
      (0,
          tU._)(this, e),
      t && (this.UserId = t.UserId,
          this.Count = t.Count,
          this.Cursor = t.Cursor,
      void 0 !== t.CommonParam && (this.CommonParam = new tG.M$.WebCommonParam(t.CommonParam)),
      void 0 !== t.CoverFormat && (this.CoverFormat = t.CoverFormat),
      void 0 !== t.ExtraParams && (this.ExtraParams = t.ExtraParams),
      void 0 !== t.AppId && (this.AppId = t.AppId),
      void 0 !== t.Language && (this.Language = t.Language),
      void 0 !== t.Region && (this.Region = t.Region),
      void 0 !== t.PublicOnly && (this.PublicOnly = t.PublicOnly),
      void 0 !== t.Extra && (this.Extra = t.Extra),
      void 0 !== t.Base && (this.Base = new tF.M$.Base(t.Base)))
    }
    ,
    n.GetCollectionListResponse = function e(t) {
      (0,
          tU._)(this, e),
      t && (void 0 !== t.Collections && (this.Collections = Array.isArray(t.Collections) ? t.Collections.map(function (e) {
        return new ta(e)
      }) : t.Collections),
      void 0 !== t.HasMore && (this.HasMore = t.HasMore),
      void 0 !== t.Cursor && (this.Cursor = t.Cursor),
      void 0 !== t.Total && (this.Total = t.Total),
      void 0 !== t.BaseResp && (this.BaseResp = new tF.M$.BaseResp(t.BaseResp)))
    }
    ,
    n.GetUserQuestionListRequest = function e(t) {
      (0,
          tU._)(this, e),
      t && (this.UserId = t.UserId,
          this.Count = t.Count,
          this.Cursor = t.Cursor,
      void 0 !== t.Scene && (this.Scene = t.Scene),
      void 0 !== t.Region && (this.Region = t.Region),
      void 0 !== t.Base && (this.Base = new tF.M$.Base(t.Base)))
    }
    ,
    n.GetUserQuestionListResponse = function e(t) {
      (0,
          tU._)(this, e),
      t && (void 0 !== t.QuestionList && (this.QuestionList = Array.isArray(t.QuestionList) ? t.QuestionList.map(function (e) {
        return new to(e)
      }) : t.QuestionList),
      void 0 !== t.Cursor && (this.Cursor = t.Cursor),
      void 0 !== t.HasMore && (this.HasMore = t.HasMore),
      void 0 !== t.BaseResp && (this.BaseResp = new tF.M$.BaseResp(t.BaseResp)))
    }
    ,
    n.GetUserAnswerListRequest = function e(t) {
      (0,
          tU._)(this, e),
      t && (this.UserId = t.UserId,
          this.Count = t.Count,
          this.Cursor = t.Cursor,
      void 0 !== t.Region && (this.Region = t.Region),
      void 0 !== t.Scene && (this.Scene = t.Scene),
      void 0 !== t.Base && (this.Base = new tF.M$.Base(t.Base)))
    }
    ,
    n.GetUserAnswerListResponse = function e(t) {
      (0,
          tU._)(this, e),
      t && (void 0 !== t.AnswerList && (this.AnswerList = Array.isArray(t.AnswerList) ? t.AnswerList.map(function (e) {
        return new tu(e)
      }) : t.AnswerList),
      void 0 !== t.Cursor && (this.Cursor = t.Cursor),
      void 0 !== t.HasMore && (this.HasMore = t.HasMore),
      void 0 !== t.BaseResp && (this.BaseResp = new tF.M$.BaseResp(t.BaseResp)))
    }
    ,
    n.AnswerStruct = tu = function e(t) {
      (0,
          tU._)(this, e),
      t && (void 0 !== t.Question && (this.Question = new to(t.Question)),
      void 0 !== t.Answer && (this.Answer = new td(t.Answer)))
    }
    ,
    n.AnswerInfoStruct = td = function e(t) {
      (0,
          tU._)(this, e),
      t && (void 0 !== t.AnswerID && (this.AnswerID = t.AnswerID),
      void 0 !== t.AnswerItem && (this.AnswerItem = new eD(t.AnswerItem)))
    }
    ,
    n.GetInboxNoticeListRequest = function e(t) {
      (0,
          tU._)(this, e),
      t && (this.GroupList = Array.isArray(t.GroupList) ? t.GroupList.map(function (e) {
        return new tc(e)
      }) : t.GroupList,
          this.Region = t.Region,
          this.UserId = t.UserId,
      void 0 !== t.Base && (this.Base = new tF.M$.Base(t.Base)))
    }
    ,
    n.WebNoticeGroupStruct = tc = function e(t) {
      (0,
          tU._)(this, e),
      t && (this.MaxTime = t.MaxTime,
          this.MinTime = t.MinTime,
          this.Count = t.Count,
          this.Group = t.Group,
          this.IsMarkRead = t.IsMarkRead)
    }
    ,
    n.GetInboxNoticeListResponse = function e(t) {
      (0,
          tU._)(this, e),
      t && (void 0 !== t.NoticeList && (this.NoticeList = Array.isArray(t.NoticeList) ? t.NoticeList.map(function (e) {
        return new tl(e)
      }) : t.NoticeList),
      void 0 !== t.BaseResp && (this.BaseResp = new tF.M$.BaseResp(t.BaseResp)))
    }
    ,
    n.WebBaseNoticeListStruct = tl = function e(t) {
      (0,
          tU._)(this, e),
      t && (this.Group = t.Group,
      void 0 !== t.Notice && (this.Notice = Array.isArray(t.Notice) ? t.Notice.map(function (e) {
        return new th(e)
      }) : t.Notice),
          this.HasMore = t.HasMore,
          this.MaxTime = t.MaxTime,
          this.MinTime = t.MinTime)
    }
    ,
    n.WebBaseNoticeStruct = th = function e(t) {
      (0,
          tU._)(this, e),
      t && (this.Nid = t.Nid,
          this.Type = t.Type,
          this.CreateTime = t.CreateTime,
      void 0 !== t.HasRead && (this.HasRead = t.HasRead),
      void 0 !== t.TemplateNotice && (this.TemplateNotice = new tI(t.TemplateNotice)),
          this.DisplayType = t.DisplayType)
    }
    ,
    n.GeneralNoticeTemplateStruct = tI = function e(t) {
      (0,
          tU._)(this, e),
      t && (void 0 !== t.SchemaUrl && (this.SchemaUrl = t.SchemaUrl),
      void 0 !== t.notice && (this.notice = new t_(t.notice)))
    }
    ,
    n.NoticeUITemplate = t_ = function e(t) {
      (0,
          tU._)(this, e),
      t && (void 0 !== t.TitleTemplate && (this.TitleTemplate = new tv(t.TitleTemplate)),
      void 0 !== t.Content && (this.Content = t.Content))
    }
    ,
    n.TitleTemplateStruct = tv = function e(t) {
      (0,
          tU._)(this, e),
      t && void 0 !== t.Title && (this.Title = t.Title)
    }
    ,
    n.PoiStatus = tT = function e(t) {
      (0,
          tU._)(this, e),
      t && void 0 !== t.VideoCount && (this.VideoCount = t.VideoCount)
    }
    ,
    n.GetPoiInfoRequest = function e(t) {
      (0,
          tU._)(this, e),
      t && (this.PoiId = t.PoiId,
      void 0 !== t.UCode && (this.UCode = t.UCode),
      void 0 !== t.AppId && (this.AppId = t.AppId),
      void 0 !== t.Region && (this.Region = t.Region),
      void 0 !== t.Language && (this.Language = t.Language),
      void 0 !== t.Scene && (this.Scene = t.Scene),
      void 0 !== t.Base && (this.Base = new tF.M$.Base(t.Base)))
    }
    ,
    n.GetPoiInfoResponse = function e(t) {
      (0,
          tU._)(this, e),
      t && (void 0 !== t.PoiInfo && (this.PoiInfo = new ek(t.PoiInfo)),
      void 0 !== t.Stats && (this.Stats = new tT(t.Stats)),
      void 0 !== t.ShareUser && (this.ShareUser = new Y(t.ShareUser)),
      void 0 !== t.ShareMeta && (this.ShareMeta = new z(t.ShareMeta)),
      void 0 !== t.BaseResp && (this.BaseResp = new tF.M$.BaseResp(t.BaseResp)))
    }
    ,
    n.GetRecentContactListRequest = function e(t) {
      (0,
          tU._)(this, e),
      t && (this.UserId = t.UserId,
      void 0 !== t.MentionType && (this.MentionType = t.MentionType),
      void 0 !== t.Base && (this.Base = new tF.M$.Base(t.Base)))
    }
    ,
    n.GetRecentContactListResponse = function e(t) {
      (0,
          tU._)(this, e),
      t && (void 0 !== t.UserList && (this.UserList = Array.isArray(t.UserList) ? t.UserList.map(function (e) {
        return new tf(e)
      }) : t.UserList),
      void 0 !== t.BaseResp && (this.BaseResp = new tF.M$.BaseResp(t.BaseResp)))
    }
    ,
    n.MentionAtUser = tf = function e(t) {
      (0,
          tU._)(this, e),
      t && (void 0 !== t.Nickname && (this.Nickname = t.Nickname),
      void 0 !== t.UniqueId && (this.UniqueId = t.UniqueId),
      void 0 !== t.Relation && (this.Relation = t.Relation),
      void 0 !== t.Verified && (this.Verified = t.Verified),
      void 0 !== t.BlockType && (this.BlockType = t.BlockType),
      void 0 !== t.AvatarThumb && (this.AvatarThumb = t.AvatarThumb),
      void 0 !== t.UserId && (this.UserId = t.UserId))
    }
    ,
    n.CommitAdsActionRequest = function e(t) {
      (0,
          tU._)(this, e),
      t && (this.AdsBiz = t.AdsBiz,
          this.AdsActionType = t.AdsActionType,
          this.Language = t.Language,
          this.Region = t.Region,
      void 0 !== t.Base && (this.Base = new tF.M$.Base(t.Base)))
    }
    ,
    n.CommitAdsActionResponse = function e(t) {
      (0,
          tU._)(this, e),
      t && (void 0 !== t.Liked && (this.Liked = t.Liked),
      void 0 !== t.BaseResp && (this.BaseResp = new tF.M$.BaseResp(t.BaseResp)))
    }
    ,
    n.DeleteCommentRequest = function e(t) {
      (0,
          tU._)(this, e),
      t && (this.UserId = t.UserId,
          this.CommentId = t.CommentId,
      void 0 !== t.DeviceId && (this.DeviceId = t.DeviceId),
      void 0 !== t.Base && (this.Base = new tF.M$.Base(t.Base)))
    }
    ,
    n.DeleteCommentResponse = function e(t) {
      (0,
          tU._)(this, e),
      t && (this.StatusCode = t.StatusCode,
          this.IsSuccess = t.IsSuccess,
      void 0 !== t.Message && (this.Message = t.Message),
      void 0 !== t.BaseResp && (this.BaseResp = new tF.M$.BaseResp(t.BaseResp)))
    }
    ,
    n.DiggCommentRequest = function e(t) {
      (0,
          tU._)(this, e),
      t && (this.CommentId = t.CommentId,
          this.ItemId = t.ItemId,
          this.ChannelId = t.ChannelId,
          this.AppId = t.AppId,
          this.UserId = t.UserId,
      void 0 !== t.DeviceId && (this.DeviceId = t.DeviceId),
      void 0 !== t.Base && (this.Base = new tF.M$.Base(t.Base)))
    }
    ,
    n.DiggCommentResponse = function e(t) {
      (0,
          tU._)(this, e),
      t && (this.StatusCode = t.StatusCode,
          this.IsSuccess = t.IsSuccess,
      void 0 !== t.Message && (this.Message = t.Message),
      void 0 !== t.BaseResp && (this.BaseResp = new tF.M$.BaseResp(t.BaseResp)))
    }
    ,
    n.RethinkPopup = tp = function e(t) {
      (0,
          tU._)(this, e),
      t && (void 0 !== t.title && (this.title = t.title),
      void 0 !== t.body && (this.body = t.body),
      void 0 !== t.highlight && (this.highlight = t.highlight),
      void 0 !== t.link && (this.link = t.link))
    }
    ,
    n.PublishCommentResponse = function e(t) {
      (0,
          tU._)(this, e),
      t && (this.statusCode = t.statusCode,
          this.statusMessage = t.statusMessage,
          this.comment = new el(t.comment),
      void 0 !== t.labelInfo && (this.labelInfo = t.labelInfo),
      void 0 !== t.secondVerifyType && (this.secondVerifyType = t.secondVerifyType),
      void 0 !== t.rethinkPopup && (this.rethinkPopup = new tp(t.rethinkPopup)),
      void 0 !== t.BaseResp && (this.BaseResp = new tF.M$.BaseResp(t.BaseResp)))
    }
    ,
    n.PublishCommentRequest = function e(t) {
      (0,
          tU._)(this, e),
      t && (this.UserId = t.UserId,
          this.ItemId = t.ItemId,
          this.Text = t.Text,
      void 0 !== t.ReplyId && (this.ReplyId = t.ReplyId),
      void 0 !== t.ReplyToReplyId && (this.ReplyToReplyId = t.ReplyToReplyId),
      void 0 !== t.ChannelId && (this.ChannelId = t.ChannelId),
      void 0 !== t.ActionType && (this.ActionType = t.ActionType),
      void 0 !== t.AdInfo && (this.AdInfo = t.AdInfo),
      void 0 !== t.SkipRethink && (this.SkipRethink = t.SkipRethink),
      void 0 !== t.PublishScenario && (this.PublishScenario = t.PublishScenario),
      void 0 !== t.TextExtra && (this.TextExtra = t.TextExtra),
      void 0 !== t.Base && (this.Base = new tF.M$.Base(t.Base)))
    }
    ,
    n.ModifyPlaylistOrderRequest = function e(t) {
      (0,
          tU._)(this, e),
      t && (void 0 !== t.CommitMixIds && (this.CommitMixIds = t.CommitMixIds),
      void 0 !== t.Base && (this.Base = new tF.M$.Base(t.Base)))
    }
    ,
    n.ModifyPlaylistOrderResponse = function e(t) {
      (0,
          tU._)(this, e),
      t && void 0 !== t.BaseResp && (this.BaseResp = new tF.M$.BaseResp(t.BaseResp))
    }
    ,
    n.CreatePlaylistWithItemsRequest = function e(t) {
      (0,
          tU._)(this, e),
      t && (this.Name = t.Name,
      void 0 !== t.ItemIds && (this.ItemIds = t.ItemIds),
      void 0 !== t.SourceType && (this.SourceType = t.SourceType),
      void 0 !== t.AppId && (this.AppId = t.AppId),
      void 0 !== t.Region && (this.Region = t.Region),
      void 0 !== t.Language && (this.Language = t.Language),
      void 0 !== t.Base && (this.Base = new tF.M$.Base(t.Base)))
    }
    ,
    n.CreatePlaylistWithItemsResponse = function e(t) {
      (0,
          tU._)(this, e),
      t && (void 0 !== t.PlaylistId && (this.PlaylistId = t.PlaylistId),
      void 0 !== t.BaseResp && (this.BaseResp = new tF.M$.BaseResp(t.BaseResp)))
    }
    ,
    n.GetAntiDirtNameCheckerRequest = function e(t) {
      (0,
          tU._)(this, e),
      t && (this.Name = t.Name,
      void 0 !== t.AppId && (this.AppId = t.AppId),
          this.Language = t.Language,
          this.Region = t.Region,
      void 0 !== t.Base && (this.Base = new tF.M$.Base(t.Base)))
    }
    ,
    n.GetAntiDirtNameCheckerResponse = function e(t) {
      (0,
          tU._)(this, e),
      t && (this.isValid = t.isValid,
      void 0 !== t.BaseResp && (this.BaseResp = new tF.M$.BaseResp(t.BaseResp)))
    }
    ,
    n.CollectItemRequest = function e(t) {
      (0,
          tU._)(this, e),
      t && (this.AppID = t.AppID,
          this.ItemID = t.ItemID,
          this.Action = t.Action,
      void 0 !== t.Extra && (this.Extra = t.Extra),
      void 0 !== t.Base && (this.Base = new tF.M$.Base(t.Base)))
    }
    ,
    n.CollectItemResponse = function e(t) {
      (0,
          tU._)(this, e),
      t && void 0 !== t.BaseResp && (this.BaseResp = new tF.M$.BaseResp(t.BaseResp))
    }
    ,
    n.ModifyPlaylistItemsRequest = function e(t) {
      (0,
          tU._)(this, e),
      t && (this.PlaylistId = t.PlaylistId,
      void 0 !== t.CommitedItemIds && (this.CommitedItemIds = t.CommitedItemIds),
      void 0 !== t.DeleteItemIds && (this.DeleteItemIds = t.DeleteItemIds),
      void 0 !== t.Base && (this.Base = new tF.M$.Base(t.Base)))
    }
    ,
    n.ModifyPlaylistItemsResponse = function e(t) {
      (0,
          tU._)(this, e),
      t && void 0 !== t.BaseResp && (this.BaseResp = new tF.M$.BaseResp(t.BaseResp))
    }
    ,
    n.ModifyPlaylistInfoRequest = function e(t) {
      (0,
          tU._)(this, e),
      t && (this.PlaylistId = t.PlaylistId,
          this.Name = t.Name,
      void 0 !== t.Base && (this.Base = new tF.M$.Base(t.Base)))
    }
    ,
    n.ModifyPlaylistInfoResponse = function e(t) {
      (0,
          tU._)(this, e),
      t && void 0 !== t.BaseResp && (this.BaseResp = new tF.M$.BaseResp(t.BaseResp))
    }
    ,
    n.DeletePlaylistRequest = function e(t) {
      (0,
          tU._)(this, e),
      t && (this.PlaylistId = t.PlaylistId,
      void 0 !== t.Base && (this.Base = new tF.M$.Base(t.Base)))
    }
    ,
    n.DeletePlaylistResponse = function e(t) {
      (0,
          tU._)(this, e),
      t && void 0 !== t.BaseResp && (this.BaseResp = new tF.M$.BaseResp(t.BaseResp))
    }
    ,
    n.CreateCollectionRequest = function e(t) {
      (0,
          tU._)(this, e),
      t && (this.Name = t.Name,
      void 0 !== t.ItemIDs && (this.ItemIDs = t.ItemIDs),
      void 0 !== t.Status && (this.Status = t.Status),
      void 0 !== t.AppId && (this.AppId = t.AppId),
      void 0 !== t.Region && (this.Region = t.Region),
      void 0 !== t.Language && (this.Language = t.Language),
      void 0 !== t.Base && (this.Base = new tF.M$.Base(t.Base)))
    }
    ,
    n.CreateCollectionResponse = function e(t) {
      (0,
          tU._)(this, e),
      t && (this.CollectionID = t.CollectionID,
      void 0 !== t.BaseResp && (this.BaseResp = new tF.M$.BaseResp(t.BaseResp)))
    }
    ,
    n.DeleteCollectionRequest = function e(t) {
      (0,
          tU._)(this, e),
      t && (this.CollectionID = t.CollectionID,
      void 0 !== t.Base && (this.Base = new tF.M$.Base(t.Base)))
    }
    ,
    n.DeleteCollectionResponse = function e(t) {
      (0,
          tU._)(this, e),
      t && void 0 !== t.BaseResp && (this.BaseResp = new tF.M$.BaseResp(t.BaseResp))
    }
    ,
    n.ModifyCollectionInfoRequest = function e(t) {
      (0,
          tU._)(this, e),
      t && (this.CollectionID = t.CollectionID,
      void 0 !== t.Name && (this.Name = t.Name),
      void 0 !== t.Status && (this.Status = t.Status),
      void 0 !== t.AppId && (this.AppId = t.AppId),
      void 0 !== t.Region && (this.Region = t.Region),
      void 0 !== t.Language && (this.Language = t.Language),
      void 0 !== t.Extra && (this.Extra = t.Extra),
      void 0 !== t.Base && (this.Base = new tF.M$.Base(t.Base)))
    }
    ,
    n.ModifyCollectionInfoResponse = function e(t) {
      (0,
          tU._)(this, e),
      t && void 0 !== t.BaseResp && (this.BaseResp = new tF.M$.BaseResp(t.BaseResp))
    }
    ,
    n.ModifyCollectionItemsRequest = function e(t) {
      (0,
          tU._)(this, e),
      t && (this.CollectionID = t.CollectionID,
      void 0 !== t.CommitIDs && (this.CommitIDs = t.CommitIDs),
      void 0 !== t.DeleteIDs && (this.DeleteIDs = t.DeleteIDs),
      void 0 !== t.AppID && (this.AppID = t.AppID),
      void 0 !== t.Base && (this.Base = new tF.M$.Base(t.Base)))
    }
    ,
    n.ModifyCollectionItemsResponse = function e(t) {
      (0,
          tU._)(this, e),
      t && void 0 !== t.BaseResp && (this.BaseResp = new tF.M$.BaseResp(t.BaseResp))
    }
    ,
    n.MoveCollectionItemsRequest = function e(t) {
      (0,
          tU._)(this, e),
      t && (this.FromCollectionID = t.FromCollectionID,
          this.TargetCollectionID = t.TargetCollectionID,
          this.AppID = t.AppID,
      void 0 !== t.ItemIDs && (this.ItemIDs = t.ItemIDs),
      void 0 !== t.Base && (this.Base = new tF.M$.Base(t.Base)))
    }
    ,
    n.MoveCollectionItemsResponse = function e(t) {
      (0,
          tU._)(this, e),
      t && void 0 !== t.BaseResp && (this.BaseResp = new tF.M$.BaseResp(t.BaseResp))
    }
    ,
    n.GetInboxNoticeCountRequest = function e(t) {
      (0,
          tU._)(this, e),
      t && (this.AppId = t.AppId,
          this.Region = t.Region,
          this.UserId = t.UserId,
      void 0 !== t.Base && (this.Base = new tF.M$.Base(t.Base)))
    }
    ,
    n.WebNoticeCountStruct = tE = function e(t) {
      (0,
          tU._)(this, e),
      t && (this.Group = t.Group,
          this.Count = t.Count)
    }
    ,
    n.GetInboxNoticeCountResponse = function e(t) {
      (0,
          tU._)(this, e),
      t && (void 0 !== t.NoticeCount && (this.NoticeCount = Array.isArray(t.NoticeCount) ? t.NoticeCount.map(function (e) {
        return new tE(e)
      }) : t.NoticeCount),
      void 0 !== t.BaseResp && (this.BaseResp = new tF.M$.BaseResp(t.BaseResp)))
    }
    ,
    n.DislikeItemRequest = function e(t) {
      (0,
          tU._)(this, e),
      t && (this.ItemId = t.ItemId,
          this.ItemAuthorId = t.ItemAuthorId,
      void 0 !== t.Base && (this.Base = new tF.M$.Base(t.Base)))
    }
    ,
    n.DislikeItemResponse = function e(t) {
      (0,
          tU._)(this, e),
      t && (this.StatusCode = t.StatusCode,
      void 0 !== t.StatusMessage && (this.StatusMessage = t.StatusMessage),
      void 0 !== t.BaseResp && (this.BaseResp = new tF.M$.BaseResp(t.BaseResp)))
    }
    ,
    n.CommitFollowUserRequest = function e(t) {
      (0,
          tU._)(this, e),
      t && (this.FromUserId = t.FromUserId,
          this.ToUserId = t.ToUserId,
          this.actionType = t.actionType,
      void 0 !== t.From && (this.From = t.From),
      void 0 !== t.FromPre && (this.FromPre = t.FromPre),
      void 0 !== t.AppId && (this.AppId = t.AppId),
      void 0 !== t.Base && (this.Base = new tF.M$.Base(t.Base)))
    }
    ,
    n.CommitFollowUserResponse = function e(t) {
      (0,
          tU._)(this, e),
      t && (this.FollowStatus = t.FollowStatus,
      void 0 !== t.BaseResp && (this.BaseResp = new tF.M$.BaseResp(t.BaseResp)))
    }
    ,
    n.EventStruct = tm = function e(t) {
      (0,
          tU._)(this, e),
      t && (void 0 !== t.ID && (this.ID = t.ID),
      void 0 !== t.OwnerUserID && (this.OwnerUserID = t.OwnerUserID),
      void 0 !== t.Type && (this.Type = t.Type),
      void 0 !== t.StartTime && (this.StartTime = t.StartTime),
      void 0 !== t.Duration && (this.Duration = t.Duration),
      void 0 !== t.Title && (this.Title = t.Title),
      void 0 !== t.Description && (this.Description = t.Description),
      void 0 !== t.Status && (this.Status = t.Status),
      void 0 !== t.SubscriberCount && (this.SubscriberCount = t.SubscriberCount),
      void 0 !== t.EnableUpdate && (this.EnableUpdate = t.EnableUpdate),
      void 0 !== t.HasSubscribed && (this.HasSubscribed = t.HasSubscribed),
      void 0 !== t.Extra && (this.Extra = t.Extra),
      void 0 !== t.UnderReviewDesc && (this.UnderReviewDesc = t.UnderReviewDesc),
      void 0 !== t.PromotionEnable && (this.PromotionEnable = t.PromotionEnable),
      void 0 !== t.IsPromoting && (this.IsPromoting = t.IsPromoting),
      void 0 !== t.IsPaidEvent && (this.IsPaidEvent = t.IsPaidEvent),
      void 0 !== t.TicketAmount && (this.TicketAmount = t.TicketAmount),
      void 0 !== t.AgeRestricted && (this.AgeRestricted = t.AgeRestricted),
      void 0 !== t.PayMethod && (this.PayMethod = t.PayMethod),
      void 0 !== t.WalletPackage && (this.WalletPackage = new tG.M$.WalletPackage(t.WalletPackage)),
      void 0 !== t.WriteACL && (this.WriteACL = new tG.M$.EventWriteACL(t.WriteACL)),
      void 0 !== t.WalletPackageDict && (this.WalletPackageDict = t.WalletPackageDict ? Object.fromEntries(Object.entries(t.WalletPackageDict).map(function (e) {
        var t = (0,
            tb._)(e, 2)
            , i = t[0]
            , n = t[1];
        return [i, new tG.M$.WalletPackage(n)]
      })) : t.WalletPackageDict),
      void 0 !== t.CreatorData && (this.CreatorData = new tG.M$.EventCreatorData(t.CreatorData)))
    }
    ,
    n.AdVerificationStruct = tS = function e(t) {
      (0,
          tU._)(this, e),
      t && (void 0 !== t.VendorKey && (this.VendorKey = t.VendorKey),
      void 0 !== t.JavaScriptResource && (this.JavaScriptResource = t.JavaScriptResource),
      void 0 !== t.VerificationParameters && (this.VerificationParameters = t.VerificationParameters))
    }
    ,
    n.VastStruct = tg = function e(t) {
      (0,
          tU._)(this, e),
      t && (void 0 !== t.VastUrl && (this.VastUrl = t.VastUrl),
      void 0 !== t.VastContent && (this.VastContent = t.VastContent),
      void 0 !== t.AdVerification && (this.AdVerification = new tS(t.AdVerification)),
      void 0 !== t.VastWrappedCount && (this.VastWrappedCount = t.VastWrappedCount),
      void 0 !== t.ProviderType && (this.ProviderType = t.ProviderType),
      void 0 !== t.EnableContentUrl && (this.EnableContentUrl = t.EnableContentUrl),
      void 0 !== t.ExtraAdVerifications && (this.ExtraAdVerifications = Array.isArray(t.ExtraAdVerifications) ? t.ExtraAdVerifications.map(function (e) {
        return new tS(e)
      }) : t.ExtraAdVerifications),
      void 0 !== t.AdVerifications && (this.AdVerifications = Array.isArray(t.AdVerifications) ? t.AdVerifications.map(function (e) {
        return new tS(e)
      }) : t.AdVerifications))
    }
    ,
    n.AdInfoStruct = tL = function e(t) {
      (0,
          tU._)(this, e),
      t && (void 0 !== t.AdId && (this.AdId = t.AdId),
      void 0 !== t.CreativeId && (this.CreativeId = t.CreativeId),
      void 0 !== t.IsNormal && (this.IsNormal = t.IsNormal),
      void 0 !== t.WebUrl && (this.WebUrl = t.WebUrl),
      void 0 !== t.ButtonText && (this.ButtonText = t.ButtonText),
      void 0 !== t.ButtonColor && (this.ButtonColor = t.ButtonColor),
      void 0 !== t.LogExtra && (this.LogExtra = t.LogExtra),
      void 0 !== t.TagText && (this.TagText = t.TagText),
      void 0 !== t.IsPromotionalMusic && (this.IsPromotionalMusic = t.IsPromotionalMusic),
      void 0 !== t.ChargeType && (this.ChargeType = t.ChargeType),
      void 0 !== t.AboutThisAdInfo && (this.AboutThisAdInfo = new tC(t.AboutThisAdInfo)),
      void 0 !== t.AdvertiserId && (this.AdvertiserId = t.AdvertiserId),
      void 0 !== t.RawAdData && (this.RawAdData = t.RawAdData),
      void 0 !== t.AnimationType && (this.AnimationType = t.AnimationType),
      void 0 !== t.Vast && (this.Vast = new tg(t.Vast)),
      void 0 !== t.BrandSafety && (this.BrandSafety = t.BrandSafety))
    }
    ,
    n.AboutThisAdInfo = tC = function e(t) {
      (0,
          tU._)(this, e),
      t && (void 0 !== t.AboutThisAdContentType && (this.AboutThisAdContentType = t.AboutThisAdContentType),
      void 0 !== t.AboutThisAdTitle && (this.AboutThisAdTitle = t.AboutThisAdTitle),
      void 0 !== t.AboutThisAdAdjustSettings && (this.AboutThisAdAdjustSettings = t.AboutThisAdAdjustSettings),
      void 0 !== t.AboutThisAdFeedback && (this.AboutThisAdFeedback = t.AboutThisAdFeedback),
      void 0 !== t.AboutThisAdFeedbackBtnYes && (this.AboutThisAdFeedbackBtnYes = t.AboutThisAdFeedbackBtnYes),
      void 0 !== t.AboutThisAdFeedbackBtnNo && (this.AboutThisAdFeedbackBtnNo = t.AboutThisAdFeedbackBtnNo),
      void 0 !== t.AboutThisAdFeedbackResponse && (this.AboutThisAdFeedbackResponse = t.AboutThisAdFeedbackResponse),
      void 0 !== t.AboutThisAdItems && (this.AboutThisAdItems = Array.isArray(t.AboutThisAdItems) ? t.AboutThisAdItems.map(function (e) {
        return new tA(e)
      }) : t.AboutThisAdItems),
      void 0 !== t.AdvertiserItems && (this.AdvertiserItems = Array.isArray(t.AdvertiserItems) ? t.AdvertiserItems.map(function (e) {
        return new tA(e)
      }) : t.AdvertiserItems),
      void 0 !== t.GeoId && (this.GeoId = t.GeoId),
      void 0 !== t.CountryCode && (this.CountryCode = t.CountryCode),
      void 0 !== t.MatchAudienceTags && (this.MatchAudienceTags = t.MatchAudienceTags),
      void 0 !== t.BusinessEnNameUsed && (this.BusinessEnNameUsed = t.BusinessEnNameUsed))
    }
    ,
    n.AboutThisAdItem = tA = function e(t) {
      (0,
          tU._)(this, e),
      t && (void 0 !== t.GroupTitle && (this.GroupTitle = t.GroupTitle),
      void 0 !== t.OrientationInfo && (this.OrientationInfo = Array.isArray(t.OrientationInfo) ? t.OrientationInfo.map(function (e) {
        return new tR(e)
      }) : t.OrientationInfo))
    }
    ,
    n.OrientationInfo = tR = function e(t) {
      (0,
          tU._)(this, e),
      t && (void 0 !== t.InfoType && (this.InfoType = t.InfoType),
      void 0 !== t.OrientationText && (this.OrientationText = t.OrientationText),
      void 0 !== t.Url && (this.Url = t.Url),
      void 0 !== t.OrientationItem && (this.OrientationItem = t.OrientationItem),
      void 0 !== t.OrientationTrack && (this.OrientationTrack = t.OrientationTrack),
      void 0 !== t.GeoCountryType && (this.GeoCountryType = t.GeoCountryType),
      void 0 !== t.EnableText && (this.EnableText = t.EnableText),
      void 0 !== t.DisableText && (this.DisableText = t.DisableText),
      void 0 !== t.Switch && (this.Switch = t.Switch))
    }
    ,
    n.ItemControlStruct = ty = function e(t) {
      (0,
          tU._)(this, e),
      t && (void 0 !== t.CanShare && (this.CanShare = t.CanShare),
      void 0 !== t.CanComment && (this.CanComment = t.CanComment),
      void 0 !== t.CanMusicRedirect && (this.CanMusicRedirect = t.CanMusicRedirect),
      void 0 !== t.CanUserRedirect && (this.CanUserRedirect = t.CanUserRedirect),
      void 0 !== t.CanRepost && (this.CanRepost = t.CanRepost))
    }
    ,
    n.CommitRemoveUserRequest = function e(t) {
      (0,
          tU._)(this, e),
      t && (this.ToUserId = t.ToUserId,
          this.Region = t.Region,
      void 0 !== t.Base && (this.Base = new tF.M$.Base(t.Base)))
    }
    ,
    n.CommitRemoveUserResponse = function e(t) {
      (0,
          tU._)(this, e),
      t && void 0 !== t.BaseResp && (this.BaseResp = new tF.M$.BaseResp(t.BaseResp))
    }
    ,
    n.TrendingSearchWordsRequest = function e(t) {
      (0,
          tU._)(this, e),
      t && (this.Count = t.Count,
      void 0 !== t.Region && (this.Region = t.Region),
      void 0 !== t.IsNonPersonalized && (this.IsNonPersonalized = t.IsNonPersonalized),
      void 0 !== t.Base && (this.Base = new tF.M$.Base(t.Base)))
    }
    ,
    n.TrendingSearchWordsResponse = function e(t) {
      (0,
          tU._)(this, e),
      t && (this.TrendingSearchWords = Array.isArray(t.TrendingSearchWords) ? t.TrendingSearchWords.map(function (e) {
        return new e8(e)
      }) : t.TrendingSearchWords,
      void 0 !== t.BaseResp && (this.BaseResp = new tF.M$.BaseResp(t.BaseResp)))
    }
    ,
    n.PostUserFYPInterestSelectorRequest = function e(t) {
      (0,
          tU._)(this, e),
      t && (this.FYPCategoryType = t.FYPCategoryType,
      void 0 !== t.Base && (this.Base = new tF.M$.Base(t.Base)))
    }
    ,
    n.PostUserFYPInterestSelectorResponse = function e(t) {
      (0,
          tU._)(this, e),
      t && void 0 !== t.BaseResp && (this.BaseResp = new tF.M$.BaseResp(t.BaseResp))
    }
    ,
    n.TrendingTopicInfo = tP = function e(t) {
      (0,
          tU._)(this, e),
      t && (this.SearchWords = t.SearchWords,
          this.Rank = t.Rank,
      void 0 !== t.Item && (this.Item = new eD(t.Item)))
    }
    ,
    n.GetTrendingTopicsInfoRequest = function e(t) {
      (0,
          tU._)(this, e),
      t && (this.Region = t.Region,
      void 0 !== t.Base && (this.Base = new tF.M$.Base(t.Base)))
    }
    ,
    n.GetTrendingTopicsInfoResponse = function e(t) {
      (0,
          tU._)(this, e),
      t && (this.TrendingTopics = Array.isArray(t.TrendingTopics) ? t.TrendingTopics.map(function (e) {
        return new tP(e)
      }) : t.TrendingTopics,
      void 0 !== t.BaseResp && (this.BaseResp = new tF.M$.BaseResp(t.BaseResp)))
    }
    ,
    n.UpdateUserSettingsRequest = function e(t) {
      (0,
          tU._)(this, e),
      t && (void 0 !== t.LanguageSettings && (this.LanguageSettings = new tG.M$.LanguageSettings(t.LanguageSettings)),
      void 0 !== t.Base && (this.Base = new tF.M$.Base(t.Base)))
    }
    ,
    n.UpdateUserSettingsResponse = function e(t) {
      (0,
          tU._)(this, e),
      t && void 0 !== t.BaseResp && (this.BaseResp = new tF.M$.BaseResp(t.BaseResp))
    }
    ,
    n.RecordImpressionActionRequest = function e(t) {
      (0,
          tU._)(this, e),
      t && (this.ItemIds = t.ItemIds,
      void 0 !== t.CommonParam && (this.CommonParam = new tG.M$.WebCommonParam(t.CommonParam)),
      void 0 !== t.IsNonPersonalized && (this.IsNonPersonalized = t.IsNonPersonalized),
      void 0 !== t.Language && (this.Language = t.Language),
      void 0 !== t.Region && (this.Region = t.Region),
      void 0 !== t.Extra && (this.Extra = t.Extra),
      void 0 !== t.IsForYouFeedImpression && (this.IsForYouFeedImpression = t.IsForYouFeedImpression),
      void 0 !== t.Base && (this.Base = new tF.M$.Base(t.Base)))
    }
    ,
    n.RecordImpressionActionResponse = function e(t) {
      (0,
          tU._)(this, e),
      t && void 0 !== t.BaseResp && (this.BaseResp = new tF.M$.BaseResp(t.BaseResp))
    }
    ,
    n.GetStoryItemListRequest = function e(t) {
      (0,
          tU._)(this, e),
      t && (this.AuthorId = t.AuthorId,
          this.Cursor = t.Cursor,
          this.Count = t.Count,
      void 0 !== t.Extra && (this.Extra = t.Extra),
      void 0 !== t.LoadBackward && (this.LoadBackward = t.LoadBackward),
      void 0 !== t.CommonParam && (this.CommonParam = new tG.M$.WebCommonParam(t.CommonParam)),
      void 0 !== t.ClientABVersions && (this.ClientABVersions = t.ClientABVersions),
      void 0 !== t.CoverFormat && (this.CoverFormat = t.CoverFormat),
      void 0 !== t.Language && (this.Language = t.Language),
      void 0 !== t.Base && (this.Base = new tF.M$.Base(t.Base)))
    }
    ,
    n.GetStoryItemListResponse = function e(t) {
      (0,
          tU._)(this, e),
      t && (void 0 !== t.StoryItemList && (this.StoryItemList = new tM(t.StoryItemList)),
      void 0 !== t.BaseResp && (this.BaseResp = new tF.M$.BaseResp(t.BaseResp)))
    }
    ,
    n.GetStoryBatchItemListRequest = function e(t) {
      (0,
          tU._)(this, e),
      t && (this.AuthorIds = t.AuthorIds,
      void 0 !== t.Extra && (this.Extra = t.Extra),
      void 0 !== t.CommonParam && (this.CommonParam = new tG.M$.WebCommonParam(t.CommonParam)),
      void 0 !== t.ClientABVersions && (this.ClientABVersions = t.ClientABVersions),
      void 0 !== t.CoverFormat && (this.CoverFormat = t.CoverFormat),
      void 0 !== t.CallScene && (this.CallScene = t.CallScene),
      void 0 !== t.InsertStoryId && (this.InsertStoryId = t.InsertStoryId),
      void 0 !== t.Language && (this.Language = t.Language),
      void 0 !== t.Base && (this.Base = new tF.M$.Base(t.Base)))
    }
    ,
    n.GetStoryBatchItemListResponse = function e(t) {
      (0,
          tU._)(this, e),
      t && (void 0 !== t.BatchStoryItemLists && (this.BatchStoryItemLists = Array.isArray(t.BatchStoryItemLists) ? t.BatchStoryItemLists.map(function (e) {
        return new tM(e)
      }) : t.BatchStoryItemLists),
      void 0 !== t.BaseResp && (this.BaseResp = new tF.M$.BaseResp(t.BaseResp)))
    }
    ,
    n.StoryItemListStruct = tM = function e(t) {
      (0,
          tU._)(this, e),
      t && (this.AuthorId = t.AuthorId,
          this.Items = Array.isArray(t.Items) ? t.Items.map(function (e) {
            return new eD(e)
          }) : t.Items,
          this.TotalCount = t.TotalCount,
          this.CurrentPosition = t.CurrentPosition,
          this.AllViewed = t.AllViewed,
          this.MinCursor = t.MinCursor,
          this.MaxCursor = t.MaxCursor,
          this.HasMoreBefore = t.HasMoreBefore,
          this.HasMoreAfter = t.HasMoreAfter,
      void 0 !== t.LastStoryCreatedAt && (this.LastStoryCreatedAt = t.LastStoryCreatedAt))
    }
    ,
    n.GetStoryViewerListRequest = function e(t) {
      (0,
          tU._)(this, e),
      t && (this.StoryId = t.StoryId,
      void 0 !== t.Cursor && (this.Cursor = t.Cursor),
      void 0 !== t.Count && (this.Count = t.Count),
      void 0 !== t.CommonParam && (this.CommonParam = new tG.M$.WebCommonParam(t.CommonParam)),
      void 0 !== t.Language && (this.Language = t.Language),
      void 0 !== t.Base && (this.Base = new tF.M$.Base(t.Base)))
    }
    ,
    n.GetStoryViewerListResponse = function e(t) {
      (0,
          tU._)(this, e),
      t && (this.StoryViewerList = Array.isArray(t.StoryViewerList) ? t.StoryViewerList.map(function (e) {
        return new tw(e)
      }) : t.StoryViewerList,
      void 0 !== t.TotalViewers && (this.TotalViewers = t.TotalViewers),
      void 0 !== t.HasMore && (this.HasMore = t.HasMore),
      void 0 !== t.Cursor && (this.Cursor = t.Cursor),
      void 0 !== t.BaseResp && (this.BaseResp = new tF.M$.BaseResp(t.BaseResp)))
    }
    ,
    n.StoryViewer = tw = function e(t) {
      (0,
          tU._)(this, e),
      t && (this.User = new e4(t.User),
          this.InteractionType = t.InteractionType,
      void 0 !== t.EmojiContent && (this.EmojiContent = t.EmojiContent),
      void 0 !== t.FlipCount && (this.FlipCount = t.FlipCount),
      void 0 !== t.ConversationId && (this.ConversationId = t.ConversationId),
      void 0 !== t.MessageId && (this.MessageId = t.MessageId),
      void 0 !== t.IsQuickEmojiReplied && (this.IsQuickEmojiReplied = t.IsQuickEmojiReplied))
    }
    ,
    n.GetStoryUserListRequest = function e(t) {
      (0,
          tU._)(this, e),
      t && (void 0 !== t.CommonParam && (this.CommonParam = new tG.M$.WebCommonParam(t.CommonParam)),
      void 0 !== t.Cursor && (this.Cursor = t.Cursor),
      void 0 !== t.Count && (this.Count = t.Count),
      void 0 !== t.StoryFeedScene && (this.StoryFeedScene = t.StoryFeedScene),
      void 0 !== t.IsNonPersonalized && (this.IsNonPersonalized = t.IsNonPersonalized),
      void 0 !== t.Language && (this.Language = t.Language),
      void 0 !== t.Base && (this.Base = new tF.M$.Base(t.Base)))
    }
    ,
    n.GetStoryUserListResponse = function e(t) {
      (0,
          tU._)(this, e),
      t && (void 0 !== t.StoryUsers && (this.StoryUsers = Array.isArray(t.StoryUsers) ? t.StoryUsers.map(function (e) {
        return new e4(e)
      }) : t.StoryUsers),
      void 0 !== t.HasMore && (this.HasMore = t.HasMore),
      void 0 !== t.Cursor && (this.Cursor = t.Cursor),
      void 0 !== t.TotalCount && (this.TotalCount = t.TotalCount),
      void 0 !== t.BaseResp && (this.BaseResp = new tF.M$.BaseResp(t.BaseResp)))
    }
    ,
    n.GetUserStoryListRequest = function e(t) {
      (0,
          tU._)(this, e),
      t && (void 0 !== t.AuthorIds && (this.AuthorIds = t.AuthorIds),
      void 0 !== t.CommonParam && (this.CommonParam = new tG.M$.WebCommonParam(t.CommonParam)),
      void 0 !== t.Language && (this.Language = t.Language),
      void 0 !== t.Base && (this.Base = new tF.M$.Base(t.Base)))
    }
    ,
    n.GetUserStoryListResponse = function e(t) {
      (0,
          tU._)(this, e),
      t && (void 0 !== t.StoryIdListStructs && (this.StoryIdListStructs = Array.isArray(t.StoryIdListStructs) ? t.StoryIdListStructs.map(function (e) {
        return new tO(e)
      }) : t.StoryIdListStructs),
      void 0 !== t.BaseResp && (this.BaseResp = new tF.M$.BaseResp(t.BaseResp)))
    }
    ,
    n.StoryIdListStruct = tO = function e(t) {
      (0,
          tU._)(this, e),
      t && (this.AuthorId = t.AuthorId,
      void 0 !== t.StoryIds && (this.StoryIds = t.StoryIds))
    }
    ,
    n.CreatorAICommentCategoryStruct = tB = function e(t) {
      (0,
          tU._)(this, e),
      t && (void 0 !== t.CategoryType && (this.CategoryType = t.CategoryType),
      void 0 !== t.CategoryName && (this.CategoryName = t.CategoryName),
      void 0 !== t.CommentCount && (this.CommentCount = t.CommentCount),
      void 0 !== t.Description && (this.Description = t.Description),
      void 0 !== t.SubDescription && (this.SubDescription = t.SubDescription))
    }
    ,
    n.CreatorAICommentStruct = tD = function e(t) {
      (0,
          tU._)(this, e),
      t && (void 0 !== t.HasAITopic && (this.HasAITopic = t.HasAITopic),
      void 0 !== t.TopicName && (this.TopicName = t.TopicName),
      void 0 !== t.CategoryList && (this.CategoryList = Array.isArray(t.CategoryList) ? t.CategoryList.map(function (e) {
        return new tB(e)
      }) : t.CategoryList),
      void 0 !== t.EligibleVideo && (this.EligibleVideo = t.EligibleVideo),
      void 0 !== t.TopicDescription && (this.TopicDescription = t.TopicDescription),
      void 0 !== t.TopicSubDescription && (this.TopicSubDescription = t.TopicSubDescription),
      void 0 !== t.Copyright && (this.Copyright = t.Copyright),
      void 0 !== t.LearnMoreText && (this.LearnMoreText = t.LearnMoreText),
      void 0 !== t.LearnMoreLink && (this.LearnMoreLink = t.LearnMoreLink),
      void 0 !== t.NotEligibleReason && (this.NotEligibleReason = t.NotEligibleReason))
    }
    ,
    tN.ProAccountStatus,
    tN.ProfileEmbedPermission,
    tN.RoomLandscape,
    tN.RoomMode,
    tN.ZoomCoverSizeEnum,
    tN.WarnInfoType,
    tN.DspPlatform,
    tN.MaskTypeEnum,
    tN.ContainerType,
    tN.PoiType,
    tN.PoiDetailTagContentType,
    tN.StickerTypeEnum,
    tN.LinkRisk,
    tN.UserRelation,
    tN.MutualType,
    tN.ExploreType,
    tN.DiscoverType,
    tN.FetchType,
    tN.PostItemListRequestType,
    tN.PullType,
    tN.LiveCardDisplay,
    tN.FilterReason;
    var tk = tN.ItemType;
    tN.MusicListType,
        tN.TrendingType,
        tN.IdType,
        tN.WebSystemNoticeDisplayType,
        tN.NoticeType,
        tN.AdsActionType,
        tN.AdsBiz,
        tN.CollectAction,
        tN.CreatorAICommentCategoryType,
        tN.UrlStruct,
        tN.BioLinkStruct,
        tN.CommerceUserInfoStruct,
        tN.ProAccountStruct,
        tN.RedDotInfo,
        tN.CreatorM10NSettings,
        tN.ProfileTab,
        tN.StateControlledMedia,
        tN.UserStruct,
        tN.NowReferralInfoStruct,
        tN.MetaStruct,
        tN.TextExtra,
        tN.LiveRoomStats,
        tN.UserStatsStruct,
        tN.UserStatsV2Struct,
        tN.LiveRoomInfoStruct,
        tN.VideoStruct,
        tN.CLAInfo,
        tN.OriginalLanguageInfo,
        tN.CaptionInfoStruct,
        tN.VolumeInfoStruct,
        tN.SubtitleInfo,
        tN.UrlStructV2,
        tN.BitrateStruct,
        tN.BitrateAudioStruct,
        tN.BitrateAudioUrlList,
        tN.AudioSubInfo,
        tN.DuetInfo,
        tN.WarnInfo,
        tN.CommentStruct,
        tN.StickerStatsStruct,
        tN.StickerStruct,
        tN.StickerInfoStruct,
        tN.MusicStruct,
        tN.TT2DspInfoStruct,
        tN.TT2DSP,
        tN.DspAuthToken,
        tN.AppleMusicToken,
        tN.PreciseDurationStruct,
        tN.MusicStatsStruct,
        tN.ChallengeStruct,
        tN.ItemStatsStruct,
        tN.ItemStatsV2Struct,
        tN.EffectStickerStruct,
        tN.StickerOnItemStruct,
        tN.ReviewStatusStruct,
        tN.ImagePostStruct,
        tN.ImageStruct,
        tN.StoryStruct,
        tN.NowStruct,
        tN.Content,
        tN.ItemStruct,
        tN.SubVideoMetaStruct,
        tN.VideoSuggestWordsList,
        tN.VideoSuggestWordsStruct,
        tN.VideoSuggestWord,
        tN.ItemAnchorMTStruct,
        tN.PoiInfoStruct,
        tN.PictureAlbum,
        tN.PoiReviewSummary,
        tN.PoiHighlightTagModule,
        tN.PoiIconTag,
        tN.DynamicIcon,
        tN.PoiDetailTag,
        tN.PoiPriceLevel,
        tN.PoiChartTag,
        tN.PoiDistanceInfo,
        tN.PoiPhoneInfo,
        tN.ItemInfoStruct,
        tN.ChallengeStatsStruct,
        tN.ChallengeStatsV2Struct,
        tN.ChallengeAnnouncementStruct,
        tN.ChallengeInfoStruct,
        tN.CategoryStruct,
        tN.CategoryInfoStruct,
        tN.UserInfoStruct,
        tN.UserRecommendInfo,
        tN.CommonUserData,
        tN.MutualUser,
        tN.MusicInfoStruct,
        tN.SearchRecoWordStruct,
        tN.TrendingSearchWord,
        tN.MultiGetUserAndPostInfoRequest,
        tN.MultiGetUserAndPostInfoResponse,
        tN.MultiGetUserRequest,
        tN.MultiGetUserResponse,
        tN.MultiGetMusicAndPostInfoRequest,
        tN.MultiGetMusicAndPostInfoResponse,
        tN.MultiGetChallengeAndPostInfoRequest,
        tN.MultiGetChallengeAndPostInfoResponse,
        tN.GetAMPChallengeAndPostInfoRequest,
        tN.GetAMPChallengeAndPostInfoResponse,
    tN.GetExploreHotIdsRequest,
    tN.GetExploreHotIdsResponse,
    tN.GetRelatedIdsRequest,
    tN.GetRelatedIdsResponse,
    tN.GetMusicDiscoverRequest,
    tN.GetMusicDiscoverResponse,
    tN.GetUserDiscoverRequest,
    tN.GetUserDiscoverResponse,
    tN.GetChallengeDiscoverRequest,
    tN.GetChallengeDiscoverResponse,
    tN.GetCategoryDiscoverRequest,
    tN.GetCategoryDiscoverResponse,
    tN.GetCreatorItemListRequest,
    tN.GetCreatorItemListResponse,
    tN.GetItemListRequest,
    tN.GetPreloadItemListRequest,
    tN.GetPreloadItemListResponse,
    tN.ABParams,
    tN.GetItemListResponse,
    tN.FilterReasonsStruct,
    tN.GetUserListRequest,
    tN.GetUserListResponse,
    tN.GetUserMusicListRequest,
    tN.GetUserMusicListResponse,
    tN.GetItemInfoRequest,
    tN.GetItemInfoResponse,
    tN.GetItemAvailabilityRequest,
    tN.ItemAvailability,
    tN.GetItemAvailabilityResponse,
    tN.CollectMusicRequest,
    tN.CollectMusicResponse,
    tN.GetEmbedItemInfoRequest,
    tN.GetEmbedItemInfoResponse,
    tN.MultiGetItemRequest,
    tN.MultiGetItemResponse,
    tN.GetUserInfoRequest,
    tN.GetUserInfoResponse,
    tN.GetMusicInfoRequest,
    tN.GetMusicInfoResponse,
    tN.GetStickerInfoRequest,
    tN.GetStickerInfoResponse,
    tN.GetLiveInfoRequest,
    tN.GetLiveInfoResponse,
    tN.GetChallengeInfoRequest,
    tN.GetChallengeInfoResponse,
    tN.GetRelatedChallengeListRequest,
    tN.GetRelatedChallengeListResponse,
    tN.GetChatInfoRequest,
    tN.GetChatInfoResponse,
    tN.TrendingStruct,
    tN.GetTrendingDiscoverRequest,
    tN.GetTrendingDiscoverResponse,
    tN.GetQuestionInfoRequest,
    tN.QuestionInfoStruct,
    tN.GetQuestionInfoResponse,
    tN.GetMixInfoRequest,
    tN.GetMixInfoResponse,
    tN.MixInfoStruct,
    tN.GetPlayListRequest,
    tN.GetPlayListResponse,
    tN.MixStruct,
    tN.GetCollectionInfoRequest,
    tN.GetCollectionInfoResponse,
    tN.CollectionInfoStruct,
    tN.GetCollectionListRequest,
    tN.GetCollectionListResponse,
    tN.GetUserQuestionListRequest,
    tN.GetUserQuestionListResponse,
    tN.GetUserAnswerListRequest,
    tN.GetUserAnswerListResponse,
    tN.AnswerStruct,
    tN.AnswerInfoStruct,
    tN.GetInboxNoticeListRequest,
    tN.WebNoticeGroupStruct,
    tN.GetInboxNoticeListResponse,
    tN.WebBaseNoticeListStruct,
    tN.WebBaseNoticeStruct,
    tN.GeneralNoticeTemplateStruct,
    tN.NoticeUITemplate,
    tN.TitleTemplateStruct,
    tN.PoiStatus,
    tN.GetPoiInfoRequest,
    tN.GetPoiInfoResponse,
    tN.GetRecentContactListRequest,
    tN.GetRecentContactListResponse,
    tN.MentionAtUser,
    tN.CommitAdsActionRequest,
    tN.CommitAdsActionResponse,
    tN.DeleteCommentRequest,
    tN.DeleteCommentResponse,
    tN.DiggCommentRequest,
    tN.DiggCommentResponse,
    tN.RethinkPopup,
    tN.PublishCommentResponse,
    tN.PublishCommentRequest,
    tN.ModifyPlaylistOrderRequest,
    tN.ModifyPlaylistOrderResponse,
    tN.CreatePlaylistWithItemsRequest,
    tN.CreatePlaylistWithItemsResponse,
    tN.GetAntiDirtNameCheckerRequest,
    tN.GetAntiDirtNameCheckerResponse,
    tN.CollectItemRequest,
    tN.CollectItemResponse,
    tN.ModifyPlaylistItemsRequest,
    tN.ModifyPlaylistItemsResponse,
    tN.ModifyPlaylistInfoRequest,
    tN.ModifyPlaylistInfoResponse,
    tN.DeletePlaylistRequest,
    tN.DeletePlaylistResponse,
    tN.CreateCollectionRequest,
    tN.CreateCollectionResponse,
    tN.DeleteCollectionRequest,
    tN.DeleteCollectionResponse,
    tN.ModifyCollectionInfoRequest,
    tN.ModifyCollectionInfoResponse,
    tN.ModifyCollectionItemsRequest,
    tN.ModifyCollectionItemsResponse,
    tN.MoveCollectionItemsRequest,
    tN.MoveCollectionItemsResponse,
    tN.GetInboxNoticeCountRequest,
    tN.WebNoticeCountStruct,
    tN.GetInboxNoticeCountResponse,
    tN.DislikeItemRequest,
    tN.DislikeItemResponse,
    tN.CommitFollowUserRequest,
    tN.CommitFollowUserResponse,
    tN.EventStruct,
    tN.AdVerificationStruct,
    tN.VastStruct,
    tN.AdInfoStruct,
    tN.AboutThisAdInfo,
    tN.AboutThisAdItem,
    tN.OrientationInfo,
    tN.ItemControlStruct,
    tN.CommitRemoveUserRequest,
    tN.CommitRemoveUserResponse,
    tN.TrendingSearchWordsRequest,
    tN.TrendingSearchWordsResponse,
    tN.PostUserFYPInterestSelectorRequest,
    tN.PostUserFYPInterestSelectorResponse,
    tN.TrendingTopicInfo,
    tN.GetTrendingTopicsInfoRequest,
    tN.GetTrendingTopicsInfoResponse,
    tN.UpdateUserSettingsRequest,
    tN.UpdateUserSettingsResponse,
    tN.RecordImpressionActionRequest,
    tN.RecordImpressionActionResponse,
    tN.GetStoryItemListRequest,
    tN.GetStoryItemListResponse,
    tN.GetStoryBatchItemListRequest,
    tN.GetStoryBatchItemListResponse,
    tN.StoryItemListStruct,
    tN.GetStoryViewerListRequest,
    tN.GetStoryViewerListResponse,
    tN.StoryViewer,
    tN.GetStoryUserListRequest,
    tN.GetStoryUserListResponse,
    tN.GetUserStoryListRequest,
    tN.GetUserStoryListResponse,
    tN.StoryIdListStruct,
    tN.CreatorAICommentCategoryStruct,
    tN.CreatorAICommentStruct,
    tN.AwemeWebExtensionService
  },
  15400: function (e, t, i) {
    i.d(t, {
      M$: function () {
        return s
      }
    });
    var n, o, s, r = i(95170);
    (n = s || (s = {})).TrafficEnv = o = function e(t) {
      (0,
          r._)(this, e),
          this.Open = !1,
          this.Env = "",
      t && (void 0 !== t.Open && (this.Open = t.Open),
      void 0 !== t.Env && (this.Env = t.Env))
    }
        ,
        n.Base = function e(t) {
          (0,
              r._)(this, e),
              this.LogID = "",
              this.Caller = "",
              this.Addr = "",
              this.Client = "",
          t && (void 0 !== t.LogID && (this.LogID = t.LogID),
          void 0 !== t.Caller && (this.Caller = t.Caller),
          void 0 !== t.Addr && (this.Addr = t.Addr),
          void 0 !== t.Client && (this.Client = t.Client),
          void 0 !== t.TrafficEnv && (this.TrafficEnv = new o(t.TrafficEnv)),
          void 0 !== t.Extra && (this.Extra = t.Extra))
        }
        ,
        n.BaseResp = function e(t) {
          (0,
              r._)(this, e),
              this.StatusMessage = "",
              this.StatusCode = 0,
          t && (void 0 !== t.StatusMessage && (this.StatusMessage = t.StatusMessage),
          void 0 !== t.StatusCode && (this.StatusCode = t.StatusCode),
          void 0 !== t.Extra && (this.Extra = t.Extra))
        }
        ,
        s.TrafficEnv,
        s.Base,
        s.BaseResp
  },
  96048: function (e, t, i) {
    i.d(t, {
      P: function () {
        return s
      }
    });
    var n = i(95170)
        , o = i(54333)
        , s = new (function () {
      function e() {
        (0,
            n._)(this, e),
            this.listeners = {}
      }

      var t = e.prototype;
      return t.on = function (e, t) {
        this.listeners[e] || (this.listeners[e] = []),
            this.listeners[e].push(t)
      }
          ,
          t.emit = function (e) {
            for (var t = arguments.length, i = Array(t > 1 ? t - 1 : 0), n = 1; n < t; n++)
              i[n - 1] = arguments[n];
            var s = this.listeners[e];
            s && s.forEach(function (e) {
              e.apply(void 0, (0,
                  o._)(i))
            })
          }
          ,
          t.off = function (e, t) {
            var i = this.listeners[e];
            i && (this.listeners[e] = i.filter(function (e) {
              return e !== t
            }))
          }
          ,
          e
    }())
  }
}]);
