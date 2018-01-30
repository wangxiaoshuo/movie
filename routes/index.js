var express = require('express');
var moment = require("moment");
var funs = require("../funs/funs");
var router = express.Router();

router.get("/test",function(req,res){
    res.render("test",{})
});
router.get("/play",function(req,res){
    res.render("play",{})
});
router.route("/avnum").get(function(req,res){
    res.render("avnum",{})
}).post(function(req,res){
    var movie = global.dbHandle.getModel("movie");
    movie.find({},function(err,doc){
        if(err){res.send(500)}
        else if(doc){
            res.send(doc)
        }
    })
})
/* GET home page. */
router.route('/').get(function(req, res, next) {
    var poster = global.dbHandle.getModel("poster");
    var movie = global.dbHandle.getModel("movie");
    var tv = global.dbHandle.getModel("tv");
    var gm = global.dbHandle.getModel("gm");
    var dc = global.dbHandle.getModel("dc");
    var ac = global.dbHandle.getModel("ac");
    poster.find({_id:{$lt:7}},function(err,doc){
        if(err){
            res.send(500)
        }else if(doc){
          var poster = JSON.stringify(doc)
            movie.find({},function(err,docL1){
                if(err){res.send(500)}
                else if(docL1){
                    var mvNum = docL1.length;
                    movie.find({},function(err,doc1){
                        var d1 = JSON.stringify(doc1);
                        if(err){
                            res.send(500)
                        }else if(doc1){
                            movie.find({},function(err,doc2){
                                if(err){res.send(500)}
                                else if(doc2){
                                    var d2 = JSON.stringify(doc2);
                                    tv.find({},function(err,docL2){
                                        if(err){res.send(500)}
                                        else if(docL2){
                                            var tvNum = docL2.length;
                                            tv.find({},function(err,doc3){
                                                if(err){res.send(500)}
                                                else if(doc3){
                                                    var d3 = JSON.stringify(doc3);
                                                    tv.find({},function(err,doc4){
                                                        if(err){res.send(500)}
                                                        else if(doc4){
                                                            var d4 = JSON.stringify(doc4);
                                                            ac.find({},function(err,docL3){
                                                                if(err){res.send(500)}
                                                                else if(docL3){
                                                                    var acNum = docL3.length;
                                                                    ac.find({},function(err,doc5){
                                                                        if(err){res.send(500)}
                                                                        else if(doc5){
                                                                            var d5 = JSON.stringify(doc5);
                                                                            ac.find({},function(err,doc6){
                                                                                if(err){res.send(500)}
                                                                                else if(doc6){
                                                                                    var d6=JSON.stringify(doc6);
                                                                                    gm.find({},function(err,docL4){
                                                                                        if(err){res.send(500)}
                                                                                        else if(docL4){
                                                                                            var gmNum = docL4.length;
                                                                                            gm.find({},function(err,doc7){
                                                                                                if(err){res.send(500)}
                                                                                                else if(doc7){
                                                                                                    var d7 = JSON.stringify(doc7);
                                                                                                    gm.find({},function(err,doc8){
                                                                                                        if(err){res.send(500)}
                                                                                                        else if(doc8){
                                                                                                            var d8 = JSON.stringify(doc8);
                                                                                                            dc.find({},function(err,docL5){
                                                                                                                if(err){res.send(500)}
                                                                                                                else if(docL5){
                                                                                                                    var dcNum = docL5.length;
                                                                                                                    dc.find({},function(err,doc9){
                                                                                                                        if(err) res.send(500);
                                                                                                                        else if(doc9){
                                                                                                                            var d9 = JSON.stringify(doc9);
                                                                                                                            dc.find({},function(err,doc10){
                                                                                                                                if(err){res.send(500)}
                                                                                                                                else if(doc10){
                                                                                                                                    var d10 = JSON.stringify(doc10);
                                                                                                                                    res.render("index",{
                                                                                                                                        /* 海报*/
                                                                                                                                        poster:poster,
                                                                                                                                        doc1:d1,
                                                                                                                                        doc2:d2,
                                                                                                                                        doc3:d3,
                                                                                                                                        doc4:d4,
                                                                                                                                        doc5:d5,
                                                                                                                                        doc6:d6,
                                                                                                                                        doc7:d7,
                                                                                                                                        doc8:d8,
                                                                                                                                        doc9:d9,
                                                                                                                                        doc10:d10,
                                                                                                                                        mvNum:mvNum,
                                                                                                                                        tvNum:tvNum,
                                                                                                                                        acNum:acNum,
                                                                                                                                        gmNum:gmNum,
                                                                                                                                        dcNum:dcNum,

                                                                                                                                    })
                                                                                                                                }
                                                                                                                            }).sort({playCount:-1}).limit(8)

                                                                                                                        }
                                                                                                                    }).sort({date:-1}).limit(8)
                                                                                                                }
                                                                                                            })
                                                                                                        }
                                                                                                    }).sort({playCount:-1}).limit(8)


                                                                                                }
                                                                                            }).sort({date:-1}).limit(8);
                                                                                        }
                                                                                    })

                                                                                }
                                                                            }).sort({score:-1}).limit(10)
                                                                        }

                                                                    }).sort({date:-1}).limit(10)
                                                                }
                                                            })


                                                        }
                                                    }).sort({playCount:-1}).limit(10);
                                                }
                                            }).sort({date:-1}).limit(10)
                                        }
                                    })

                                }
                            }).sort({score:-1}).limit(10);

                        }
                    }).sort({date:-1}).limit(10)
                }
            })


        }
    });
});

