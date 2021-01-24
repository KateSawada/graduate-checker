/*
    メモ

    サバイバルの扱いどうなのか→随意科目，卒業要件には入らない
*/
//卒業要件[最低, 最高(これ以上とっても反映されない)]  上限ナシの場合は1000に設定
//totalは，そのカテゴリの合計を表す(詳細は学部の便覧p34~39)
//lectは，必修の講義名
//requiredCred[0]: 情報システム系 requiredCred[1]: 知能システム系


const requiredCred = [
    {
        zengakukyouiku: {
            total: [44, 1000],
            zengakukiso: {
                total: [16, 1000],
                lect: [],
                kisemi: [2, 1000],
                eigo: [6, 1000],
                nigai: [6, 1000],
                kensupo: [2, 1000]      
            },
            kisokyouyou: {
                total: [10, 1000],
                lect: [],
                bunkeikamoku: [6, 1000],
                rikeikyouyou: [2, 1000],
                zengakukyouyou: [2, 1000]
            },
            rikeikiso: {
                total: [17, 1000],
                lect: ["微分積分学1", "微分積分学2", "線形代数学1", "線形代数学2", "物理学基礎1", "物理学基礎2", "物理学実験"]
            }
        },
        senmon: {
            total: [84, 1000],
            senmonkiso: {
                total: [30, 34],
                lect: [
                    "インフォマティックス1", "インフォマティックス2", "インフォマティックス3", "インフォマティックス4",
                    "情報の挑戦者・開拓者たち", "情報セキュリティとリテラシー1", "情報セキュリティとリテラシー2（CS）", "プログラミング1（CS）", "プログラミング2（CS）",
                    "離散数学及び演習（CS）", "論理設計及び演習1（CS）", "論理設計及び演習2（CS）", "情報理論（CS）", "確率統計及び演習", "アルゴリズム1（CS）", "アルゴリズム2（CS）",
                    "システム数学及び演習1", "システム数学及び演習2", "論理学1", "論理学2c（CS）", "データマイニング入門（CS）"
                ]
            },
            senmonkamoku: {
                total: [42, 50],
                lect: [
                    "情報倫理と法", "ソフトウエア開発法及び演習", "オブジェクト指向言語及び演習", "代数的構造", "オートマトン・形式言語及び演習", "符号理論", "数値解析及び演習", 
                    "計算機アーキテクチャ基礎及び演習1", "計算機アーキテクチャ基礎及び演習2", "コンパイラ", "データベース1", "データベース2", "最適化1", "最適化2", 
                    "人工知能基礎1", "人工知能基礎2", "コンピュータ科学実験1", "コンピュータ科学実験2", "コンピュータ科学実験3",
                    //以下情シスのみ
                    "非手続型言語及び演習", "先端計算機アーキテクチャ1", "先端計算機アーキテクチャ2", "オペレーティング・システム及び演習1", "オペレーティング・システム及び演習2",
                    "ソフトウェア設計法1", "ソフトウェア設計法2", "情報ネットワーク", "ネットワークセキュリティ", "計算理論"
                ]
            },
            kanrensenmon: {
                total: [2, 10]
            }
        }
    },
    {
        zengakukyouiku: {
            total: [44, 1000],
            zengakukiso: {
                total: [16, 1000],
                lect: [],
                kisemi: [2, 1000],
                eigo: [6, 1000],
                nigai: [6, 1000],
                kensupo: [2, 1000]      
            },
            kisokyouyou: {
                total: [10, 1000],
                lect: [],
                bunkei: [6, 1000],
                rikeikyouyou: [2, 1000],
                zengakukyouyou: [2, 1000]
            },
            rikeikiso: {
                total: [17, 1000],
                lect: ["微分積分学1", "微分積分学2", "線形代数学1", "線形代数学2", "物理学基礎1", "物理学基礎2", "物理学実験"]
            }
        },
        senmon: {
            total: [84, 0],
            senmonkiso: {
                total: [30, 34],
                lect: [
                    "インフォマティックス1", "インフォマティックス2", "インフォマティックス3", "インフォマティックス4",
                    "情報の挑戦者・開拓者たち", "情報セキュリティとリテラシー1", "情報セキュリティとリテラシー2（CS）", "プログラミング1（CS）", "プログラミング2（CS）",
                    "離散数学及び演習（CS）", "論理設計及び演習1（CS）", "論理設計及び演習2（CS）", "情報理論（CS）", "確率統計及び演習", "アルゴリズム1（CS）", "アルゴリズム2（CS）",
                    "システム数学及び演習1", "システム数学及び演習2", "論理学1", "論理学2c（CS）", "データマイニング入門（CS）"
                ]
            },
            senmonkamoku: {
                total: [42, 50],
                lect: [
                    "情報倫理と法", "ソフトウエア開発法及び演習", "オブジェクト指向言語及び演習", "代数的構造", "オートマトン・形式言語及び演習", "符号理論", "数値解析及び演習", 
                    "計算機アーキテクチャ基礎及び演習1", "計算機アーキテクチャ基礎及び演習2", "コンパイラ", "データベース1", "データベース2", "最適化1", "最適化2", 
                    "人工知能基礎1", "人工知能基礎2", "コンピュータ科学実験1", "コンピュータ科学実験2", "コンピュータ科学実験3",
                    //以下知シスのみ
                    "数理統計学", "機械学習", "信号処理", "自然言語処理1", "自然言語処理2", "生体情報処理", "画像処理", "知能ロボットシステム制御"
                ]
            },
            kanrensenmon: {
                total: [2, 10]
            }
        }
    }
]

/*
    name: 講義名
    type: 講義区分
    seme: s/q セメスターorクオーター
    cred: 単位数
    ↓例
{
    name: "講義名",
    type: "理系教養科目",
    seme: "s",
    cred: 2
}
*/