router.route("/mv").get(function(req,res){
    var movie = global.dbHandle.getModel("movie");
    var k = req.query.k;
    movie.find({},function(err,doc){
        var p = doc.length;
        console.log(p);
        movie.find({},function(err,doc1){
            if(err){res.send(500)}
            else if(doc1){
                var d = JSON.stringify(doc1);
                        movie.find({k:/1/},function(err,doc3){
                            if(err){res.send(500)}
                            else if(doc3){
                                var j = JSON.stringify(doc3)
                                movie.find({k:/2/},function(err,doc4){
                                    if(err){res.send(500)}
                                    else if(doc4){
                                        var jj = JSON.stringify(doc4)
                                        movie.find({k:/3/},function(err,doc2){
                                            if(err){res.send(500)}
                                            else if(doc2){
                                                var poster = JSON.stringify(doc2)
                                                res.render("mv",{length:p,k:k,d:d,poster:poster,j:j,jj:jj})
                                            }
                                        }).sort({date:-1}).limit(6)
                                    }
                                }).sort({date:-1}).limit(1)
                            }
                        }).sort({date:-1}).limit(4)
            }
        }).sort({score:-1}).limit(10)
    })
});
router.route("/last").get(function(req,res){
    var movie = global.dbHandle.getModel("movie");
    movie.find({},function(err,doc1){
        if(err){res.send(500)}
        else if(doc1){
            movie.find({},function(err,doc){
                if(err){
                    res.send(500)
                }else if(!doc.length){
                    res.send(500);
                }else{
                    console.log(doc[0].date)
                    console.log(doc1.length);
                    res.send({doc:doc,length:doc1.length})
                }
            }).sort({date:-1}).limit(20)
        }
    })
}).post(function(req,res){
    var movie = global.dbHandle.getModel("movie");
    var s = parseInt(req.body.s-1) * 20;
    movie.find({},function(err,doc1){
        if(err){res.send(500)}
        else if(doc1){
            var d = JSON.stringify(doc1);
            res.send(doc1)
        }
    }).sort({date:-1}).limit(20).skip(s)
});
var cn;
/*最近更新排序的country*/
router.route("/countryl").get(function(req,res){
    cn = req.query.cn;
    var movie = global.dbHandle.getModel("movie");
    movie.find({country:eval('/'+cn+'.*/i')},function(err,doc1){
        movie.find({country:eval('/'+cn+'.*/i')},function(err,doc){
            if(err){
                res.send(500)
            }else if(!doc.length){
                res.send(500);
            }else{
                console.log(doc1.length);
                res.send({doc:doc,length:doc1.length})
            }
        }).sort({date:-1}).limit(20)
    })

}).post(function(req,res){
    var movie = global.dbHandle.getModel("movie");
    var s = parseInt(req.body.s-1) * 20;
    console.log(cn)
    movie.find({country:eval('/'+cn+'.*/i')},function(err,doc1){
        if(err){res.send(500)}
        else if(doc1){
            var d = JSON.stringify(doc1);
            res.send(doc1)
        }
    }).sort({date:-1}).limit(20).skip(s)
});
/*oibip评分排序的country*/
router.route("/countrys").get(function(req,res){
    cn = req.query.cn;
    var movie = global.dbHandle.getModel("movie");
    movie.find({country:eval('/'+cn+'.*/i')},function(err,doc1){
        movie.find({country:eval('/'+cn+'.*/i')},function(err,doc){
            if(err){
                res.send(500)
            }else if(!doc.length){
                res.send(500);
            }else{
                console.log(doc1.length);
                res.send({doc:doc,length:doc1.length})
            }
        }).sort({score:-1}).limit(20)
    })

}).post(function(req,res){
    var movie = global.dbHandle.getModel("movie");
    var s = parseInt(req.body.s-1) * 20;
    console.log(cn)
    movie.find({country:eval('/'+cn+'.*/i')},function(err,doc1){
        if(err){res.send(500)}
        else if(doc1){
            var d = JSON.stringify(doc1);
            res.send(doc1)
        }
    }).sort({score:-1}).limit(20).skip(s)
});
var kind;
/*最近更新排序的kind*/
router.route("/kindl").get(function(req,res){
    kind = req.query.k;
    var movie = global.dbHandle.getModel("movie");
    console.log(kind);
    movie.find({kind:eval('/'+kind+'.*/i')},function(err,doc1){
        if(err){res.send(500)}
        else if(doc1){
            movie.find({kind:eval('/'+kind+'.*/i')},function(err,doc){
                if(err){
                    res.send(500)
                }else if(!doc.length){
                    res.send(500);
                }else{
                    console.log(doc)
                    console.log(doc1.length);
                    res.send({doc:doc,length:doc1.length})
                }
            }).sort({date:-1}).limit(20)
        }

    })
}).post(function(req,res){
    var movie = global.dbHandle.getModel("movie");
    var s = parseInt(req.body.s-1) * 20;
    console.log(kind);
    movie.find({kind:eval('/'+kind+'.*/i')},function(err,doc1){
        if(err){res.send(500)}
        else if(doc1){
            res.send(doc1)
        }
    }).sort({date:-1}).limit(20).skip(s)
});
/*oibip评分排序的kind*/
router.route("/kinds").get(function(req,res){
    kind = req.query.k;
    var movie = global.dbHandle.getModel("movie");
    console.log(kind);
    movie.find({kind:eval('/'+kind+'.*/i')},function(err,doc1){
        if(err){res.send(500)}
        else if(doc1){
            movie.find({kind:eval('/'+kind+'.*/i')},function(err,doc){
                if(err){
                    res.send(500)
                }else if(!doc.length){
                    res.send(500);
                }else{
                    console.log(doc)
                    console.log(doc1.length);
                    res.send({doc:doc,length:doc1.length})
                }
            }).sort({score:-1}).limit(20)
        }

    })
}).post(function(req,res){
    var movie = global.dbHandle.getModel("movie");
    var s = parseInt(req.body.s-1) * 20;
    console.log(kind);
    movie.find({kind:eval('/'+kind+'.*/i')},function(err,doc1){
        if(err){res.send(500)}
        else if(doc1){
            res.send(doc1)
        }
    }).sort({score:-1}).limit(20).skip(s)
});
router.route("/score").get(function(req,res){
    var movie = global.dbHandle.getModel("movie");
    movie.find({},function(err,doc1){
        movie.find({},function(err,doc){
            if(err){
                res.send(500)
            }else if(!doc.length){
                res.send(500);
            }else{
                console.log(doc1.length);
                res.send({doc:doc,length:doc1.length})
            }
        }).sort({score:-1}).limit(20)
    })
}).post(function(req,res){
    var movie = global.dbHandle.getModel("movie");
    var s = parseInt(req.body.s-1) * 20;
    movie.find({},function(err,doc1){
        if(err){res.send(500)}
        else if(doc1){
            var d = JSON.stringify(doc1);
            res.send(doc1)
        }
    }).sort({score:-1}).limit(20).skip(s)
});

/*最近更新下的综合排序*/
router.route("/complexn").get(function(req,res){
    var cn = req.query.cn;
    var kind = req.query.k;
    console.log(cn)
    console.log(kind)
    var movie = global.dbHandle.getModel("movie");
    movie.find({kind:eval('/'+kind+'.*/i'),country:eval('/'+cn+'.*/i')},function(err,doc1){
        if(err){res.send(500)}
        else if(doc1){
            movie.find({kind:eval('/'+kind+'.*/i'),country:eval('/'+cn+'.*/i')},function(err,doc){
                if(err){
                    res.send(500)
                }else if(!doc.length){
                    res.send(500);
                }else{
                    console.log(doc)
                    console.log(doc1.length);
                    res.send({doc:doc,length:doc1.length})
                }
            }).sort({date:-1}).limit(20)
        }
    })
}).post(function(req,res){
    var movie = global.dbHandle.getModel("movie");
    var s = parseInt(req.body.s-1) * 20;
    console.log(kind);
    movie.find({kind:eval('/'+kind+'.*/i'),country:eval('/'+cn+'.*/i')},function(err,doc1){
        if(err){res.send(500)}
        else if(doc1){
            res.send(doc1)
        }
    }).sort({date:-1}).limit(20).skip(s)
});
/*oibip评分下的综合排序*/
router.route("/complexs").get(function(req,res){
    var cn = req.query.cn;
    var kind = req.query.k;
    console.log(cn)
    console.log(kind)
    var movie = global.dbHandle.getModel("movie");
    movie.find({kind:eval('/'+kind+'.*/i'),country:eval('/'+cn+'.*/i')},function(err,doc1){
        if(err){res.send(500)}
        else if(doc1){
            movie.find({kind:eval('/'+kind+'.*/i'),country:eval('/'+cn+'.*/i')},function(err,doc){
                if(err){
                    res.send(500)
                }else if(!doc.length){
                    res.send(500);
                }else{
                    console.log(doc)
                    console.log(doc1.length);
                    res.send({doc:doc,length:doc1.length})
                }
            }).sort({score:-1}).limit(20)
        }
    })
}).post(function(req,res){
    var movie = global.dbHandle.getModel("movie");
    var s = parseInt(req.body.s-1) * 20;
    console.log(kind);
    movie.find({kind:eval('/'+kind+'.*/i'),country:eval('/'+cn+'.*/i')},function(err,doc1){
        if(err){res.send(500)}
        else if(doc1){
            res.send(doc1)
        }
    }).sort({score:-1}).limit(20).skip(s)
});

/*电视剧*/
router.route("/tv").get(function(req,res){
    var tv = global.dbHandle.getModel("tv");
    var k = req.query.k;
    tv.find({},function(err,doc){
        var p = doc.length;
        console.log(p);
        tv.find({},function(err,doc1){
            if(err){res.send(500)}
            else if(doc1){
                var d = JSON.stringify(doc1);
                        tv.find({k:/1/},function(err,doc3){
                            if(err){res.send(500)}
                            else if(doc3){
                                var j = JSON.stringify(doc3)
                                tv.find({k:/2/},function(err,doc4){
                                    if(err){res.send(500)}
                                    else if(doc4){
                                        var jj = JSON.stringify(doc4)
                                        tv.find({k:/3/},function(err,doc2){
                                            if(err){res.send(500)}
                                            else if(doc2){
                                                var poster = JSON.stringify(doc2)
                                                res.render("tv",{length:p,k:k,d:d,poster:poster,j:j,jj:jj})
                                            }
                                        }).sort({date:-1}).limit(6)
                                    }
                                }).sort({date:-1}).limit(1)
                            }
                        }).sort({date:-1}).limit(4)
            }
        }).sort({playCount:-1}).limit(10)
    })
});
router.route("/tvlast").get(function(req,res){
    var tv = global.dbHandle.getModel("tv");
    tv.find({},function(err,doc1){
        if(err){res.send(500)}
        else if(doc1){
            tv.find({},function(err,doc){
                if(err){
                    res.send(500)
                }else if(!doc.length){
                    res.send(500);
                }else{
                    console.log(doc[0].date)
                    console.log(doc1.length);
                    res.send({doc:doc,length:doc1.length})
                }
            }).sort({date:-1}).limit(20)
        }
    })
}).post(function(req,res){
    var tv = global.dbHandle.getModel("tv");
    var s = parseInt(req.body.s-1) * 20;
    tv.find({},function(err,doc1){
        if(err){res.send(500)}
        else if(doc1){
            var d = JSON.stringify(doc1);
            res.send(doc1)
        }
    }).sort({date:-1}).limit(20).skip(s)
});
var tvcn;
/*最近更新排序的country*/
router.route("/tvcountryl").get(function(req,res){
    tvcn = req.query.cn;
    var tv = global.dbHandle.getModel("tv");
    tv.find({country:eval('/'+tvcn+'.*/i')},function(err,doc1){
        tv.find({country:eval('/'+tvcn+'.*/i')},function(err,doc){
            if(err){
                res.send(500)
            }else if(!doc.length){
                res.send(500);
            }else{
                console.log(doc1.length);
                res.send({doc:doc,length:doc1.length})
            }
        }).sort({date:-1}).limit(20)
    })

}).post(function(req,res){
    var tv = global.dbHandle.getModel("tv");
    var s = parseInt(req.body.s-1) * 20;
    console.log(tvcn)
    tv.find({country:eval('/'+tvcn+'.*/i')},function(err,doc1){
        if(err){res.send(500)}
        else if(doc1){
            var d = JSON.stringify(doc1);
            res.send(doc1)
        }
    }).sort({date:-1}).limit(20).skip(s)
});
/*oibip评分排序的country*/
router.route("/tvcountrys").get(function(req,res){
    tvcn = req.query.cn;
    var tv = global.dbHandle.getModel("tv");
    tv.find({country:eval('/'+tvcn+'.*/i')},function(err,doc1){
        tv.find({country:eval('/'+tvcn+'.*/i')},function(err,doc){
            if(err){
                res.send(500)
            }else if(!doc.length){
                res.send(500);
            }else{
                console.log(doc1.length);
                res.send({doc:doc,length:doc1.length})
            }
        }).sort({playCount:-1}).limit(20)
    })

}).post(function(req,res){
    var tv = global.dbHandle.getModel("tv");
    var s = parseInt(req.body.s-1) * 20;
    console.log(cn)
    tv.find({country:eval('/'+tvcn+'.*/i')},function(err,doc1){
        if(err){res.send(500)}
        else if(doc1){
            var d = JSON.stringify(doc1);
            res.send(doc1)
        }
    }).sort({playCount:-1}).limit(20).skip(s)
});
var tvkind;
/*最近更新排序的kind*/
router.route("/tvkindl").get(function(req,res){
    tvkind = req.query.k;
    var tv = global.dbHandle.getModel("tv");
    console.log(tvkind);
    tv.find({kind:eval('/'+tvkind+'.*/i')},function(err,doc1){
        if(err){res.send(500)}
        else if(doc1){
            tv.find({kind:eval('/'+tvkind+'.*/i')},function(err,doc){
                if(err){
                    res.send(500)
                }else if(!doc.length){
                    res.send(500);
                }else{
                    console.log(doc)
                    console.log(doc1.length);
                    res.send({doc:doc,length:doc1.length})
                }
            }).sort({date:-1}).limit(20)
        }

    })
}).post(function(req,res){
    var tv = global.dbHandle.getModel("tv");
    var s = parseInt(req.body.s-1) * 20;
    console.log(tvkind);
    tv.find({kind:eval('/'+tvkind+'.*/i')},function(err,doc1){
        if(err){res.send(500)}
        else if(doc1){
            res.send(doc1)
        }
    }).sort({date:-1}).limit(20).skip(s)
});
/*oibip评分排序的kind*/
router.route("/tvkinds").get(function(req,res){
    tvkind = req.query.k;
    var tv = global.dbHandle.getModel("tv");
    console.log(kind);
    tv.find({kind:eval('/'+tvkind+'.*/i')},function(err,doc1){
        if(err){res.send(500)}
        else if(doc1){
            tv.find({kind:eval('/'+tvkind+'.*/i')},function(err,doc){
                if(err){
                    res.send(500)
                }else if(!doc.length){
                    res.send(500);
                }else{
                    console.log(doc)
                    console.log(doc1.length);
                    res.send({doc:doc,length:doc1.length})
                }
            }).sort({playCount:-1}).limit(20)
        }

    })
}).post(function(req,res){
    var tv = global.dbHandle.getModel("tv");
    var s = parseInt(req.body.s-1) * 20;
    console.log(kind);
    tv.find({kind:eval('/'+tvkind+'.*/i')},function(err,doc1){
        if(err){res.send(500)}
        else if(doc1){
            res.send(doc1)
        }
    }).sort({playCount:-1}).limit(20).skip(s)
});
router.route("/tvplaycount").get(function(req,res){
    var tv = global.dbHandle.getModel("tv");
    tv.find({},function(err,doc1){
        tv.find({},function(err,doc){
            if(err){
                res.send(500)
            }else if(!doc.length){
                res.send(500);
            }else{
                console.log(doc1.length);
                res.send({doc:doc,length:doc1.length})
            }
        }).sort({playCount:-1}).limit(20)
    })
}).post(function(req,res){
    var tv = global.dbHandle.getModel("tv");
    var s = parseInt(req.body.s-1) * 20;
    tv.find({},function(err,doc1){
        if(err){res.send(500)}
        else if(doc1){
            var d = JSON.stringify(doc1);
            res.send(doc1)
        }
    }).sort({playCount:-1}).limit(20).skip(s)
});