const lectureData = {
    spring1: {
        mon: {
            time1: [
                {
                    name: "複素関数論",
                    type: "理系基礎(理系)",
                    seme: "s",
                    cred: 2
                },
                {
                    name: "情報セキュリティとリテラシー1",
                    type: "専門基礎科目",
                    seme: "q",
                    cred: 1
                },
                {
                    name: "信号処理",
                    type: "専門科目(コンピュータ科)",
                    seme: "q",
                    cred: 2
                }
            ],
            time2: [
                {
                    name: "微分積分学1",
                    type: "理系基礎(理系)",
                    seme: "s",
                    cred: 2
                },
                {
                    name: "心の科学",
                    type: "専門基礎科目",
                    seme: "q",
                    cred: 1
                },
                {
                    name: "信号処理",
                    type: "専門科目(コンピュータ科)",
                    seme: "q",
                    cred: 2
                },
                {
                    name: "情報哲学",
                    type: "専門科目(人間・社会情報)",
                    seme: "q",
                    cred: 1
                },
                {
                    name: "計算情報学5",
                    type: "専門科目(自然情報)",
                    seme: "q",
                    cred: 1
                },
                {
                    name: "計算情報学11",
                    type: "専門科目(自然情報)",
                    seme: "q",
                    cred: 1
                }
            ],
            time3: [
                {
                    name: "地球科学基礎1",
                    type: "理系基礎(理系)",
                    seme: "s",
                    cred: 2
                },
                {
                    name: "離散数学及び演習（自然，人社）",
                    type: "専門基礎科目",
                    seme: "q",
                    cred: 2
                },
                {
                    name: "離散数学及び演習（CS）",
                    type: "専門基礎科目",
                    seme: "q",
                    cred: 2
                },
                {
                    name: "計算機アーキテクチャ基礎及び演習1",
                    type: "専門科目(コンピュータ科)",
                    seme: "q",
                    cred: 1.5
                },
                {
                    name: "情報美学",
                    type: "専門科目(人間・社会情報)",
                    seme: "q",
                    cred: 1
                },
                {
                    name: "数理情報学演習7",
                    type: "専門科目(自然情報)",
                    seme: "q",
                    cred: 1
                },
                {
                    name: "複雑システム系演習5",
                    type: "専門科目(自然情報)",
                    seme: "q",
                    cred: 1
                }
            ],
            time4: [
                {
                    name: "基礎セミナーA",
                    type: "基礎セミナー",
                    seme: "s",
                    cred: 2
                },
                {
                    name: "離散数学及び演習（自然，人社）",
                    type: "専門基礎科目",
                    seme: "q",
                    cred: 2
                },
                {
                    name: "離散数学及び演習（CS）",
                    type: "専門基礎科目",
                    seme: "q",
                    cred: 2
                },
                {
                    name: "計算機アーキテクチャ基礎及び演習1",
                    type: "専門科目(コンピュータ科)",
                    seme: "q",
                    cred: 1.5
                },
                {
                    name: "心理・認知科学実験2",
                    type: "専門科目(人間・社会情報)",
                    seme: "q",
                    cred: 2
                },
                {
                    name: "計算情報学12",
                    type: "専門科目(自然情報)",
                    seme: "q",
                    cred: 1
                }
            ],
            time5: [
                {
                    name: "基礎セミナーA",
                    type: "基礎セミナー",
                    seme: "s",
                    cred: 2
                },
                {
                    name: "情報社会デザイン論",
                    type: "専門科目(人間・社会情報)",
                    seme: "q",
                    cred: 1
                },
                {
                    name: "心理・認知科学実験2",
                    type: "専門科目(人間・社会情報)",
                    seme: "q",
                    cred: 2
                }
            ]
        },
        tue: {
            time1: [
                {
                    name: "英語(サバイバル)",
                    type: "言語文化1英",
                    seme: "s",
                    cred: 0
                },
                {
                    name: "英語(基礎)",
                    type: "言語文化1英",
                    seme: "s",
                    cred: 1
                },
                {
                    name: "ことばの不思議",
                    type: "文系教養科目",
                    seme: "s",
                    cred: 2
                },
                {
                    name: "表象と文化",
                    type: "文系教養科目",
                    seme: "s",
                    cred: 2
                },
                {
                    name: "現代社会と教育",
                    type: "文系教養科目",
                    seme: "s",
                    cred: 2
                },
                {
                    name: "現代社会と法",
                    type: "文系教養科目",
                    seme: "s",
                    cred: 2
                },
                {
                    name: "市場経済と社会",
                    type: "文系教養科目",
                    seme: "s",
                    cred: 2
                },
                {
                    name: "社会と環境",
                    type: "文系教養科目",
                    seme: "s",
                    cred: 2
                },
                {
                    name: "芸術と人間",
                    type: "文系教養科目",
                    seme: "s",
                    cred: 2
                },
                {
                    name: "情報リテラシー（理系）",
                    type: "理系教養科目",
                    seme: "s",
                    cred: 2
                },
                {
                    name: "情報科学入門",
                    type: "理系教養科目",
                    seme: "s",
                    cred: 2
                },
                {
                    name: "物理現象の科学",
                    type: "理系教養科目",
                    seme: "s",
                    cred: 2
                },
                {
                    name: "現代医療と生命科学",
                    type: "理系教養科目",
                    seme: "s",
                    cred: 2
                },
                {
                    name: "食と農の科学",
                    type: "理系教養科目",
                    seme: "s",
                    cred: 2
                },
                {
                    name: "地球惑星の科学",
                    type: "理系教養科目",
                    seme: "s",
                    cred: 2
                },
                {
                    name: "自然環境と人間社会",
                    type: "理系教養科目",
                    seme: "s",
                    cred: 2
                },
                {
                    name: "大気水圏環境の科学",
                    type: "理系教養科目",
                    seme: "s",
                    cred: 2
                },
                {
                    name: "博物館概論",
                    type: "理系教養科目",
                    seme: "s",
                    cred: 2
                },
                {
                    name: "名大の歴史をたどる",
                    type: "全学教養科目",
                    seme: "s",
                    cred: 2
                },
                {
                    name: "学問の面白さを知る",
                    type: "全学教養科目",
                    seme: "s",
                    cred: 2
                },
                {
                    name: "特別講義（社会安全学入門）",
                    type: "全学教養科目",
                    seme: "s",
                    cred: 2
                },
                {
                    name: "大学でどう学ぶか",
                    type: "全学教養科目",
                    seme: "s",
                    cred: 2
                },
                {
                    name: "非手続型言語及び演習",
                    type: "専門科目(コンピュータ科)",
                    seme: "q",
                    cred: 2
                }
            ],
            time2: [
                {
                    name: "二外1",
                    type: "言語文化1二",
                    seme: "s",
                    cred: 1.5
                },
                {
                    name: "現代芸術論",
                    type: "全学教養科目",
                    seme: "s",
                    cred: 2
                },
                {
                    name: "芸術と人間精神",
                    type: "全学教養科目",
                    seme: "s",
                    cred: 2
                },
                {
                    name: "表象芸術論",
                    type: "全学教養科目",
                    seme: "s",
                    cred: 2
                },
                {
                    name: "音楽芸術論",
                    type: "全学教養科目",
                    seme: "s",
                    cred: 2
                },
                {
                    name: "科学・技術の倫理",
                    type: "全学教養科目",
                    seme: "s",
                    cred: 2
                },
                {
                    name: "科学技術社会論",
                    type: "全学教養科目",
                    seme: "s",
                    cred: 2
                },
                {
                    name: "宗教と人類文化",
                    type: "全学教養科目",
                    seme: "s",
                    cred: 2
                },
                {
                    name: "切迫する自然災害に備える",
                    type: "全学教養科目",
                    seme: "s",
                    cred: 2
                },
                {
                    name: "ジェンダーの視点から考える２１世紀の日本社会",
                    type: "全学教養科目",
                    seme: "s",
                    cred: 2
                },
                {
                    name: "ピア・カウンセリング",
                    type: "全学教養科目",
                    seme: "s",
                    cred: 2
                },
                {
                    name: "特別講義（青年期を考える‐心の健康と将来展望‐）",
                    type: "全学教養科目",
                    seme: "s",
                    cred: 2
                },
                {
                    name: "留学生と日本",
                    type: "全学教養科目",
                    seme: "s",
                    cred: 2
                },
                {
                    name: "特別講義（英語・プレゼンテーションＡ１）",
                    type: "全学教養科目",
                    seme: "s",
                    cred: 2
                },
                {
                    name: "非手続型言語及び演習",
                    type: "専門科目(コンピュータ科)",
                    seme: "q",
                    cred: 2
                },
                {
                    name: "博物館展示情報論",
                    type: "専門科目(人間・社会情報)",
                    seme: "q",
                    cred: 1
                }
            ],
            time3: [
                {
                    name: "英語(基礎)",
                    type: "言語文化1英",
                    seme: "s",
                    cred: 1
                },
                {
                    name: "情報創造",
                    type: "専門基礎科目",
                    seme: "q",
                    cred: 1
                },
                {
                    name: "計算機アーキテクチャ基礎及び演習2",
                    type: "専門科目(コンピュータ科)",
                    seme: "q",
                    cred: 1.5
                },
                {
                    name: "社会心理学演習",
                    type: "専門科目(人間・社会情報)",
                    seme: "q",
                    cred: 2
                },
                {
                    name: "数理情報学演習5",
                    type: "専門科目(自然情報)",
                    seme: "q",
                    cred: 1
                },
                {
                    name: "計算情報学4",
                    type: "専門科目(自然情報)",
                    seme: "q",
                    cred: 1
                }
            ],
            time4: [
                {
                    name: "線形代数学1",
                    type: "理系基礎(理系)",
                    seme: "s",
                    cred: 2
                },
                {
                    name: "特別講義（フランス語・アカデミックライティングⅠ）",
                    type: "全学教養科目",
                    seme: "s",
                    cred: 2
                },
                {
                    name: "社会調査",
                    type: "専門基礎科目",
                    seme: "q",
                    cred: 1
                },
                {
                    name: "計算機アーキテクチャ基礎及び演習2",
                    type: "専門科目(コンピュータ科)",
                    seme: "q",
                    cred: 1.5
                },
                {
                    name: "社会心理学演習",
                    type: "専門科目(人間・社会情報)",
                    seme: "q",
                    cred: 2
                },
                {
                    name: "数理情報学演習6",
                    type: "専門科目(自然情報)",
                    seme: "q",
                    cred: 1
                }
            ],
            time5: [
                {
                    name: "基礎セミナーA",
                    type: "基礎セミナー",
                    seme: "s",
                    cred: 2
                },
                {
                    name: "特別講義（囲碁の世界）",
                    type: "全学教養科目",
                    seme: "s",
                    cred: 2
                },
                {
                    name: "社会情報系演習1",
                    type: "専門科目(人間・社会情報)",
                    seme: "q",
                    cred: 1
                }
            ]
        },
        wed: {
            time1: [
                {
                    name: "生物学基礎1",
                    type: "理系基礎(理系)",
                    seme: "s",
                    cred: 2
                },
                {
                    name: "データマイニング入門（自然，人社）",
                    type: "専門基礎科目",
                    seme: "q",
                    cred: 1
                },
                {
                    name: "データマイニング入門（CS）",
                    type: "専門基礎科目",
                    seme: "q",
                    cred: 1
                },
                {
                    name: "物質情報学4",
                    type: "専門科目(自然情報)",
                    seme: "q",
                    cred: 1
                }
            ],
            time2: [
                {
                    name: "健康スポーツ科学実習1",
                    type: "健康スポーツ科学",
                    seme: "s",
                    cred: 1
                },
                {
                    name: "複雑系科学の基礎",
                    type: "専門基礎科目",
                    seme: "q",
                    cred: 1
                },
                {
                    name: "情報倫理と法",
                    type: "専門科目",
                    seme: "q",
                    cred: 1
                }
            ],
            time3: [
                {
                    name: "物理学基礎1",
                    type: "理系基礎(理系)",
                    seme: "s",
                    cred: 2
                },
                {
                    name: "特別講義（英語・プレゼンテーションＢ１）",
                    type: "全学教養科目",
                    seme: "s",
                    cred: 2
                },
                {
                    name: "クリエイティブ・ネットワーキング",
                    type: "専門基礎科目",
                    seme: "q",
                    cred: 1
                },
                {
                    name: "心理学の歴史と方法1",
                    type: "専門科目(人間・社会情報)",
                    seme: "q",
                    cred: 1
                }
            ],
            time4: [
                {
                    name: "感じる情報学",
                    type: "専門基礎科目",
                    seme: "q",
                    cred: 1
                }
            ],
            time5: [
                
            ]
        },
        thu: {
            time1: [
                {
                    name: "哲学",
                    type: "文系基礎科目",
                    seme: "s",
                    cred: 2
                },
                {
                    name: "地理学",
                    type: "文系基礎科目",
                    seme: "s",
                    cred: 2
                },
                {
                    name: "心理学1",
                    type: "文系基礎科目",
                    seme: "s",
                    cred: 2
                },
                {
                    name: "心理学2",
                    type: "文系基礎科目",
                    seme: "s",
                    cred: 2
                },
                {
                    name: "法学",
                    type: "文系基礎科目",
                    seme: "s",
                    cred: 2
                },
                {
                    name: "経済学A",
                    type: "文系基礎科目",
                    seme: "s",
                    cred: 2
                },
                {
                    name: "国際開発学",
                    type: "文系基礎科目",
                    seme: "s",
                    cred: 2
                },
                {
                    name: "英語(上級)",
                    type: "言語文化1英",
                    seme: "s",
                    cred: 2
                },
                {
                    name: "機械学習",
                    type: "専門科目(コンピュータ科)",
                    seme: "q",
                    cred: 2
                },
                {
                    name: "数理情報学11",
                    type: "専門科目(自然情報)",
                    seme: "q",
                    cred: 1
                },
                {
                    name: "物質情報学5",
                    type: "専門科目(自然情報)",
                    seme: "q",
                    cred: 1
                }
            ],
            time2: [
                {
                    name: "二外2",
                    type: "言語文化1二",
                    seme: "s",
                    cred: 1.5
                },
                {
                    name: "情報と国際社会",
                    type: "専門基礎科目",
                    seme: "q",
                    cred: 1
                },
                {
                    name: "機械学習",
                    type: "専門科目(コンピュータ科)",
                    seme: "q",
                    cred: 2
                },
                {
                    name: "システム検証及び演習",
                    type: "専門科目(コンピュータ科)",
                    seme: "q",
                    cred: 1
                },
                {
                    name: "心理・認知科学特殊講義A1",
                    type: "専門科目(人間・社会情報)",
                    seme: "q",
                    cred: 1
                },
                {
                    name: "数理情報学12",
                    type: "専門科目(自然情報)",
                    seme: "q",
                    cred: 1
                },
                {
                    name: "計算情報学2",
                    type: "専門科目(自然情報)",
                    seme: "q",
                    cred: 1
                }
            ],
            time3: [
                {
                    name: "物理学実験",
                    type: "理系基礎(理系)",
                    seme: "s",
                    cred: 1.5
                },
                {
                    name: "コンピュータ科学実験1",
                    type: "専門科目(コンピュータ科)",
                    seme: "q",
                    cred: 1.5
                },
                {
                    name: "社会システム論",
                    type: "専門科目(人間・社会情報)",
                    seme: "q",
                    cred: 1
                },
                {
                    name: "認知心理学演習",
                    type: "専門科目(人間・社会情報)",
                    seme: "q",
                    cred: 2
                },
                {
                    name: "数理情報学3",
                    type: "専門科目(自然情報)",
                    seme: "q",
                    cred: 1
                },
                {
                    name: "物質情報学11",
                    type: "専門科目(自然情報)",
                    seme: "q",
                    cred: 1
                },
                {
                    name: "複雑システム系演習1",
                    type: "専門科目(自然情報)",
                    seme: "q",
                    cred: 1
                }
            ],
            time4: [
                {
                    name: "物理学実験",
                    type: "理系基礎(理系)",
                    seme: "s",
                    cred: 1.5
                },
                {
                    name: "コンピュータ科学実験1",
                    type: "専門科目(コンピュータ科)",
                    seme: "q",
                    cred: 1.5
                },
                {
                    name: "認知心理学演習",
                    type: "専門科目(人間・社会情報)",
                    seme: "q",
                    cred: 2
                },
                {
                    name: "数理情報学4",
                    type: "専門科目(自然情報)",
                    seme: "q",
                    cred: 1
                }
            ],
            time5: [
                {
                    name: "基礎セミナーA",
                    type: "基礎セミナー",
                    seme: "s",
                    cred: 2
                },
                {
                    name: "コンピュータ科学実験1",
                    type: "専門科目(コンピュータ科)",
                    seme: "q",
                    cred: 1.5
                },
                {
                    name: "社会情報系演習5",
                    type: "専門科目(人間・社会情報)",
                    seme: "q",
                    cred: 1
                }
            ]
        },
        fri: {
            time1: [
                {
                    name: "健康スポーツ科学講義",
                    type: "健康スポーツ科学",
                    seme: "s",
                    cred: 2
                },
                {
                    name: "数値解析及び演習",
                    type: "専門科目(コンピュータ科)",
                    seme: "q",
                    cred: 2
                },
                {
                    name: "知能ロボットシステム制御",
                    type: "専門科目(コンピュータ科)",
                    seme: "q",
                    cred: 2
                }
            ],
            time2: [
                {
                    name: "化学基礎1",
                    type: "理系基礎(理系)",
                    seme: "s",
                    cred: 2
                },
                {
                    name: "歴史学",
                    type: "文系基礎科目",
                    seme: "s",
                    cred: 2
                },
                {
                    name: "社会学",
                    type: "文系基礎科目",
                    seme: "s",
                    cred: 2
                },
                {
                    name: "教育学",
                    type: "文系基礎科目",
                    seme: "s",
                    cred: 2
                },
                {
                    name: "政治学",
                    type: "文系基礎科目",
                    seme: "s",
                    cred: 2
                },
                {
                    name: "経営学",
                    type: "文系基礎科目",
                    seme: "s",
                    cred: 2
                },
                {
                    name: "数値解析及び演習",
                    type: "専門科目(コンピュータ科)",
                    seme: "q",
                    cred: 2
                },
                {
                    name: "知能ロボットシステム制御",
                    type: "専門科目(コンピュータ科)",
                    seme: "q",
                    cred: 2
                },
                {
                    name: "ソーシャルメディアと観光・コミュニティ",
                    type: "専門科目(人間・社会情報)",
                    seme: "q",
                    cred: 1
                }
            ],
            time3: [
                {
                    name: "情報の挑戦者・開拓者たち",
                    type: "専門基礎科目",
                    seme: "q",
                    cred: 2
                },
                {
                    name: "オブジェクト指向言語及び演習",
                    type: "専門科目(コンピュータ科)",
                    seme: "q",
                    cred: 1
                },
                {
                    name: "数理情報学序論1",
                    type: "専門科目(自然情報)",
                    seme: "q",
                    cred: 1
                }
            ],
            time4: [
                {
                    name: "情報の挑戦者・開拓者たち",
                    type: "専門基礎科目",
                    seme: "q",
                    cred: 2
                },
                {
                    name: "ソフトウエア開発法及び演習",
                    type: "専門科目(コンピュータ科)",
                    seme: "q",
                    cred: 1
                },
                {
                    name: "情報と職業2",
                    type: "専門科目",
                    seme: "q",
                    cred: 1
                }
            ],
            time5: [
                {
                    name: "基礎セミナーA",
                    type: "基礎セミナー",
                    seme: "s",
                    cred: 2
                },
                {
                    name: "特別講義（Ｓｔｕｄｉｕｍ　ＧｅｎｅｒａｌｅⅡ）",
                    type: "全学教養科目",
                    seme: "s",
                    cred: 2
                }
            ]
        },

    },
    spring2: {
        mon: {
            time1: [
                {
                    name: "情報セキュリティとリテラシー2（自然）",
                    type: "専門基礎科目",
                    seme: "q",
                    cred: 1
                },
                {
                    name: "情報セキュリティとリテラシー2（人社）",
                    type: "専門基礎科目",
                    seme: "q",
                    cred: 1
                },
                {
                    name: "情報セキュリティとリテラシー2（CS）",
                    type: "専門基礎科目",
                    seme: "q",
                    cred: 1
                }
            ],
            time2: [
                {
                    name: "オートマトン・形式言語及び演習",
                    type: "専門科目(コンピュータ科)",
                    seme: "q",
                    cred: 3
                },
                {
                    name: "脳と心B",
                    type: "専門科目(人間・社会情報)",
                    seme: "q",
                    cred: 1
                },
                {
                    name: "物質情報学3",
                    type: "専門科目(自然情報)",
                    seme: "q",
                    cred: 1
                }
            ],
            time3: [
                {
                    name: "オートマトン・形式言語及び演習",
                    type: "専門科目(コンピュータ科)",
                    seme: "q",
                    cred: 3
                },
                {
                    name: "情報芸術論",
                    type: "専門科目(人間・社会情報)",
                    seme: "q",
                    cred: 1
                },
                {
                    name: "数理情報学演習8",
                    type: "専門科目(自然情報)",
                    seme: "q",
                    cred: 1
                },
                {
                    name: "複雑システム系序論1",
                    type: "専門科目(自然情報)",
                    seme: "q",
                    cred: 1
                },
                {
                    name: "複雑システム系演習6",
                    type: "専門科目(自然情報)",
                    seme: "q",
                    cred: 1
                },
                {
                    name: "PBL2",
                    type: "専門科目",
                    seme: "q",
                    cred: 2
                }
            ],
            time4: [
                {
                    name: "オートマトン・形式言語及び演習",
                    type: "専門科目(コンピュータ科)",
                    seme: "q",
                    cred: 3
                },
                {
                    name: "PBL2",
                    type: "専門科目",
                    seme: "q",
                    cred: 2
                }
            ],
            time5: [
                
            ]
        },
        tue: {
            time1: [
                {
                    name: "PBL3",
                    type: "専門科目",
                    seme: "q",
                    cred: 2
                }
            ],
            time2: [
                {
                    name: "PBL3",
                    type: "専門科目",
                    seme: "q",
                    cred: 2
                }
            ],
            time3: [
                {
                    name: "微積分学の発展1",
                    type: "専門科目(自然情報)",
                    seme: "q",
                    cred: 1
                },
                {
                    name: "物質情報学1",
                    type: "専門科目(自然情報)",
                    seme: "q",
                    cred: 1
                },
                {
                    name: "アカデミック・イングリッシュ",
                    type: "専門科目",
                    seme: "q",
                    cred: 2
                }
            ],
            time4: [
                {
                    name: "応用社会調査",
                    type: "専門科目(人間・社会情報)",
                    seme: "q",
                    cred: 1
                },
                {
                    name: "社会心理学A",
                    type: "専門科目(人間・社会情報)",
                    seme: "q",
                    cred: 1
                },
                {
                    name: "微積分学の発展2",
                    type: "専門科目(自然情報)",
                    seme: "q",
                    cred: 1
                },
                {
                    name: "アカデミック・イングリッシュ",
                    type: "専門科目",
                    seme: "q",
                    cred: 2
                }
            ],
            time5: [
                {
                    name: "社会情報系演習2",
                    type: "専門科目(人間・社会情報)",
                    seme: "q",
                    cred: 1
                },
                {
                    name: "社会心理学B",
                    type: "専門科目(人間・社会情報)",
                    seme: "q",
                    cred: 1
                },
            ]
        },
        wed: {
            time1: [
                
            ],
            time2: [
                {
                    name: "情報社会メディア論",
                    type: "専門科目(人間・社会情報)",
                    seme: "q",
                    cred: 1
                },
                {
                    name: "認知心理学C",
                    type: "専門科目(人間・社会情報)",
                    seme: "q",
                    cred: 1
                },
                {
                    name: "数理情報学演習1",
                    type: "専門科目(自然情報)",
                    seme: "q",
                    cred: 1
                },
                {
                    name: "物質情報学2",
                    type: "専門科目(自然情報)",
                    seme: "q",
                    cred: 1
                }
            ],
            time3: [
                {
                    name: "心理学の歴史と方法2",
                    type: "専門科目(人間・社会情報)",
                    seme: "q",
                    cred: 1
                },
                {
                    name: "情報と職業1",
                    type: "専門科目",
                    seme: "q",
                    cred: 1
                }
            ],
            time4: [
                
            ],
            time5: [
                
            ]
        },
        thu: {
            time1: [
                
            ],
            time2: [
                {
                    name: "代数的構造",
                    type: "専門科目(コンピュータ科)",
                    seme: "q",
                    cred: 1
                },
                {
                    name: "社会情報学序論2",
                    type: "専門科目(人間・社会情報)",
                    seme: "q",
                    cred: 1
                },
                {
                    name: "心理・認知科学特殊講義A2",
                    type: "専門科目(人間・社会情報)",
                    seme: "q",
                    cred: 1
                },
                {
                    name: "計算情報学3",
                    type: "専門科目(自然情報)",
                    seme: "q",
                    cred: 1
                }
            ],
            time3: [
                {
                    name: "認知科学E",
                    type: "専門科目(人間・社会情報)",
                    seme: "q",
                    cred: 1
                },
                {
                    name: "アカデミック・ライティング",
                    type: "専門科目",
                    seme: "q",
                    cred: 2
                }
            ],
            time4: [
                {
                    name: "社会情報学序論1",
                    type: "専門科目(人間・社会情報)",
                    seme: "q",
                    cred: 1
                },
                {
                    name: "認知科学C",
                    type: "専門科目(人間・社会情報)",
                    seme: "q",
                    cred: 1
                },
                {
                    name: "アカデミック・ライティング",
                    type: "専門科目",
                    seme: "q",
                    cred: 2
                }
            ],
            time5: [
                {
                    name: "社会情報系演習6",
                    type: "専門科目(人間・社会情報)",
                    seme: "q",
                    cred: 1
                }
            ]
        },
        fri: {
            time1: [
                {
                    name: "PBL1",
                    type: "専門科目",
                    seme: "q",
                    cred: 2
                }
            ],
            time2: [
                {
                    name: "PBL1",
                    type: "専門科目",
                    seme: "q",
                    cred: 2
                }
            ],
            time3: [
                {
                    name: "インフォマティックス1",
                    type: "専門基礎科目",
                    seme: "q",
                    cred: 1
                },
                {
                    name: "情報社会における福祉の哲学",
                    type: "専門科目(人間・社会情報)",
                    seme: "q",
                    cred: 1
                },
                {
                    name: "数理情報学序論2",
                    type: "専門科目(自然情報)",
                    seme: "q",
                    cred: 1
                },
                {
                    name: "計算情報学1",
                    type: "専門科目(自然情報)",
                    seme: "q",
                    cred: 1
                },
                {
                    name: "マネジメント",
                    type: "専門科目",
                    seme: "q",
                    cred: 1
                }
            ],
            time4: [
                {
                    name: "インフォマティックス2",
                    type: "専門基礎科目",
                    seme: "q",
                    cred: 1
                },
                {
                    name: "複雑システム系演習2",
                    type: "専門科目(自然情報)",
                    seme: "q",
                    cred: 1
                }
            ],
            time5: [

            ]
        },

    },
    autumn1: {
        mon: {
            time1: [
                {
                    name: "文化を読む",
                    type: "文系教養科目",
                    seme: "s",
                    cred: 2
                },
                {
                    name: "人間と行動",
                    type: "文系教養科目",
                    seme: "s",
                    cred: 2
                },
                {
                    name: "教育と発達の心理",
                    type: "文系教養科目",
                    seme: "s",
                    cred: 2
                },
                {
                    name: "民主主義の歴史と現在",
                    type: "文系教養科目",
                    seme: "s",
                    cred: 2
                },
                {
                    name: "産業社会と企業",
                    type: "文系教養科目",
                    seme: "s",
                    cred: 2
                },
                {
                    name: "開発の光と影",
                    type: "文系教養科目",
                    seme: "s",
                    cred: 2
                },
                {
                    name: "グローバル化と国際教育交流",
                    type: "文系教養科目",
                    seme: "s",
                    cred: 2
                },{
                    name: "図情報とコンピュータ",
                    type: "理系教養科目",
                    seme: "s",
                    cred: 2
                },
                {
                    name: "情報メディアとコミュニケーション",
                    type: "理系教養科目",
                    seme: "s",
                    cred: 2
                },
                {
                    name: "原子・分子の科学",
                    type: "理系教養科目",
                    seme: "s",
                    cred: 2
                },
                {
                    name: "現代の生命科学",
                    type: "理系教養科目",
                    seme: "s",
                    cred: 2
                },
                {
                    name: "生涯健康と医学",
                    type: "理系教養科目",
                    seme: "s",
                    cred: 2
                },
                {
                    name: "オペレーティング・システム及び演習1",
                    type: "専門科目(コンピュータ科)",
                    seme: "q",
                    cred: 1
                }

            ],
            time2: [
                {
                    name: "現代芸術論",
                    type: "全学教養科目",
                    seme: "s",
                    cred: 2
                },
                {
                    name: "芸術と人間精神",
                    type: "全学教養科目",
                    seme: "s",
                    cred: 2
                },
                {
                    name: "表象芸術論",
                    type: "全学教養科目",
                    seme: "s",
                    cred: 2
                },
                {
                    name: "音楽芸術論",
                    type: "全学教養科目",
                    seme: "s",
                    cred: 2
                },
                {
                    name: "科学技術史",
                    type: "全学教養科目",
                    seme: "s",
                    cred: 2
                },
                {
                    name: "科学技術社会論",
                    type: "全学教養科目",
                    seme: "s",
                    cred: 2
                },
                {
                    name: "宗教と人類文化",
                    type: "全学教養科目",
                    seme: "s",
                    cred: 2
                },
                {
                    name: "異文化論",
                    type: "全学教養科目",
                    seme: "s",
                    cred: 2
                },
                {
                    name: "留学生と日本",
                    type: "全学教養科目",
                    seme: "s",
                    cred: 2
                },
                {
                    name: "キャリア形成論",
                    type: "全学教養科目",
                    seme: "s",
                    cred: 2
                },
                {
                    name: "アーカイブズ学入門－文書史料の世界をあるく－",
                    type: "全学教養科目",
                    seme: "s",
                    cred: 2
                },
                {
                    name: "プログラミング1（自然）",
                    type: "専門基礎科目",
                    seme: "q",
                    cred: 2
                },
                {
                    name: "プログラミング1（人社）",
                    type: "専門基礎科目",
                    seme: "q",
                    cred: 2
                },
                {
                    name: "プログラミング1（CS）",
                    type: "専門基礎科目",
                    seme: "q",
                    cred: 2
                },
                {
                    name: "コンパイラ",
                    type: "専門科目(コンピュータ科)",
                    seme: "q",
                    cred: 2
                },
                {
                    name: "視覚情報処理",
                    type: "専門科目(人間・社会情報)",
                    seme: "q",
                    cred: 1
                },
                {
                    name: "物質情報学7",
                    type: "専門科目(自然情報)",
                    seme: "q",
                    cred: 1
                }
            ],
            time3: [
                {
                    name: "生と死の人間学",
                    type: "文系教養科目",
                    seme: "s",
                    cred: 2
                },
                {
                    name: "科学・技術の哲学",
                    type: "文系教養科目",
                    seme: "s",
                    cred: 2
                },
                {
                    name: "芸術と人間",
                    type: "文系教養科目",
                    seme: "s",
                    cred: 2
                },
                {
                    name: "現代社会と教育",
                    type: "文系教養科目",
                    seme: "s",
                    cred: 2
                },
                {
                    name: "現代社会と法",
                    type: "文系教養科目",
                    seme: "s",
                    cred: 2
                },
                {
                    name: "グローバル化時代の国際社会",
                    type: "文系教養科目",
                    seme: "s",
                    cred: 2
                },
                {
                    name: "プログラミング1（自然）",
                    type: "専門基礎科目",
                    seme: "q",
                    cred: 2
                },
                {
                    name: "プログラミング1（人社）",
                    type: "専門基礎科目",
                    seme: "q",
                    cred: 2
                },
                {
                    name: "プログラミング1（CS）",
                    type: "専門基礎科目",
                    seme: "q",
                    cred: 2
                },
                {
                    name: "情報ネットワーク",
                    type: "専門科目(コンピュータ科)",
                    seme: "q",
                    cred: 1
                },
                {
                    name: "数理情報学演習9",
                    type: "専門科目(自然情報)",
                    seme: "q",
                    cred: 1
                },
                {
                    name: "複雑システム系演習7",
                    type: "専門科目(自然情報)",
                    seme: "q",
                    cred: 1
                }
            ],
            time4: [
                {
                    name: "微分積分学2",
                    type: "理系基礎(理系)",
                    seme: "s",
                    cred: 2
                },
                {
                    name: "シミュレーション・サイエンス1",
                    type: "専門基礎科目",
                    seme: "q",
                    cred: 1
                },
                {
                    name: "データベース1",
                    type: "専門科目(コンピュータ科)",
                    seme: "q",
                    cred: 1
                },
                {
                    name: "数理情報学9",
                    type: "専門科目(自然情報)",
                    seme: "q",
                    cred: 1
                }
            ],
            time5: [
                {
                    name: "基礎セミナーB",
                    type: "基礎セミナー",
                    seme: "s",
                    cred: 2
                }
            ]
        },
        tue: {
            time1: [
                {
                    name: "歴史学",
                    type: "文系基礎科目",
                    seme: "s",
                    cred: 2
                },
                {
                    name: "文学",
                    type: "文系基礎科目",
                    seme: "s",
                    cred: 2
                },
                {
                    name: "日本国憲法",
                    type: "文系基礎科目",
                    seme: "s",
                    cred: 2
                },
                {
                    name: "経済学B",
                    type: "文系基礎科目",
                    seme: "s",
                    cred: 2
                },
                {
                    name: "国際関係論",
                    type: "文系基礎科目",
                    seme: "s",
                    cred: 2
                },
                {
                    name: "比較文化論",
                    type: "文系基礎科目",
                    seme: "s",
                    cred: 2
                },
                {
                    name: "統計学",
                    type: "文系基礎科目",
                    seme: "s",
                    cred: 2
                },
                {
                    name: "現代数学への流れ",
                    type: "理系教養科目",
                    seme: "s",
                    cred: 2
                },
                {
                    name: "先端材料と物性物理",
                    type: "理系教養科目",
                    seme: "s",
                    cred: 2
                },
                {
                    name: "健康増進科学",
                    type: "理系教養科目",
                    seme: "s",
                    cred: 2
                },
                {
                    name: "微生物の科学",
                    type: "理系教養科目",
                    seme: "s",
                    cred: 2
                },
                {
                    name: "バイオテクノロジー",
                    type: "理系教養科目",
                    seme: "s",
                    cred: 2
                }
            ],
            time2: [
                {
                    name: "二外3",
                    type: "言語文化1二",
                    seme: "s",
                    cred: 1.5
                },
                {
                    name: "人間の知・機械の知",
                    type: "専門基礎科目",
                    seme: "q",
                    cred: 1
                },
                {
                    name: "ソフトウェア設計法1",
                    type: "専門科目(コンピュータ科)",
                    seme: "q",
                    cred: 1
                },
                {
                    name: "物質情報学6",
                    type: "専門科目(自然情報)",
                    seme: "q",
                    cred: 1
                }
            ],
            time3: [
                {
                    name: "物理学基礎2",
                    type: "理系基礎(理系)",
                    seme: "s",
                    cred: 2
                },
                {
                    name: "アルゴリズム1（自然，人社）",
                    type: "専門基礎科目",
                    seme: "q",
                    cred: 1
                },
                {
                    name: "アルゴリズム1（CS）",
                    type: "専門基礎科目",
                    seme: "q",
                    cred: 1
                },
                {
                    name: "生体情報処理",
                    type: "専門科目(コンピュータ科)",
                    seme: "q",
                    cred: 2
                },
                {
                    name: "数理情報学17",
                    type: "専門科目(自然情報)",
                    seme: "q",
                    cred: 1
                }
            ],
            time4: [
                {
                    name: "線形代数学2",
                    type: "理系基礎(理系)",
                    seme: "s",
                    cred: 2
                },
                {
                    name: "特別講義（フランス語・アカデミックライティングⅡ）",
                    type: "全学教養科目",
                    seme: "s",
                    cred: 2
                },
                {
                    name: "情報システムとしての自然1：生きる",
                    type: "専門基礎科目",
                    seme: "q",
                    cred: 1
                },
                {
                    name: "生体情報処理",
                    type: "専門科目(コンピュータ科)",
                    seme: "q",
                    cred: 2
                },
                {
                    name: "科学技術社会論",
                    type: "専門科目(人間・社会情報)",
                    seme: "q",
                    cred: 1
                },
                {
                    name: "心理・認知科学特殊講義B1",
                    type: "専門科目(人間・社会情報)",
                    seme: "q",
                    cred: 1
                },
                {
                    name: "数理情報学演習3",
                    type: "専門科目(自然情報)",
                    seme: "q",
                    cred: 1
                },
            ],
            time5: [
                {
                    name: "社会情報系演習3",
                    type: "専門科目(人間・社会情報)",
                    seme: "q",
                    cred: 1
                }
            ]
        },
        wed: {
            time1: [
                {
                    name: "システム数学及び演習1",
                    type: "専門基礎科目",
                    seme: "q",
                    cred: 1
                },
                {
                    name: "先端計算機アーキテクチャ1",
                    type: "専門科目(コンピュータ科)",
                    seme: "q",
                    cred: 1
                }
            ],
            time2: [
                {
                    name: "健康スポーツ科学実習2",
                    type: "健康スポーツ科学",
                    seme: "s",
                    cred: 1
                },
                {
                    name: "特別講義（英語・プレゼンテーションＡ２）",
                    type: "全学教養科目",
                    seme: "s",
                    cred: 2
                },
                {
                    name: "システム数学及び演習2",
                    type: "専門基礎科目",
                    seme: "q",
                    cred: 1
                },
                {
                    name: "数理情報学1",
                    type: "専門科目(自然情報)",
                    seme: "q",
                    cred: 1
                },
                {
                    name: "計算情報学6",
                    type: "専門科目(自然情報)",
                    seme: "q",
                    cred: 1
                }
            ],
            time3: [
                {
                    name: "英語(コミュニケーション)",
                    type: "言語文化1英",
                    seme: "s",
                    cred: 2
                },
                {
                    name: "特別講義（英語・プレゼンテーションＢ２）",
                    type: "全学教養科目",
                    seme: "s",
                    cred: 2
                },
                {
                    name: "情報と倫理",
                    type: "専門科目(人間・社会情報)",
                    seme: "q",
                    cred: 1
                }
            ],
            time4: [

            ],
            time5: [
                
            ]
        },
        thu: {
            time1: [
                {
                    name: "システム工学入門",
                    type: "理系教養科目",
                    seme: "s",
                    cred: 2
                },
                {
                    name: "情報リテラシー（理系）",
                    type: "理系教養科目",
                    seme: "s",
                    cred: 2
                },
                {
                    name: "情報リテラシー（理系）",
                    type: "理系教養科目",
                    seme: "s",
                    cred: 2
                },
                {
                    name: "物質世界の認識",
                    type: "理系教養科目",
                    seme: "s",
                    cred: 2
                },
                {
                    name: "物質と科学",
                    type: "理系教養科目",
                    seme: "s",
                    cred: 2
                },
                {
                    name: "遺伝子の世界",
                    type: "理系教養科目",
                    seme: "s",
                    cred: 2
                },
                {
                    name: "動植物の科学",
                    type: "理系教養科目",
                    seme: "s",
                    cred: 2
                },
                {
                    name: "自然環境と人間",
                    type: "理系教養科目",
                    seme: "s",
                    cred: 2
                },
                {
                    name: "環境問題と人間",
                    type: "理系教養科目",
                    seme: "s",
                    cred: 2
                },
                {
                    name: "都市と環境",
                    type: "理系教養科目",
                    seme: "s",
                    cred: 2
                },
                {
                    name: "物質と科学",
                    type: "理系教養科目",
                    seme: "s",
                    cred: 2
                },
                {
                    name: "動植物の科学",
                    type: "理系教養科目",
                    seme: "s",
                    cred: 2
                },
                {
                    name: "宇宙科学",
                    type: "理系教養科目",
                    seme: "s",
                    cred: 2
                },
                {
                    name: "自然言語処理1",
                    type: "専門科目(コンピュータ科)",
                    seme: "q",
                    cred: 1
                },
                {
                    name: "心理・認知科学データ解析",
                    type: "専門科目(人間・社会情報)",
                    seme: "q",
                    cred: 2
                }
            ],
            time2: [
                {
                    name: "二外4",
                    type: "言語文化1二",
                    seme: "s",
                    cred: 1.5
                },
                {
                    name: "問題解決・課題解決の科学1",
                    type: "専門基礎科目",
                    seme: "q",
                    cred: 1
                },
                {
                    name: "人工知能基礎1",
                    type: "専門科目(コンピュータ科)",
                    seme: "q",
                    cred: 1
                },
                {
                    name: "心理・認知科学データ解析",
                    type: "専門科目(人間・社会情報)",
                    seme: "q",
                    cred: 2
                },
                {
                    name: "計算情報学7",
                    type: "専門科目(自然情報)",
                    seme: "q",
                    cred: 1
                }
            ],
            time3: [
                {
                    name: "線形代数学の発展1",
                    type: "専門基礎科目",
                    seme: "q",
                    cred: 1
                },
                {
                    name: "コンピュータ科学実験2",
                    type: "専門科目(コンピュータ科)",
                    seme: "q",
                    cred: 1.5
                },
                {
                    name: "現代社会論",
                    type: "専門科目(人間・社会情報)",
                    seme: "q",
                    cred: 1
                },
                {
                    name: "複雑システム系演習3",
                    type: "専門科目(自然情報)",
                    seme: "q",
                    cred: 1
                }
            ],
            time4: [
                {
                    name: "論理設計及び演習1（自然，人社）",
                    type: "専門基礎科目",
                    seme: "q",
                    cred: 1
                },
                {
                    name: "論理設計及び演習1（CS）",
                    type: "専門基礎科目",
                    seme: "q",
                    cred: 1
                },
                {
                    name: "コンピュータ科学実験2",
                    type: "専門科目(コンピュータ科)",
                    seme: "q",
                    cred: 1.5
                },
                {
                    name: "数理情報学5",
                    type: "専門科目(自然情報)",
                    seme: "q",
                    cred: 1
                }
            ],
            time5: [
                {
                    name: "基礎セミナーB",
                    type: "基礎セミナー",
                    seme: "s",
                    cred: 2
                },
                {
                    name: "コンピュータ科学実験2",
                    type: "専門科目(コンピュータ科)",
                    seme: "q",
                    cred: 1.5
                },
                {
                    name: "社会情報系演習7",
                    type: "専門科目(人間・社会情報)",
                    seme: "q",
                    cred: 1
                }
            ]
        },
        fri: {
            time1: [
                {
                    name: "英語(中級)",
                    type: "言語文化1英",
                    seme: "s",
                    cred: 1
                },
                {
                    name: "情報理論（CS）",
                    type: "専門基礎科目",
                    seme: "q",
                    cred: 1
                }
            ],
            time2: [
                {
                    name: "論理学1",
                    type: "専門基礎科目",
                    seme: "q",
                    cred: 1
                },
                {
                    name: "最適化1",
                    type: "専門科目(コンピュータ科)",
                    seme: "q",
                    cred: 1
                },
                {
                    name: "アジアのメディア",
                    type: "専門科目(人間・社会情報)",
                    seme: "q",
                    cred: 1
                }
            ],
            time3: [
                {
                    name: "インフォマティックス3",
                    type: "専門基礎科目",
                    seme: "q",
                    cred: 1
                },
                {
                    name: "確率統計及び演習",
                    type: "専門基礎科目",
                    seme: "q",
                    cred: 2
                },
                {
                    name: "数理情報学13",
                    type: "専門科目(自然情報)",
                    seme: "q",
                    cred: 1
                }
            ],
            time4: [
                {
                    name: "特別講義（囲碁の世界・英語）",
                    type: "全学教養科目",
                    seme: "s",
                    cred: 2
                },
                {
                    name: "確率統計及び演習",
                    type: "専門基礎科目",
                    seme: "q",
                    cred: 2
                }
            ],
            time5: [
                {
                    name: "特別講義（テレビ報道とメディアリテラシー）",
                    type: "全学教養科目",
                    seme: "s",
                    cred: 2
                },
                {
                    name: "特別講義（Ｓｔｕｄｉｕｍ　ＧｅｎｅｒａｌｅⅠ）",
                    type: "全学教養科目",
                    seme: "s",
                    cred: 2
                }
            ]
        },

    },
    autumn2: {
        mon: {
            time1: [
                {
                    name: "オペレーティング・システム及び演習2",
                    type: "専門科目(コンピュータ科)",
                    seme: "q",
                    cred: 1
                }
            ],
            time2: [
                {
                    name: "プログラミング2（自然，人社）",
                    type: "専門基礎科目",
                    seme: "q",
                    cred: 2
                },
                {
                    name: "プログラミング2（CS）",
                    type: "専門基礎科目",
                    seme: "q",
                    cred: 2
                },
                {
                    name: "計算情報学8",
                    type: "専門科目(自然情報)",
                    seme: "q",
                    cred: 1
                }
            ],
            time3: [
                {
                    name: "プログラミング2（自然，人社）",
                    type: "専門基礎科目",
                    seme: "q",
                    cred: 2
                },
                {
                    name: "プログラミング2（CS）",
                    type: "専門基礎科目",
                    seme: "q",
                    cred: 2
                },
                {
                    name: "ネットワークセキュリティ",
                    type: "専門科目(コンピュータ科)",
                    seme: "q",
                    cred: 1
                },
                {
                    name: "物質情報学10",
                    type: "専門科目(自然情報)",
                    seme: "q",
                    cred: 1
                },
                {
                    name: "複雑システム系演習8",
                    type: "専門科目(自然情報)",
                    seme: "q",
                    cred: 1
                }
            ],
            time4: [
                {
                    name: "シミュレーション・サイエンス2",
                    type: "専門基礎科目",
                    seme: "q",
                    cred: 1
                },
                {
                    name: "データベース2",
                    type: "専門科目(コンピュータ科)",
                    seme: "q",
                    cred: 1
                },
                {
                    name: "メディア制度論",
                    type: "専門科目(人間・社会情報)",
                    seme: "q",
                    cred: 1
                },
                {
                    name: "数理情報学10",
                    type: "専門科目(自然情報)",
                    seme: "q",
                    cred: 1
                }
            ],
            time5: [
                {
                    name: "リスクガバナンス論",
                    type: "専門科目(人間・社会情報)",
                    seme: "q",
                    cred: 1
                }
            ]
        },
        tue: {
            time1: [
                {
                    name: "計算理論",
                    type: "専門科目(コンピュータ科)",
                    seme: "q",
                    cred: 1
                }
            ],
            time2: [
                {
                    name: "科学方法論",
                    type: "専門基礎科目",
                    seme: "q",
                    cred: 1
                },
                {
                    name: "ソフトウェア設計法2",
                    type: "専門科目(コンピュータ科)",
                    seme: "q",
                    cred: 1
                },
                {
                    name: "物質情報学8",
                    type: "専門科目(自然情報)",
                    seme: "q",
                    cred: 1
                }
            ],
            time3: [
                {
                    name: "アルゴリズム2（自然，人社）",
                    type: "専門基礎科目",
                    seme: "q",
                    cred: 1
                },
                {
                    name: "アルゴリズム2（CS）",
                    type: "専門基礎科目",
                    seme: "q",
                    cred: 1
                },
                {
                    name: "メディアと国際社会",
                    type: "専門科目(人間・社会情報)",
                    seme: "q",
                    cred: 1
                },
                {
                    name: "数理情報学18",
                    type: "専門科目(自然情報)",
                    seme: "q",
                    cred: 1
                },
                {
                    name: "画像処理",
                    type: "専門科目(コンピュータ科)",
                    seme: "q",
                    cred: 2
                }
            ],
            time4: [
                {
                    name: "情報システムとしての自然2：流れる",
                    type: "専門基礎科目",
                    seme: "q",
                    cred: 1
                },
                {
                    name: "心理・認知科学特殊講義B2",
                    type: "専門科目(人間・社会情報)",
                    seme: "q",
                    cred: 1
                },
                {
                    name: "数理情報学演習4",
                    type: "専門科目(自然情報)",
                    seme: "q",
                    cred: 1
                },
                {
                    name: "画像処理",
                    type: "専門科目(コンピュータ科)",
                    seme: "q",
                    cred: 2
                }
            ],
            time5: [
                {
                    name: "社会情報系演習4",
                    type: "専門科目(人間・社会情報)",
                    seme: "q",
                    cred: 1
                }
            ]
        },
        wed: {
            time1: [
                {
                    name: "意思決定",
                    type: "専門基礎科目",
                    seme: "q",
                    cred: 1
                },
                {
                    name: "先端計算機アーキテクチャ2",
                    type: "専門科目(コンピュータ科)",
                    seme: "q",
                    cred: 1
                },
            ],
            time2: [
                {
                    name: "情報理論（自然，人社）",
                    type: "専門基礎科目",
                    seme: "q",
                    cred: 1
                },
                {
                    name: "数理情報学2",
                    type: "専門科目(自然情報)",
                    seme: "q",
                    cred: 1
                },
                {
                    name: "物質情報学9",
                    type: "専門科目(自然情報)",
                    seme: "q",
                    cred: 1
                }
            ],
            time3: [
                {
                    name: "計算情報学10",
                    type: "専門科目(自然情報)",
                    seme: "q",
                    cred: 1
                }
            ],
            time4: [
                
            ],
            time5: [
                
            ]
        },
        thu: {
            time1: [
                {
                    name: "自然言語処理2",
                    type: "専門科目(コンピュータ科)",
                    seme: "q",
                    cred: 1
                }
            ],
            time2: [
                {
                    name: "問題解決・課題解決の科学2",
                    type: "専門基礎科目",
                    seme: "q",
                    cred: 1
                },
                {
                    name: "人工知能基礎2",
                    type: "専門科目(コンピュータ科)",
                    seme: "q",
                    cred: 1
                },
                {
                    name: "文化財情報論",
                    type: "専門科目(人間・社会情報)",
                    seme: "q",
                    cred: 1
                },
                {
                    name: "数理情報学6",
                    type: "専門科目(自然情報)",
                    seme: "q",
                    cred: 1
                },
                {
                    name: "計算情報学9",
                    type: "専門科目(自然情報)",
                    seme: "q",
                    cred: 1
                }
            ],
            time3: [
                {
                    name: "線形代数学の発展2",
                    type: "専門基礎科目",
                    seme: "q",
                    cred: 1
                },
                {
                    name: "コンピュータ科学実験3",
                    type: "専門科目(コンピュータ科)",
                    seme: "q",
                    cred: 1
                },
                {
                    name: "メディア社会論",
                    type: "専門科目(人間・社会情報)",
                    seme: "q",
                    cred: 1
                },
                {
                    name: "複雑システム系演習4",
                    type: "専門科目(自然情報)",
                    seme: "q",
                    cred: 1
                }
            ],
            time4: [
                {
                    name: "論理設計及び演習2（自然，人社）",
                    type: "専門基礎科目",
                    seme: "q",
                    cred: 1
                },
                {
                    name: "論理設計及び演習2（CS）",
                    type: "専門基礎科目",
                    seme: "q",
                    cred: 1
                },
                {
                    name: "コンピュータ科学実験3",
                    type: "専門科目(コンピュータ科)",
                    seme: "q",
                    cred: 1
                }
            ],
            time5: [
                {
                    name: "社会情報系演習8",
                    type: "専門科目(人間・社会情報)",
                    seme: "q",
                    cred: 1
                }
            ]
        },
        fri: {
            time1: [
                
            ],
            time2: [
                {
                    name: "論理学2a（自然）",
                    type: "専門基礎科目",
                    seme: "q",
                    cred: 1
                },
                {
                    name: "論理学2b（人社）",
                    type: "専門基礎科目",
                    seme: "q",
                    cred: 1
                },
                {
                    name: "論理学2c（CS）",
                    type: "専門基礎科目",
                    seme: "q",
                    cred: 1
                },
                {
                    name: "最適化2",
                    type: "専門科目(コンピュータ科)",
                    seme: "q",
                    cred: 1
                }
            ],
            time3: [
                {
                    name: "インフォマティックス4",
                    type: "専門基礎科目",
                    seme: "q",
                    cred: 1
                },
                {
                    name: "符号理論",
                    type: "専門科目(コンピュータ科)",
                    seme: "q",
                    cred: 1
                },
                {
                    name: "心理・認知科学実験1",
                    type: "専門科目(人間・社会情報)",
                    seme: "q",
                    cred: 2
                },
                {
                    name: "数理情報学14",
                    type: "専門科目(自然情報)",
                    seme: "q",
                    cred: 1
                },
                {
                    name: "複雑システム系序論2",
                    type: "専門科目(自然情報)",
                    seme: "q",
                    cred: 1
                }
            ],
            time4: [
                {
                    name: "数理統計学",
                    type: "専門科目(コンピュータ科)",
                    seme: "q",
                    cred: 1
                },
                {
                    name: "心理・認知科学実験1",
                    type: "専門科目(人間・社会情報)",
                    seme: "q",
                    cred: 2
                },
                {
                    name: "数理情報学演習2",
                    type: "専門科目(自然情報)",
                    seme: "q",
                    cred: 1
                }
            ],
            time5: [
                
            ]
        },

    }
}