/*最近更新下的综合排序*/
router.route("/tvcomplexn").get(function(req,res){
    var tvcn = req.query.cn;
    var tvkind = req.query.k;
    console.log(tvcn)
    console.log(tvkind)
    var tv = global.dbHandle.getModel("tv");
    tv.find({kind:eval('/'+tvkind+'.*/i'),country:eval('/'+tvcn+'.*/i')},function(err,doc1){
        if(err){res.send(500)}
        else if(doc1){
            tv.find({kind:eval('/'+tvkind+'.*/i'),country:eval('/'+tvcn+'.*/i')},function(err,doc){
                if(err){
                    res.send(500)
                }else if(!doc.length){
                    res.send(500);
                }else{
                    console.log(doc)
                    console.log(doc1.length);
                    res.send({doc:doc,length:doc1.length})
                }
            }).sort({date:-1}).limit(20)
        }
    })
}).post(function(req,res){
    var tv = global.dbHandle.getModel("tv");
    var s = parseInt(req.body.s-1) * 20;
    console.log(tvkind);
    tv.find({kind:eval('/'+tvkind+'.*/i'),country:eval('/'+tvcn+'.*/i')},function(err,doc1){
        if(err){res.send(500)}
        else if(doc1){
            res.send(doc1)
        }
    }).sort({date:-1}).limit(20).skip(s)
});
/*oibip评分下的综合排序*/
router.route("/tvcomplexs").get(function(req,res){
    var tvcn = req.query.cn;
    var tvkind = req.query.k;
    console.log(tvcn)
    console.log(tvkind)
    var tv = global.dbHandle.getModel("tv");
    tv.find({kind:eval('/'+tvkind+'.*/i'),country:eval('/'+tvcn+'.*/i')},function(err,doc1){
        if(err){res.send(500)}
        else if(doc1){
            tv.find({kind:eval('/'+tvkind+'.*/i'),country:eval('/'+tvcn+'.*/i')},function(err,doc){
                if(err){
                    res.send(500)
                }else if(!doc.length){
                    res.send(500);
                }else{
                    console.log(doc)
                    console.log(doc1.length);
                    res.send({doc:doc,length:doc1.length})
                }
            }).sort({playCount:-1}).limit(20)
        }
    })
}).post(function(req,res){
    var tv = global.dbHandle.getModel("tv");
    var s = parseInt(req.body.s-1) * 20;
    console.log(kind);
    tv.find({kind:eval('/'+tvkind+'.*/i'),country:eval('/'+tvcn+'.*/i')},function(err,doc1){
        if(err){res.send(500)}
        else if(doc1){
            res.send(doc1)
        }
    }).sort({playCount:-1}).limit(20).skip(s)
});

/*动漫*/
router.route("/ac").get(function(req,res){
    var ac = global.dbHandle.getModel("ac");
    var k = req.query.k;
    ac.find({},function(err,doc){
        var p = doc.length;
        console.log(p);
        ac.find({},function(err,doc1){
            if(err){res.send(500)}
            else if(doc1){
                var d = JSON.stringify(doc1);
                        ac.find({k:/1/},function(err,doc3){
                            if(err){res.send(500)}
                            else if(doc3){
                                var j = JSON.stringify(doc3)
                                ac.find({k:/2/},function(err,doc4){
                                    if(err){res.send(500)}
                                    else if(doc4){
                                        var jj = JSON.stringify(doc4)
                                        ac.find({k:/3/},function(err,doc2){
                                            if(err){res.send(500)}
                                            else if(doc2){
                                                var poster = JSON.stringify(doc2)
                                                res.render("ac",{length:p,k:k,d:d,poster:poster,j:j,jj:jj})
                                            }
                                        }).sort({date:-1}).limit(6)
                                    }
                                }).sort({date:-1}).limit(1)
                            }
                        }).sort({date:-1}).limit(4)
            }
        }).sort({playCount:-1}).limit(10)
    })
});
router.route("/aclast").get(function(req,res){
    var ac = global.dbHandle.getModel("ac");
    ac.find({},function(err,doc1){
        if(err){res.send(500)}
        else if(doc1){
            ac.find({},function(err,doc){
                if(err){
                    res.send(500)
                }else if(!doc.length){
                    res.send(500);
                }else{
                    console.log(doc[0].date)
                    console.log(doc1.length);
                    res.send({doc:doc,length:doc1.length})
                }
            }).sort({date:-1}).limit(20)
        }
    })
}).post(function(req,res){
    var ac = global.dbHandle.getModel("ac");
    var s = parseInt(req.body.s-1) * 20;
    ac.find({},function(err,doc1){
        if(err){res.send(500)}
        else if(doc1){
            var d = JSON.stringify(doc1);
            res.send(doc1)
        }
    }).sort({date:-1}).limit(20).skip(s)
});
var accn;
/*最近更新排序的country*/
router.route("/accountryl").get(function(req,res){
    accn = req.query.cn;
    var ac = global.dbHandle.getModel("ac");
    ac.find({country:eval('/'+accn+'.*/i')},function(err,doc1){
        ac.find({country:eval('/'+accn+'.*/i')},function(err,doc){
            if(err){
                res.send(500)
            }else if(!doc.length){
                res.send(500);
            }else{
                console.log(doc1.length);
                res.send({doc:doc,length:doc1.length})
            }
        }).sort({date:-1}).limit(20)
    })

}).post(function(req,res){
    var ac = global.dbHandle.getModel("ac");
    var s = parseInt(req.body.s-1) * 20;
    console.log(accn)
    ac.find({country:eval('/'+accn+'.*/i')},function(err,doc1){
        if(err){res.send(500)}
        else if(doc1){
            var d = JSON.stringify(doc1);
            res.send(doc1)
        }
    }).sort({date:-1}).limit(20).skip(s)
});
/*oibip评分排序的country*/
router.route("/accountrys").get(function(req,res){
    accn = req.query.cn;
    var ac = global.dbHandle.getModel("ac");
    ac.find({country:eval('/'+accn+'.*/i')},function(err,doc1){
        ac.find({country:eval('/'+accn+'.*/i')},function(err,doc){
            if(err){
                res.send(500)
            }else if(!doc.length){
                res.send(500);
            }else{
                console.log(doc1.length);
                res.send({doc:doc,length:doc1.length})
            }
        }).sort({playCount:-1}).limit(20)
    })

}).post(function(req,res){
    var ac = global.dbHandle.getModel("ac");
    var s = parseInt(req.body.s-1) * 20;
    console.log(cn)
    ac.find({country:eval('/'+accn+'.*/i')},function(err,doc1){
        if(err){res.send(500)}
        else if(doc1){
            var d = JSON.stringify(doc1);
            res.send(doc1)
        }
    }).sort({playCount:-1}).limit(20).skip(s)
});
var ackind;
/*最近更新排序的kind*/
router.route("/ackindl").get(function(req,res){
    ackind = req.query.k;
    var ac = global.dbHandle.getModel("ac");
    console.log(ackind);
    ac.find({kind:eval('/'+ackind+'.*/i')},function(err,doc1){
        if(err){res.send(500)}
        else if(doc1){
            ac.find({kind:eval('/'+ackind+'.*/i')},function(err,doc){
                if(err){
                    res.send(500)
                }else if(!doc.length){
                    res.send(500);
                }else{
                    console.log(doc)
                    console.log(doc1.length);
                    res.send({doc:doc,length:doc1.length})
                }
            }).sort({date:-1}).limit(20)
        }

    })
}).post(function(req,res){
    var ac = global.dbHandle.getModel("ac");
    var s = parseInt(req.body.s-1) * 20;
    console.log(ackind);
    ac.find({kind:eval('/'+ackind+'.*/i')},function(err,doc1){
        if(err){res.send(500)}
        else if(doc1){
            res.send(doc1)
        }
    }).sort({date:-1}).limit(20).skip(s)
});
/*oibip评分排序的kind*/
router.route("/ackinds").get(function(req,res){
    ackind = req.query.k;
    var ac = global.dbHandle.getModel("ac");
    console.log(kind);
    ac.find({kind:eval('/'+ackind+'.*/i')},function(err,doc1){
        if(err){res.send(500)}
        else if(doc1){
            ac.find({kind:eval('/'+ackind+'.*/i')},function(err,doc){
                if(err){
                    res.send(500)
                }else if(!doc.length){
                    res.send(500);
                }else{
                    console.log(doc)
                    console.log(doc1.length);
                    res.send({doc:doc,length:doc1.length})
                }
            }).sort({playCount:-1}).limit(20)
        }

    })
}).post(function(req,res){
    var ac = global.dbHandle.getModel("ac");
    var s = parseInt(req.body.s-1) * 20;
    console.log(kind);
    ac.find({kind:eval('/'+ackind+'.*/i')},function(err,doc1){
        if(err){res.send(500)}
        else if(doc1){
            res.send(doc1)
        }
    }).sort({playCount:-1}).limit(20).skip(s)
});
router.route("/acplaycount").get(function(req,res){
    var ac = global.dbHandle.getModel("ac");
    ac.find({},function(err,doc1){
        ac.find({},function(err,doc){
            if(err){
                res.send(500)
            }else if(!doc.length){
                res.send(500);
            }else{
                console.log(doc1.length);
                res.send({doc:doc,length:doc1.length})
            }
        }).sort({playCount:-1}).limit(20)
    })
}).post(function(req,res){
    var ac = global.dbHandle.getModel("ac");
    var s = parseInt(req.body.s-1) * 20;
    ac.find({},function(err,doc1){
        if(err){res.send(500)}
        else if(doc1){
            var d = JSON.stringify(doc1);
            res.send(doc1)
        }
    }).sort({playCount:-1}).limit(20).skip(s)
});