//集中講義
const spLect = [
    {
        name: "認知科学演習",
        type: "専門科目(人間・社会情報)",
        seme: "q",
        cred: 2
    },
    {
        name: "心理・認知科学演習1",
        type: "専門科目(人間・社会情報)",
        seme: "q",
        cred: 1
    },
    {
        name: "認知心理学A",
        type: "専門科目(人間・社会情報)",
        seme: "q",
        cred: 1
    },
    {
        name: "認知科学A",
        type: "専門科目(人間・社会情報)",
        seme: "q",
        cred: 1
    },
    {
        name: "心理・認知科学演習2",
        type: "専門科目(人間・社会情報)",
        seme: "q",
        cred: 1
    },
    {
        name: "心理・認知科学基礎演習1",
        type: "専門科目(人間・社会情報)",
        seme: "q",
        cred: 2
    },
    {
        name: "心理・認知科学演習3",
        type: "専門科目(人間・社会情報)",
        seme: "q",
        cred: 1
    },
    {
        name: "卒業研究（社会情報系）",
        type: "専門科目(人間・社会情報)",
        seme: "q",
        cred: 6
    },
    {
        name: "心理・認知科学基礎演習2",
        type: "専門科目(人間・社会情報)",
        seme: "q",
        cred: 2
    },
    {
        name: "心理・認知科学演習4",
        type: "専門科目(人間・社会情報)",
        seme: "q",
        cred: 1
    },
    {
        name: "卒業研究（心理・認知科学系）",
        type: "専門科目(人間・社会情報)",
        seme: "q",
        cred: 6
    },
    
]