/*最近更新下的综合排序*/
router.route("/accomplexn").get(function(req,res){
    var accn = req.query.cn;
    var ackind = req.query.k;
    console.log(accn)
    console.log(ackind)
    var ac = global.dbHandle.getModel("ac");
    ac.find({kind:eval('/'+ackind+'.*/i'),country:eval('/'+accn+'.*/i')},function(err,doc1){
        if(err){res.send(500)}
        else if(doc1){
            ac.find({kind:eval('/'+ackind+'.*/i'),country:eval('/'+accn+'.*/i')},function(err,doc){
                if(err){
                    res.send(500)
                }else if(!doc.length){
                    res.send(500);
                }else{
                    console.log(doc)
                    console.log(doc1.length);
                    res.send({doc:doc,length:doc1.length})
                }
            }).sort({date:-1}).limit(20)
        }
    })
}).post(function(req,res){
    var ac = global.dbHandle.getModel("ac");
    var s = parseInt(req.body.s-1) * 20;
    console.log(ackind);
    ac.find({kind:eval('/'+ackind+'.*/i'),country:eval('/'+accn+'.*/i')},function(err,doc1){
        if(err){res.send(500)}
        else if(doc1){
            res.send(doc1)
        }
    }).sort({date:-1}).limit(20).skip(s)
});
/*oibip评分下的综合排序*/
router.route("/accomplexs").get(function(req,res){
    var accn = req.query.cn;
    var ackind = req.query.k;
    console.log(accn)
    console.log(ackind)
    var ac = global.dbHandle.getModel("ac");
    ac.find({kind:eval('/'+ackind+'.*/i'),country:eval('/'+accn+'.*/i')},function(err,doc1){
        if(err){res.send(500)}
        else if(doc1){
            ac.find({kind:eval('/'+ackind+'.*/i'),country:eval('/'+accn+'.*/i')},function(err,doc){
                if(err){
                    res.send(500)
                }else if(!doc.length){
                    res.send(500);
                }else{
                    console.log(doc)
                    console.log(doc1.length);
                    res.send({doc:doc,length:doc1.length})
                }
            }).sort({playCount:-1}).limit(20)
        }
    })
}).post(function(req,res){
    var ac = global.dbHandle.getModel("ac");
    var s = parseInt(req.body.s-1) * 20;
    console.log(kind);
    ac.find({kind:eval('/'+ackind+'.*/i'),country:eval('/'+accn+'.*/i')},function(err,doc1){
        if(err){res.send(500)}
        else if(doc1){
            res.send(doc1)
        }
    }).sort({playCount:-1}).limit(20).skip(s)
});


/*游戏*/
router.route("/gm").get(function(req,res){
    var gm = global.dbHandle.getModel("gm");
    var k = req.query.k;
    gm.find({},function(err,doc){
        var p = doc.length;
        console.log(p);
        gm.find({},function(err,doc1){
            if(err){res.send(500)}
            else if(doc1){
                var d = JSON.stringify(doc1);
                        gm.find({k:/1/},function(err,doc3){
                            if(err){res.send(500)}
                            else if(doc3){
                                var j = JSON.stringify(doc3)
                                gm.find({k:/2/},function(err,doc4){
                                    if(err){res.send(500)}
                                    else if(doc4){
                                        var jj = JSON.stringify(doc4)
                                        gm.find({k:/3/},function(err,doc2){
                                            if(err){res.send(500)}
                                            else if(doc2){
                                                var poster = JSON.stringify(doc2)
                                                res.render("gm",{length:p,k:k,d:d,poster:poster,j:j,jj:jj})
                                            }
                                        }).sort({date:-1}).limit(6)
                                    }
                                }).sort({date:-1}).limit(1)
                            }
                        }).sort({date:-1}).limit(4)
            }
        }).sort({playCount:-1}).limit(10)
    })
});
router.route("/gmlast").get(function(req,res){
    var gm = global.dbHandle.getModel("gm");
    gm.find({},function(err,doc1){
        if(err){res.send(500)}
        else if(doc1){
            gm.find({},function(err,doc){
                if(err){
                    res.send(500)
                }else if(!doc.length){
                    res.send(500);
                }else{
                    console.log(doc[0].date)
                    console.log(doc1.length);
                    res.send({doc:doc,length:doc1.length})
                }
            }).sort({date:-1}).limit(20)
        }
    })
}).post(function(req,res){
    var gm = global.dbHandle.getModel("gm");
    var s = parseInt(req.body.s-1) * 20;
    gm.find({},function(err,doc1){
        if(err){res.send(500)}
        else if(doc1){
            var d = JSON.stringify(doc1);
            res.send(doc1)
        }
    }).sort({date:-1}).limit(20).skip(s)
});
var gmkind;
/*最近更新排序的kind*/
router.route("/gmkindl").get(function(req,res){
    gmkind = req.query.k;
    var gm = global.dbHandle.getModel("gm");
    console.log(gmkind);
    gm.find({kind:eval('/'+gmkind+'.*/i')},function(err,doc1){
        if(err){res.send(500)}
        else if(doc1){
            gm.find({kind:eval('/'+gmkind+'.*/i')},function(err,doc){
                if(err){
                    res.send(500)
                }else if(!doc.length){
                    res.send(500);
                }else{
                    console.log(doc)
                    console.log(doc1.length);
                    res.send({doc:doc,length:doc1.length})
                }
            }).sort({date:-1}).limit(20)
        }

    })
}).post(function(req,res){
    var gm = global.dbHandle.getModel("gm");
    var s = parseInt(req.body.s-1) * 20;
    console.log(gmkind);
    gm.find({kind:eval('/'+gmkind+'.*/i')},function(err,doc1){
        if(err){res.send(500)}
        else if(doc1){
            res.send(doc1)
        }
    }).sort({date:-1}).limit(20).skip(s)
});
/*oibip热门视频排序的kind*/
router.route("/gmkinds").get(function(req,res){
    gmkind = req.query.k;
    var gm = global.dbHandle.getModel("gm");
    console.log(kind);
    gm.find({kind:eval('/'+gmkind+'.*/i')},function(err,doc1){
        if(err){res.send(500)}
        else if(doc1){
            gm.find({kind:eval('/'+gmkind+'.*/i')},function(err,doc){
                if(err){
                    res.send(500)
                }else if(!doc.length){
                    res.send(500);
                }else{
                    console.log(doc)
                    console.log(doc1.length);
                    res.send({doc:doc,length:doc1.length})
                }
            }).sort({playCount:-1}).limit(20)
        }

    })
}).post(function(req,res){
    var gm = global.dbHandle.getModel("gm");
    var s = parseInt(req.body.s-1) * 20;
    console.log(kind);
    gm.find({kind:eval('/'+gmkind+'.*/i')},function(err,doc1){
        if(err){res.send(500)}
        else if(doc1){
            res.send(doc1)
        }
    }).sort({playCount:-1}).limit(20).skip(s)
});
router.route("/gmplaycount").get(function(req,res){
    var gm = global.dbHandle.getModel("gm");
    gm.find({},function(err,doc1){
        gm.find({},function(err,doc){
            if(err){
                res.send(500)
            }else if(!doc.length){
                res.send(500);
            }else{
                console.log(doc1.length);
                res.send({doc:doc,length:doc1.length})
            }
        }).sort({playCount:-1}).limit(20)
    })
}).post(function(req,res){
    var gm = global.dbHandle.getModel("gm");
    var s = parseInt(req.body.s-1) * 20;
    gm.find({},function(err,doc1){
        if(err){res.send(500)}
        else if(doc1){
            var d = JSON.stringify(doc1);
            res.send(doc1)
        }
    }).sort({playCount:-1}).limit(20).skip(s)
});


/*舞蹈mv*/
router.route("/dc").get(function(req,res){
    var dc = global.dbHandle.getModel("dc"),
        poster = global.dbHandle.getModel("poster")
    var k = req.query.k;
    dc.find({},function(err,doc){
        var p = doc.length;
        console.log(p);
        dc.find({},function(err,doc1){
            if(err){res.send(500)}
            else if(doc1){
                var d = JSON.stringify(doc1);
                        dc.find({kind:/1/},function(err,doc3){
                            if(err){res.send(500)}
                            else if(doc3){
                                var j = JSON.stringify(doc3)
                                dc.find({kind:/2/},function(err,doc4){
                                    if(err){res.send(500)}
                                    else if(doc4){
                                        var jj = JSON.stringify(doc4)
                                        dc.find({kind:/3/},function(err,doc2){
                                            if(err){res.send(500)}
                                            else if(doc2){
                                                var poster = JSON.stringify(doc2)
                                                res.render("dc",{length:p,k:k,d:d,poster:poster,j:j,jj:jj})
                                            }
                                        }).sort({date:-1}).limit(6)

                                    }
                                }).sort({date:-1}).limit(1)

                            }
                        }).sort({date:-1}).limit(4)
            }
        }).sort({playCount:-1}).limit(10)
    })
});
router.route("/dclast").get(function(req,res){
    var dc = global.dbHandle.getModel("dc");
    dc.find({},function(err,doc1){
        if(err){res.send(500)}
        else if(doc1){
            dc.find({},function(err,doc){
                if(err){
                    res.send(500)
                }else if(!doc.length){
                    res.send(500);
                }else{
                    console.log(doc[0].date)
                    console.log(doc1.length);
                    res.send({doc:doc,length:doc1.length})
                }
            }).sort({date:-1}).limit(20)
        }
    })
}).post(function(req,res){
    var dc = global.dbHandle.getModel("dc");
    var s = parseInt(req.body.s-1) * 20;
    dc.find({},function(err,doc1){
        if(err){res.send(500)}
        else if(doc1){
            var d = JSON.stringify(doc1);
            res.send(doc1)
        }
    }).sort({date:-1}).limit(20).skip(s)
});
var dckind;
/*最近更新排序的kind*/
router.route("/dckindl").get(function(req,res){
    dckind = req.query.k;
    var dc = global.dbHandle.getModel("dc");
    console.log(dckind);
    dc.find({kind:eval('/'+dckind+'.*/i')},function(err,doc1){
        if(err){res.send(500)}
        else if(doc1){
            dc.find({kind:eval('/'+dckind+'.*/i')},function(err,doc){
                if(err){
                    res.send(500)
                }else if(!doc.length){
                    res.send(500);
                }else{
                    console.log(doc)
                    console.log(doc1.length);
                    res.send({doc:doc,length:doc1.length})
                }
            }).sort({date:-1}).limit(20)
        }

    })
}).post(function(req,res){
    var dc = global.dbHandle.getModel("dc");
    var s = parseInt(req.body.s-1) * 20;
    console.log(dckind);
    dc.find({kind:eval('/'+dckind+'.*/i')},function(err,doc1){
        if(err){res.send(500)}
        else if(doc1){
            res.send(doc1)
        }
    }).sort({date:-1}).limit(20).skip(s)
});
/*oibip热门视频排序的kind*/
router.route("/dckinds").get(function(req,res){
    dckind = req.query.k;
    var dc = global.dbHandle.getModel("dc");
    console.log(kind);
    dc.find({kind:eval('/'+dckind+'.*/i')},function(err,doc1){
        if(err){res.send(500)}
        else if(doc1){
            dc.find({kind:eval('/'+dckind+'.*/i')},function(err,doc){
                if(err){
                    res.send(500)
                }else if(!doc.length){
                    res.send(500);
                }else{
                    console.log(doc)
                    console.log(doc1.length);
                    res.send({doc:doc,length:doc1.length})
                }
            }).sort({playCount:-1}).limit(20)
        }

    })
}).post(function(req,res){
    var dc = global.dbHandle.getModel("dc");
    var s = parseInt(req.body.s-1) * 20;
    console.log(kind);
    dc.find({kind:eval('/'+dckind+'.*/i')},function(err,doc1){
        if(err){res.send(500)}
        else if(doc1){
            res.send(doc1)
        }
    }).sort({playCount:-1}).limit(20).skip(s)
});
router.route("/dcplaycount").get(function(req,res){
    var dc = global.dbHandle.getModel("dc");
    dc.find({},function(err,doc1){
        dc.find({},function(err,doc){
            if(err){
                res.send(500)
            }else if(!doc.length){
                res.send(500);
            }else{
                console.log(doc1.length);
                res.send({doc:doc,length:doc1.length})
            }
        }).sort({playCount:-1}).limit(20)
    })
}).post(function(req,res){
    var dc = global.dbHandle.getModel("dc");
    var s = parseInt(req.body.s-1) * 20;
    dc.find({},function(err,doc1){
        if(err){res.send(500)}
        else if(doc1){
            var d = JSON.stringify(doc1);
            res.send(doc1)
        }
    }).sort({playCount:-1}).limit(20).skip(s)
});
/*处理排序*/


/*判断username是否登陆*/
router.get("/userSession",function(req,res){
    if(!req.session.user){
        res.send(500);
    }else{
        res.send(200);
    }
});

/*处理搜索框检索*/
router.route("/search").get(function(req,res){
    var n = req.query.name;
    console.log(n)
    var movie = global.dbHandle.getModel("movie");
    movie.find({name:eval('/'+n+'.*/gi')},function(err,doc){
        if(err){
            res.send(500)
        }else if(!doc.length){
            res.send(500);
        }else{
            res.send(doc)
        }
    }).sort({score:-1})
});
router.route("/search1").get(function(req,res){
    var n = req.query.name;
    var movie = global.dbHandle.getModel("movie");
    movie.find({name:n},function(err,doc){
        if(err){
            res.send(500)
        }else if(!doc.length){
            res.send(500);
        }else{
            res.send(doc)
        }
    }).sort({score:-1})
});
router.route('/tv/detail/:id').get(function(req,res){
    var id = req.query.id;
    var tv = global.dbHandle.getModel("tv");
    console.log(id);
    tv.findOne({"_id":id},function(err,doc){
        if(err){
            res.send(500)
        }else if(doc){
            var actor = doc.actor,
                name = doc.name,
                country = doc.country,
                doctor = doc.doctor,
                kind = doc.kind,
                year = doc.year,
                date = moment(doc.date).format("YYYY-MM-DD"),
                poster = doc.poster,
                summary = doc.summary,
                playUrl = doc.playUrl,
                score = doc.score,
                id = doc._id,
                commentCount = doc.commentCount;
            res.render("detail",{
                actor:actor,id:id,score:score,commentCount:commentCount,
                poster:poster,kind:kind,name:name,country:country,doctor:doctor,
                year:year,date:date,summary:summary,playUrl:playUrl

            })
        }
    });

}).post(function(req,res){
    if(!req.session.user){
        res.send(500)
    } else{
        res.send(200)
    }
});
router.route('/play/mv/:id').get(function(req,res){
    var id = req.query.id;
    var movie = global.dbHandle.getModel("movie");
    console.log(id);
    movie.findOne({"_id":id},function(err,doc){
        if(err){
            res.send(500)
        }else if(doc){
            var actor = doc.actor,
                name = doc.name,
                country = doc.country,
                doctor = doc.doctor,
                kind = doc.kind,
                year = doc.year,
                date = moment(doc.date).format("YYYY-MM-DD"),
                poster = doc.poster,
                summary = doc.summary,
                playUrl = doc.playUrl,
                score = doc.score,
                id = doc._id,
                commentCount = doc.commentCount;
            movie.find({k:/1/},function(err,doc3){
                if(err){res.send(500)}
                else if(doc3){
                    var j = JSON.stringify(doc3)
                    movie.find({k:/2/},function(err,doc4){
                        if(err){res.send(500)}
                        else if(doc4){
                            var jj = JSON.stringify(doc4)
                            res.render("play",{
                                actor:actor,id:id,score:score,commentCount:commentCount,
                                poster:poster,kind:kind,name:name,country:country,doctor:doctor,
                                year:year,date:date,summary:summary,playUrl:playUrl,
                                doc:doc,j:j,jj:jj
                            })
                        }
                    }).sort({date:-1}).limit(1)
                }
            }).sort({date:-1}).limit(8)

        }
    });

}).post(function(req,res){
   if(!req.session.user){
       res.send(500)
   } else{
       res.send(200)
   }
});


router.route("/login").get(function(req,res,next){
    res.render("login",{title:"login"})
}).post(function(req,res){
    var user = global.dbHandle.getModel("user");
    var uname = req.body.username;
    var upwd = req.body.password;
        user.findOne({name:uname},function(err,doc){
            if(err){
                res.send(500);
                console.log(err);
            }else if(!doc){
                req.session.error = "null";
                res.send(404);
            }else if(upwd !=doc.password){
                      req.session.error = "error password";
                      res.send(404);
                  }else{
                    req.session.user = doc;
                    res.send(200)
            }

        })

});
router.route("/touser").get(function(req,res,next){
    res.render("touser",{title:"TOUSERL"})
}).post(function(req,res){
    var user = global.dbHandle.getModel("user");
    var uname = req.body.username;
    var upwd = req.body.password;
    user.findOne({name:uname},function(err,doc){
        if(err){
            res.send(500);
            console.log(err);
        }else if(!doc){
            req.session.error = "null";
            res.send(404);
        }else if(upwd !=doc.password){
            req.session.error = "error password";
            res.send(404);
        }else{
            req.session.user = doc;
            res.send(200)
        }

    })

});


router.route("/register").get(function(req,res,next){
    res.render("register",{title:"register"})
}).post(function(req,res){
    var user = global.dbHandle.getModel("user");
    var uname1 = req.body.username;
    var upwd1 = req.body.password;
    user.findOne({name:uname1},function(err,doc){
        if(err){
            res.send(500);
            req.session.error = "网络错误";
            console.log(err);
        }else if(doc){
            req.session.error = "用户名已存在";
            res.send(500);
        }else{
            user.create({
                name:uname1,
                password:upwd1
            },function(err,doc){
                if(err){
                    res.send(500);
                    console.log(err);
                }else{
                    req.session.error = "用户名创建成功";
                    res.send(200);
                }
            })
        }
    })
});

router.route("/tvupdate").get(function(req,res,next){
    res.render("tvupdate",{})
}).post(function(req,res){
    var tv = global.dbHandle.getModel("tv");
    var name = req.body.name;
    var doctor = req.body.doctor,
        actor = req.body.actor,
        _id = req.body.id,
        country = req.body.country,
        summary = req.body.summary,
        poster = req.body.poster,
        maxPoster = req.body.maxPoster,
        minPoster = req.body.minPoster,
        playUrl = req.body.playUrl,
        year = req.body.year,
        date = req.body.date,
        score = req.body.score,
        count = req.body.count,
        commentCount = req.body.commentCount,
        kind = req.body.kind,
        k = req.body.k;
    tv.findOne({"name":name},function(err,doc){
        if(err){
            res.send(500);
        }else if(doc){
            tv.update({"name":name},{$set:{"_id":_id,"doctor":doctor,"actor":actor,"country":country,"score":score,"playCount":count,"commentCount":commentCount,"kind":kind,"k":k,
                    "summary":summary,
                    "poster":poster,
                "maxPoster":maxPoster,
                "minPoster":minPoster,
                    "playUrl":playUrl,
                    "year":year,
                    "date":date}},
                function(err){
                    if(err){res.send(500);console.log(err)}
                    else{res.send(200);}
                });
        }else{
            tv.create({
                _id:_id,
                name:name,
                score:score,
                playCount:count,
                commentCount:commentCount,
                kind:kind,
                k:k,
                doctor:doctor,
                actor:actor,
                country:country,
                summary:summary,
                poster:poster,
                maxPoster:maxPoster,
                minPoster:minPoster,
                playUrl:playUrl,
                year:year,
                date:date
            },function(err,doc){
                if(err){
                    res.send(500);
                    console.log(err)
                }else{
                    res.send(200)
                }
            })
        }
    })
});

router.route("/acupdate").get(function(req,res,next){
    res.render("acupdate",{})
}).post(function(req,res){
    var ac = global.dbHandle.getModel("ac");
    var name = req.body.name;
    var doctor = req.body.doctor,
        actor = req.body.actor,
        _id = req.body.id,
        country = req.body.country,
        summary = req.body.summary,
        poster = req.body.poster,
        maxPoster = req.body.maxPoster,
        minPoster = req.body.minPoster,
        playUrl = req.body.playUrl,
        year = req.body.year,
        date = req.body.date,
        score = req.body.score,
        count = req.body.count,
        commentCount = req.body.commentCount,
        kind = req.body.kind,
        k = req.body.k;
    ac.findOne({"name":name},function(err,doc){
        if(err){
            res.send(500);
        }else if(doc){
            ac.update({"name":name},{$set:{"_id":_id,"doctor":doctor,"actor":actor,"country":country,"score":score,"playCount":count,"commentCount":commentCount,"kind":kind,"k":k,
                    "summary":summary,
                    "poster":poster,
                "maxPoster":maxPoster,
                "minPoster":minPoster,
                    "playUrl":playUrl,
                    "year":year,
                    "date":date}},
                function(err){
                    if(err){res.send(500);console.log(err)}
                    else{res.send(200);}
                });
        }else{
            ac.create({
                _id:_id,
                name:name,
                score:score,
                playCount:count,
                commentCount:commentCount,
                kind:kind,
                k:k,
                doctor:doctor,
                actor:actor,
                country:country,
                summary:summary,
                poster:poster,
                maxPoster:maxPoster,
                minPoster:minPoster,
                playUrl:playUrl,
                year:year,
                date:date
            },function(err,doc){
                if(err){
                    res.send(500);
                    console.log(err)
                }else{
                    res.send(200)
                }
            })
        }
    })
});

router.route("/gmupdate").get(function(req,res,next){
    res.render("gmupdate",{})
}).post(function(req,res){
    var gm = global.dbHandle.getModel("gm");
    var name = req.body.name;
    var doctor = req.body.doctor,
        playTime = req.body.playTime,
        _id = req.body.id,
        poster = req.body.poster,
        maxPoster = req.body.maxPoster,
        minPoster = req.body.minPoster,
        playUrl = req.body.playUrl,
        date = req.body.date,
        count = req.body.count,
        kind = req.body.kind,
        k = req.body.k;
    gm.findOne({"name":name},function(err,doc){
        if(err){
            res.send(500);
        }else if(doc){
            gm.update({"name":name},{$set:{"_id":_id,"doctor":doctor,"playTime":playTime,"playCount":count,"kind":kind,
                "k":k,
                    "poster":poster,
                "maxPoster":maxPoster,
                "minPoster":minPoster,
                    "playUrl":playUrl,
                    "date":date}},
                function(err){
                    if(err){res.send(500);console.log(err)}
                    else{res.send(200);}
                });
        }else{
            gm.create({
                _id:_id,
                name:name,
                playCount:count,
                kind:kind,
                k:k,
                doctor:doctor,
                playTime:playTime,
                poster:poster,
                maxPoster:maxPoster,
                minPoster:minPoster,
                playUrl:playUrl,
                date:date
            },function(err,doc){
                if(err){
                    res.send(500);
                    console.log(err)
                }else{
                    res.send(200)
                }
            })
        }
    })
});
router.route("/dcupdate").get(function(req,res,next){
    res.render("dcupdate",{})
}).post(function(req,res){
    var dc = global.dbHandle.getModel("dc");
    var name = req.body.name;
    var doctor = req.body.doctor,
        playTime = req.body.playTime,
        _id = req.body.id,
        poster = req.body.poster,
        maxPoster = req.body.maxPoster,
        minPoster = req.body.minPoster,
        playUrl = req.body.playUrl,
        date = req.body.date,
        count = req.body.count,
        kind = req.body.kind,
        k = req.body.dck;
    dc.findOne({"name":name},function(err,doc){
        if(err){
            res.send(500);
        }else if(doc){
            dc.update({"name":name},{$set:{"_id":_id,"doctor":doctor,"playTime":playTime,"playCount":count,"kind":kind,
                "k":k,
                    "poster":poster,
                "minPoster":minPoster,
                "maxPoster":maxPoster,
                    "playUrl":playUrl,
                    "date":date}},
                function(err){
                    if(err){res.send(500);console.log(err)}
                    else{res.send(200);}
                });
        }else{
            dc.create({
                _id:_id,
                name:name,
                playCount:count,
                kind:kind,
                k:k,
                doctor:doctor,
                playTime:playTime,
                poster:poster,
                maxPoster:maxPoster,
                minPoster:minPoster,
                playUrl:playUrl,
                date:date
            },function(err,doc){
                if(err){
                    res.send(500);
                    console.log(err)
                }else{
                    res.send(200)
                }
            })
        }
    })
});
router.route("/admin").get(function(req,res,next){
    res.render("admin",{})
}).post(function(req,res){
   var movie = global.dbHandle.getModel("movie");
   var name = req.body.name;
   var doctor = req.body.doctor,
       actor = req.body.actor,
       _id = req.body.id,
       country = req.body.country,
       summary = req.body.summary,
       poster = req.body.poster,
       maxPoster = req.body.maxPoster,
       minPoster = req.body.minPoster,
       playUrl = req.body.playUrl,
       year = req.body.year,
       date = req.body.date,
       score = req.body.score,
       count = req.body.count,
       commentCount = req.body.commentCount,
       kind = req.body.kind,
       k = req.body.k;
   movie.findOne({"name":name},function(err,doc){
       if(err){
           res.send(500);
       }else if(doc){
           movie.update({"name":name},{$set:{"_id":_id,"doctor":doctor,"actor":actor,"country":country,"score":score,"playCount":count,"commentCount":commentCount,"kind":kind,"k":k,
               "summary":summary,
               "poster":poster,
               "minPoster":minPoster,
               "maxPoster":maxPoster,
               "playUrl":playUrl,
               "year":year,
               "date":date}},
               function(err){
               if(err){res.send(500);console.log(err)}
               else{res.send(200);}
           });
       }else{
           movie.create({
               _id:_id,
               name:name,
               score:score,
               playCount:count,
               commentCount:commentCount,
               kind:kind,
               k:k,
               doctor:doctor,
               actor:actor,
               country:country,
               summary:summary,
               poster:poster,
               minPoster:minPoster,
               maxPoster:maxPoster,
               playUrl:playUrl,
               year:year,
               date:date
           },function(err,doc){
               if(err){
                   res.send(500);
                   console.log(err)
               }else{
                   res.send(200)
               }
           })
       }
   })
});
router.route("/admin1").get(function(req,res){    /*轮播海报更新*/
   res.render("admin1",{})
}).post(function(req,res){
    var poster = global.dbHandle.getModel("poster");
    var posterUrl = req.body.poster,
        name = req.body.name,
        id = req.body.id,
        minPosterUrl = req.body.minPosterUrl;
    poster.findOne({"_id":id},function(err,doc){
        if(err){
            res.send(500)
        }else if(doc){
            poster.update({"_id":id},{$set:{"posterName":name,"posterUrl":posterUrl,"minPosterUrl":minPosterUrl}},function(err,doc){
                if(err){
                    res.send(500)
                }else{
                    res.send(200)
                }
            })
        }else{
            poster.create({
                posterUrl:posterUrl,
                _id:id,
                posterName:name,
                minPosterUrl:minPosterUrl
            },function(err,doc){
                if(err){
                    res.send(500)
                }else{
                    res.send(200)
                }
            })
        }
    })

});
router.route("/admin2").get(function (req,res) {    /*电影海报更换*/
   res.send(200)
}).post(function(req,res){
    var movie = global.dbHandle.getModel("movie");
    var name = req.body.name,
        poster = req.body.poster;
    movie.update({name:name},{$set:{poster:poster}},function(err,doc){
        if(err){
            res.send(500)
        }else{
            res.send(200)
        }
    })
});
router.route("/mvSearch").get(function(req,res){
  res.send(200)
}).post(function(req,res){
    var movie = global.dbHandle.getModel("movie");
    var name = req.body.name;
    movie.find({name:name},function(err,doc){
        if(err){
            res.send(500)
        }else if(doc){
            res.send(doc)
        }
    })
})//电影查询
router.route("/avDel").get(function(req,res){
    res.send(200)
}).post(function(req,res){
    var movie = global.dbHandle.getModel("movie");
    var name = req.body.name;
    movie.remove({name:name},function(err,doc){
        if(err){
            res.send(500)
        }else{
            res.send(200)
        }
    })
})//电影删除


router.get("/logout",function(req,res){
   req.session.user = null;
   req.session.error = null;
   res.redirect("/");
});
router.route("/user/:id").get(function(req,res){
    var id = req.query.id;
    var user = global.dbHandle.getModel("user");
    user.find({_id:id},function(err,doc){
        if(err){
            res.send(500)
        }else if(doc){
            var ifo = JSON.stringify(doc);
            res.render("user",{ifo:ifo})
        }
    })
}).post(function(req,res){
    res.send(200)
});
router.route("/edit").get(function(req,res){
    res.send(200)
}).post(function(req,res){
    var user = global.dbHandle.getModel("user");
    var name = req.body.name,
        password = req.body.password,
        phone = req.body.phone,
        mail = req.body.mail,
        favourite = req.body.favourite,
        signature = req.body.signature;
    user.update({"name":name},{$set:{
        "password":password,"phone":phone,"mail":mail,"favourite":favourite,"signature":signature
        }},
        function(err){
            if(err){res.send(500);}
            else{res.send(200);}
        });

})
router.route("/user").get(function(req,res){
   res.render("user",{})
}).post(function(req,res){
    if(!req.session.user){
        res.send(500);
    }else{
        res.send(200);
    }
});
module.exports = router;
