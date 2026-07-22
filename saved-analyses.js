// Bundled party analyses for the deployed GitHub Pages site.
// Generated from exported analysis JSON files.
window.SAVED_PARTY_ANALYSES = [
  {
    "schemaVersion": 1,
    "id": "party-rossi-tangtang-gilberta-perlica",
    "exportedAt": "2026-07-22T08:12:11.982Z",
    "title": "로시 · 탕탕 · 질베르타 · 펠리카 파티 분석",
    "party": [
      {
        "id": "rossi",
        "name": "로시",
        "order": 1
      },
      {
        "id": "tangtang",
        "name": "탕탕",
        "order": 2
      },
      {
        "id": "gilberta",
        "name": "질베르타",
        "order": 3
      },
      {
        "id": "perlica",
        "name": "펠리카",
        "order": 4
      }
    ],
    "summary": {
      "title": "파티 전투 구조 분석",
      "sentence": "띄우기·넘어뜨리기 등으로 방어 불능을 쌓고 배틀 스킬·궁극기 화력을 이어가는 파티입니다.",
      "dominantAction": "battleSkill",
      "actionTotals": {
        "generalAttack": 6,
        "battleSkill": 17,
        "linkSkill": 10,
        "ultimate": 14
      },
      "dependencies": [
        {
          "id": "defenseless",
          "label": "방어 불능",
          "color": "brown",
          "level": "매우 높음",
          "score": 20.5
        },
        {
          "id": "artsInfliction",
          "label": "아츠 부착",
          "color": "cyan",
          "level": "매우 높음",
          "score": 20
        },
        {
          "id": "shock",
          "label": "감전",
          "color": "electric",
          "level": "매우 높음",
          "score": 10.5
        },
        {
          "id": "natureInfliction",
          "label": "자연 부착",
          "color": "nature",
          "level": "높음",
          "score": 9.5
        },
        {
          "id": "battleSkill",
          "label": "배틀 스킬",
          "color": "blue",
          "level": "주력 행동",
          "score": 17
        }
      ]
    },
    "diagram": {
      "nodes": [
        {
          "order": 1,
          "character": {
            "id": "rossi",
            "name": "로시"
          },
          "skill": {
            "name": "그림자가 타오르는 순간",
            "type": "연계 스킬",
            "typeId": "linkSkill",
            "index": 2
          },
          "title": "두 상태 준비"
        },
        {
          "order": 2,
          "character": {
            "id": "gilberta",
            "name": "질베르타"
          },
          "skill": {
            "name": "아케인 스태프 · 매트릭스 이동",
            "type": "연계 스킬",
            "typeId": "linkSkill",
            "index": 2
          },
          "title": "아츠 이상 준비"
        },
        {
          "order": 3,
          "character": {
            "id": "tangtang",
            "name": "탕탕"
          },
          "skill": {
            "name": "야, 강물! 도와줘!",
            "type": "연계 스킬",
            "typeId": "linkSkill",
            "index": 2
          },
          "title": "와류 생성"
        },
        {
          "order": 4,
          "character": {
            "id": "tangtang",
            "name": "탕탕"
          },
          "skill": {
            "name": "우당탕탕 파도!",
            "type": "배틀 스킬",
            "typeId": "battleSkill",
            "index": 1
          },
          "title": "용오름 전환"
        },
        {
          "order": 5,
          "character": {
            "id": "gilberta",
            "name": "질베르타"
          },
          "skill": {
            "name": "아케인 스태프 · 중력장",
            "type": "궁극기",
            "typeId": "ultimate",
            "index": 3
          },
          "title": "질베르타의 궁극기 전개"
        },
        {
          "order": 6,
          "character": {
            "id": "tangtang",
            "name": "탕탕"
          },
          "skill": {
            "name": "대당가께서 지켜보고 계신다!",
            "type": "궁극기",
            "typeId": "ultimate",
            "index": 3
          },
          "title": "궁극기 조기 폭발"
        }
      ],
      "connections": [
        {
          "fromOrder": 1,
          "toOrder": 2,
          "label": "다음 조건 연결",
          "preparationRoutes": [
            {
              "character": {
                "id": "perlica",
                "name": "펠리카"
              },
              "skill": {
                "name": "실시간 프로토콜 · 연쇄 섬광",
                "type": "연계 스킬",
                "typeId": "linkSkill",
                "index": 2
              },
              "matchedMechanics": [
                {
                  "id": "shock",
                  "label": "감전"
                },
                {
                  "id": "artsAbnormality",
                  "label": "아츠 이상"
                }
              ],
              "summary": "메인 컨트롤 오퍼레이터가 적에게 강력한 일격 피해를 준 다음 사용할 수 있습니다. 누적된 전기 에너지를 방출해 목표를 강타하며 전기 피해를 주고, 5초 동안 짧은 강제 감전 상태를 부여합니다."
            }
          ]
        },
        {
          "fromOrder": 2,
          "toOrder": 3,
          "label": "다음 조건 연결",
          "preparationRoutes": [
            {
              "character": {
                "id": "tangtang",
                "name": "탕탕"
              },
              "skill": {
                "name": "우당탕탕 파도!",
                "type": "배틀 스킬",
                "typeId": "battleSkill",
                "index": 1
              },
              "matchedMechanics": [
                {
                  "id": "frostInfliction",
                  "label": "냉기 부착"
                }
              ],
              "summary": "용오름은 범위 내의 적에게 냉기 부착 1스택을 부여하고 지속적으로 냉기 피해를 줍니다. 와류를 소모해 생성한 용오름의 개수에 따라 스킬 게이지를 반환하며, 와류마다 20포인트를 반환합니다."
            }
          ]
        },
        {
          "fromOrder": 3,
          "toOrder": 4,
          "label": "다음 조건 연결",
          "preparationRoutes": []
        },
        {
          "fromOrder": 4,
          "toOrder": 5,
          "label": "스킬 게이지 재투자",
          "preparationRoutes": []
        },
        {
          "fromOrder": 5,
          "toOrder": 6,
          "label": "다음 조건 연결",
          "preparationRoutes": []
        }
      ]
    },
    "combatFlow": [
      {
        "order": 1,
        "character": {
          "id": "rossi",
          "name": "로시"
        },
        "stageIds": [
          "setup",
          "trigger"
        ],
        "title": "두 상태 준비",
        "detail": "목표에게 방어 불능과 아츠 부착을 동시에 만들어 로시의 연계 스킬의 조건을 준비한다.",
        "skill": {
          "name": "그림자가 타오르는 순간",
          "type": "연계 스킬",
          "typeId": "linkSkill",
          "index": 2
        },
        "conditions": [
          "적이 동시에 방어 불능과 아츠 부착 상태일 때 발동할 수 있으며 연속으로 2회 사용할 수 있습니다.",
          "두 번째 공격은 목표의 아츠 부착을 모두 소모한 뒤 소모한 스택에 따른 물리 피해와 띄우기 피해를 주고, 15초 동안 자신의 치명타 확률 23%와 치명타 피해 46%를 증가시킵니다."
        ],
        "timing": "",
        "effects": [
          "두 번째 공격을 정확하게 연계하면 추가로 방어 불능 1스택을 쌓습니다."
        ],
        "mechanics": [
          {
            "id": "artsInfliction",
            "label": "아츠 부착"
          },
          {
            "id": "defenseless",
            "label": "방어 불능"
          }
        ],
        "preparationRoutes": [
          {
            "character": {
              "id": "gilberta",
              "name": "질베르타"
            },
            "skill": {
              "name": "아케인 스태프 · 중력장",
              "type": "궁극기",
              "typeId": "ultimate",
              "index": 3
            },
            "matchedMechanics": [
              {
                "id": "artsInfliction",
                "label": "아츠 부착"
              },
              {
                "id": "defenseless",
                "label": "방어 불능"
              }
            ],
            "summary": "목표가 방어 불능 상태라면 아츠 취약 효과가 방어 불능 스택마다 3% 추가로 증가합니다. 중력 혼란 구역을 생성하여 구역 내의 적에게 즉시 1회의 자연 피해를 주고 자연 부착을 부여합니다."
          },
          {
            "character": {
              "id": "tangtang",
              "name": "탕탕"
            },
            "skill": {
              "name": "우당탕탕 파도!",
              "type": "배틀 스킬",
              "typeId": "battleSkill",
              "index": 1
            },
            "matchedMechanics": [
              {
                "id": "artsInfliction",
                "label": "아츠 부착"
              }
            ],
            "summary": "와류를 소모해 생성한 용오름의 개수에 따라 스킬 게이지를 반환하며, 와류마다 20포인트를 반환합니다."
          },
          {
            "character": {
              "id": "gilberta",
              "name": "질베르타"
            },
            "skill": {
              "name": "아케인 스태프 · 중력 모드",
              "type": "배틀 스킬",
              "typeId": "battleSkill",
              "index": 1
            },
            "matchedMechanics": [
              {
                "id": "artsInfliction",
                "label": "아츠 부착"
              }
            ],
            "summary": "시전이 끝나면 중력 특이점이 폭발하여 범위 내의 적에게 자연 피해를 주고 자연 부착 상태를 부여합니다."
          },
          {
            "character": {
              "id": "perlica",
              "name": "펠리카"
            },
            "skill": {
              "name": "프로토콜ω · 뇌격",
              "type": "배틀 스킬",
              "typeId": "battleSkill",
              "index": 1
            },
            "matchedMechanics": [
              {
                "id": "artsInfliction",
                "label": "아츠 부착"
              }
            ],
            "summary": "하늘에서 전기 에너지를 떨어뜨려 좁은 범위 내의 적에게 전기 피해를 주고 전기 부착 상태를 부여합니다."
          },
          {
            "character": {
              "id": "tangtang",
              "name": "탕탕"
            },
            "skill": {
              "name": "야, 강물! 도와줘!",
              "type": "연계 스킬",
              "typeId": "linkSkill",
              "index": 2
            },
            "matchedMechanics": [
              {
                "id": "artsInfliction",
                "label": "아츠 부착"
              }
            ],
            "summary": "적이 냉기 부착을 부여받았거나 아츠 폭발 피해를 받았을 때 사용할 수 있습니다."
          },
          {
            "character": {
              "id": "gilberta",
              "name": "질베르타"
            },
            "skill": {
              "name": "아케인 스태프 · 매트릭스 이동",
              "type": "연계 스킬",
              "typeId": "linkSkill",
              "index": 2
            },
            "matchedMechanics": [
              {
                "id": "defenseless",
                "label": "방어 불능"
              }
            ],
            "summary": "아츠 이상 효과를 부여한 적이 있을 때 사용할 수 있습니다."
          }
        ]
      },
      {
        "order": 2,
        "character": {
          "id": "gilberta",
          "name": "질베르타"
        },
        "stageIds": [
          "setup",
          "trigger",
          "convert"
        ],
        "title": "아츠 이상 준비",
        "detail": "파티가 적에게 연소·감전·동결·부식 중 하나를 부여해 질베르타의 연계 스킬의 발동 조건을 만든다.",
        "skill": {
          "name": "아케인 스태프 · 매트릭스 이동",
          "type": "연계 스킬",
          "typeId": "linkSkill",
          "index": 2
        },
        "conditions": [
          "아츠 이상 효과를 부여한 적이 있을 때 사용할 수 있습니다.",
          "아츠 이상 대상"
        ],
        "timing": "",
        "effects": [
          "짧게 시전하여 목표 및 주변의 모든 적을 중력으로 끌어당기고 자연 피해와 강제 띄우기 피해를 줍니다."
        ],
        "mechanics": [
          {
            "id": "artsAbnormality",
            "label": "아츠 이상"
          },
          {
            "id": "combustion",
            "label": "연소"
          },
          {
            "id": "shock",
            "label": "감전"
          },
          {
            "id": "freeze",
            "label": "동결"
          },
          {
            "id": "corrosion",
            "label": "부식"
          }
        ],
        "preparationRoutes": [
          {
            "character": {
              "id": "perlica",
              "name": "펠리카"
            },
            "skill": {
              "name": "실시간 프로토콜 · 연쇄 섬광",
              "type": "연계 스킬",
              "typeId": "linkSkill",
              "index": 2
            },
            "matchedMechanics": [
              {
                "id": "shock",
                "label": "감전"
              },
              {
                "id": "artsAbnormality",
                "label": "아츠 이상"
              }
            ],
            "summary": "메인 컨트롤 오퍼레이터가 적에게 강력한 일격 피해를 준 다음 사용할 수 있습니다. 누적된 전기 에너지를 방출해 목표를 강타하며 전기 피해를 주고, 5초 동안 짧은 강제 감전 상태를 부여합니다."
          }
        ]
      },
      {
        "order": 3,
        "character": {
          "id": "tangtang",
          "name": "탕탕"
        },
        "stageIds": [
          "setup",
          "trigger",
          "convert",
          "recycle"
        ],
        "title": "와류 생성",
        "detail": "냉기 부착 또는 아츠 폭발 피해 조건을 맞춰 탕탕의 연계 스킬을 사용하고 30초 동안 유지되는 와류를 최대 2개까지 준비한다.",
        "skill": {
          "name": "야, 강물! 도와줘!",
          "type": "연계 스킬",
          "typeId": "linkSkill",
          "index": 2
        },
        "conditions": [
          "적이 냉기 부착을 부여받았거나 아츠 폭발 피해를 받았을 때 사용할 수 있습니다.",
          "냉기 부착·아츠 폭발 피해 조건"
        ],
        "timing": "",
        "effects": [],
        "mechanics": [
          {
            "id": "frostInfliction",
            "label": "냉기 부착"
          }
        ],
        "preparationRoutes": [
          {
            "character": {
              "id": "tangtang",
              "name": "탕탕"
            },
            "skill": {
              "name": "우당탕탕 파도!",
              "type": "배틀 스킬",
              "typeId": "battleSkill",
              "index": 1
            },
            "matchedMechanics": [
              {
                "id": "frostInfliction",
                "label": "냉기 부착"
              }
            ],
            "summary": "용오름은 범위 내의 적에게 냉기 부착 1스택을 부여하고 지속적으로 냉기 피해를 줍니다. 와류를 소모해 생성한 용오름의 개수에 따라 스킬 게이지를 반환하며, 와류마다 20포인트를 반환합니다."
          }
        ]
      },
      {
        "order": 4,
        "character": {
          "id": "tangtang",
          "name": "탕탕"
        },
        "stageIds": [
          "convert",
          "recycle"
        ],
        "title": "용오름 전환",
        "detail": "탕탕의 배틀 스킬로 기본 용오름을 만들고 주변 와류를 모두 소모해 추가 용오름과 와류당 스킬 게이지 20포인트 반환을 얻는다.",
        "skill": {
          "name": "우당탕탕 파도!",
          "type": "배틀 스킬",
          "typeId": "battleSkill",
          "index": 1
        },
        "conditions": [],
        "timing": "",
        "effects": [
          "와류를 소모해 생성한 용오름의 개수에 따라 스킬 게이지를 반환하며, 와류마다 20포인트를 반환합니다.",
          "용오름은 범위 내의 적에게 냉기 부착 1스택을 부여하고 지속적으로 냉기 피해를 줍니다.",
          "여러 개의 용오름이 생성됐다면 적에게 추가로 아츠 취약을 부여하지만 냉기 부착은 중복으로 부여되지 않습니다."
        ],
        "mechanics": [
          {
            "id": "skillGauge",
            "label": "스킬 게이지"
          }
        ],
        "preparationRoutes": []
      },
      {
        "order": 5,
        "character": {
          "id": "gilberta",
          "name": "질베르타"
        },
        "stageIds": [
          "setup",
          "payoff"
        ],
        "title": "질베르타의 궁극기 전개",
        "detail": "모인 적에게 질베르타의 궁극기를 사용해 자연 부착, 감속 80%, 아츠 취약 30%를 동시에 부여한다.",
        "skill": {
          "name": "아케인 스태프 · 중력장",
          "type": "궁극기",
          "typeId": "ultimate",
          "index": 3
        },
        "conditions": [
          "목표가 방어 불능 상태라면 아츠 취약 효과가 방어 불능 스택마다 3% 추가로 증가합니다.",
          "구역 내 목표가 띄우기 상태라면 구역 효과가 끝날 때까지 띄우기 상태를 유지합니다."
        ],
        "timing": "아츠 취약·감속 효과를 먼저 적용한 뒤 로시의 궁극기를 이어갑니다.",
        "effects": [
          "중력 혼란 구역을 생성하여 구역 내의 적에게 즉시 1회의 자연 피해를 주고 자연 부착을 부여합니다.",
          "구역 내 목표에게 감속 80%와 아츠 취약 30%를 부여합니다."
        ],
        "mechanics": [
          {
            "id": "natureInfliction",
            "label": "자연 부착"
          },
          {
            "id": "artsVulnerability",
            "label": "아츠 취약"
          },
          {
            "id": "slow",
            "label": "감속"
          }
        ],
        "preparationRoutes": []
      },
      {
        "order": 6,
        "character": {
          "id": "tangtang",
          "name": "탕탕"
        },
        "stageIds": [
          "setup",
          "convert",
          "payoff"
        ],
        "title": "궁극기 조기 폭발",
        "detail": "고대의 진으로 적을 묶고, 메인 컨트롤 오퍼레이터의 낙하 공격으로 강화된 파도를 조기에 일으키면서 풍랑의 주재자의 용오름까지 생성한다.",
        "skill": {
          "name": "대당가께서 지켜보고 계신다!",
          "type": "궁극기",
          "typeId": "ultimate",
          "index": 3
        },
        "conditions": [],
        "timing": "질베르타의 궁극기로 아츠 취약 효과가 적용된 동안 사용해 주력 피해를 집중합니다.",
        "effects": [
          "메인 컨트롤 오퍼레이터가 고대의 진 내에서 낙하 공격을 사용하면 변화하던 고대의 진이 변화를 중단하고 예정보다 일찍 거대한 파도를 일으킵니다."
        ],
        "mechanics": [
          {
            "id": "mainControl",
            "label": "메인 컨트롤"
          },
          {
            "id": "ultimate",
            "label": "궁극기"
          }
        ],
        "preparationRoutes": []
      }
    ],
    "supportFlow": [
      {
        "order": 1,
        "character": {
          "id": "perlica",
          "name": "펠리카"
        },
        "stageIds": [
          "setup",
          "convert"
        ],
        "title": "강제 감전",
        "detail": "펠리카의 연계 스킬으로 5초 강제 감전을 부여하고, 방어 불능 대상이라면 추가 튕김을 확보한다.",
        "skill": {
          "name": "실시간 프로토콜 · 연쇄 섬광",
          "type": "연계 스킬",
          "typeId": "linkSkill",
          "index": 2
        },
        "conditions": [
          "메인 컨트롤 오퍼레이터가 적에게 강력한 일격 피해를 준 다음 사용할 수 있습니다.",
          "강력한 일격 피해 후"
        ],
        "timing": "",
        "effects": [
          "누적된 전기 에너지를 방출해 목표를 강타하며 전기 피해를 주고, 5초 동안 짧은 강제 감전 상태를 부여합니다."
        ],
        "mechanics": [
          {
            "id": "shock",
            "label": "감전"
          },
          {
            "id": "defenseless",
            "label": "방어 불능"
          }
        ],
        "preparationRoutes": []
      }
    ],
    "basicOperation": [
      {
        "order": 1,
        "title": "로시 · 연계 스킬",
        "detail": "목표에게 방어 불능과 아츠 부착을 동시에 만들어 로시의 연계 스킬의 조건을 준비한다."
      },
      {
        "order": 2,
        "title": "질베르타 · 연계 스킬",
        "detail": "파티가 적에게 연소·감전·동결·부식 중 하나를 부여해 질베르타의 연계 스킬의 발동 조건을 만든다."
      },
      {
        "order": 3,
        "title": "탕탕 · 연계 스킬",
        "detail": "냉기 부착 또는 아츠 폭발 피해 조건을 맞춰 탕탕의 연계 스킬을 사용하고 30초 동안 유지되는 와류를 최대 2개까지 준비한다."
      },
      {
        "order": 4,
        "title": "탕탕 · 배틀 스킬",
        "detail": "탕탕의 배틀 스킬로 기본 용오름을 만들고 주변 와류를 모두 소모해 추가 용오름과 와류당 스킬 게이지 20포인트 반환을 얻는다."
      },
      {
        "order": 5,
        "title": "질베르타 · 궁극기",
        "detail": "모인 적에게 질베르타의 궁극기를 사용해 자연 부착, 감속 80%, 아츠 취약 30%를 동시에 부여한다."
      },
      {
        "order": 6,
        "title": "탕탕 · 궁극기",
        "detail": "고대의 진으로 적을 묶고, 메인 컨트롤 오퍼레이터의 낙하 공격으로 강화된 파도를 조기에 일으키면서 풍랑의 주재자의 용오름까지 생성한다."
      }
    ],
    "roles": [
      {
        "character": {
          "id": "rossi",
          "name": "로시"
        },
        "labels": [
          "열기 부착·방어 불능 생성",
          "물리 피해·아츠 부착 소모",
          "전투 자원 순환",
          "메인 컨트롤 후보"
        ],
        "relation": "탕탕의 불균형 조건과 직접 이어집니다."
      },
      {
        "character": {
          "id": "tangtang",
          "name": "탕탕"
        },
        "labels": [
          "냉기 부착 생성",
          "스킬 게이지·스킬 게이지 반환 소모",
          "아츠 취약 지원",
          "전투 자원 순환"
        ],
        "relation": "로시의 불균형 조건과 직접 이어집니다."
      },
      {
        "character": {
          "id": "gilberta",
          "name": "질베르타"
        },
        "labels": [
          "자연 부착·방어 불능 생성",
          "연소·감전·동결·부식 활용",
          "아츠 취약 지원",
          "전투 자원 순환"
        ],
        "relation": "로시의 불균형 조건과 직접 이어집니다."
      },
      {
        "character": {
          "id": "perlica",
          "name": "펠리카"
        },
        "labels": [
          "전기 부착 생성",
          "감전 활용",
          "전투 자원 순환",
          "메인 컨트롤 후보"
        ],
        "relation": "로시의 불균형 조건과 직접 이어집니다."
      }
    ],
    "weaknesses": [
      {
        "title": "예열·상태 준비",
        "entries": [
          {
            "character": {
              "id": "rossi",
              "name": "로시"
            },
            "axis": "이중 상태 의존",
            "evidence": "연계 스킬은 목표가 방어 불능과 아츠 부착을 동시에 보유해야 발동합니다.",
            "affected": "그림자가 타오르는 순간",
            "implication": "물리 이상 준비와 아츠 부착을 모두 제공하는 파티가 필요합니다. 어느 한쪽 상태가 소모·정화되거나 면역되면 2연속 연계와 치명타 강화가 시작되지 않습니다."
          },
          {
            "character": {
              "id": "rossi",
              "name": "로시"
            },
            "axis": "정확한 2연속 입력",
            "evidence": "연계는 연속 2회 발동하며 두 번째 공격이 정확하게 연계될 때 방어 불능 1스택을 추가합니다.",
            "affected": "그림자가 타오르는 순간",
            "implication": "두 번째 입력 타이밍을 놓치거나 적이 이동·무적 상태가 되면 아츠 부착 소모, 치명타 강화, 추가 스택 중 일부를 잃을 수 있습니다."
          },
          {
            "character": {
              "id": "rossi",
              "name": "로시"
            },
            "axis": "물리·열기 혼합 지원",
            "evidence": "일반·연계는 주로 물리 피해, 궁극기와 울프팀의 진주는 열기 피해를 사용합니다.",
            "affected": "붉은색의 그림자 · 그림자가 타오르는 순간 · 기습 날카로운 발톱",
            "implication": "한 속성만 강화하는 파티나 제약 환경에서는 전체 스킬이 같은 지원을 받지 못합니다. 다만 늑대의 발톱은 두 피해 유형을 함께 증가시켜 해당 상태 유지가 중요합니다."
          },
          {
            "character": {
              "id": "rossi",
              "name": "로시"
            },
            "axis": "늑대의 발톱 전제",
            "evidence": "늑대의 발톱은 방어 불능 대상에게 배틀 스킬을 써 울프팀의 진주가 명중해야 부여됩니다.",
            "affected": "절흔 · 끓어오르는 피",
            "implication": "방어 불능이 없는 목표에게는 진주가 발동하지 않아 지속 피해와 받는 피해 증가, 치명타 추가 효과가 모두 비활성화됩니다. 목표 전환 때마다 다시 준비해야 합니다."
          },
          {
            "character": {
              "id": "tangtang",
              "name": "탕탕"
            },
            "axis": "와류 준비 시간과 최대 수량",
            "evidence": "야, 강물! 도와줘!로 와류를 한 번에 1개 생성하며 필드에는 최대 2개만 존재하고, 연계 스킬의 쿨타임은 12초입니다.",
            "affected": "야, 강물! 도와줘! · 우당탕탕 파도!",
            "implication": "최대 용오름 전환을 위해서는 연계 스킬을 반복해 와류를 미리 준비해야 합니다. 연계 쿨타임 증가나 생성물 지속 시간 감소 방향의 제약에서 준비 시간이 길어집니다."
          },
          {
            "character": {
              "id": "tangtang",
              "name": "탕탕"
            },
            "axis": "스킬 게이지 반환의 사전 설치 의존",
            "evidence": "우당탕탕 파도!는 스킬 게이지 100포인트를 소모하고, 스킬 게이지 반환은 주변 와류를 소모해 용오름을 생성할 때 와류마다 20포인트씩 발생합니다.",
            "affected": "우당탕탕 파도! · 야, 강물! 도와줘!",
            "implication": "와류가 없는 상태에서는 배틀 스킬의 게이지 반환을 얻지 못합니다. 기본 최대 2개의 와류를 모두 소모해도 반환량은 40포인트이므로 자연 회복이나 추가 수급이 필요합니다."
          },
          {
            "character": {
              "id": "tangtang",
              "name": "탕탕"
            },
            "axis": "아츠 취약의 다중 용오름 조건",
            "evidence": "아츠 취약은 여러 개의 용오름이 생성될 때만 부여되며, 용오름 3개에서 10%가 명시되어 있습니다.",
            "affected": "우당탕탕 파도! · 풍랑의 주재자",
            "implication": "와류 준비가 끊기면 아츠 취약 지원도 함께 사라집니다. 소환물 수 제한이나 생성물 제거 방향의 제약에서 파티 지원 가치가 크게 낮아집니다."
          },
          {
            "character": {
              "id": "gilberta",
              "name": "질베르타"
            },
            "axis": "아츠 이상 발동 조건",
            "evidence": "매트릭스 이동은 아츠 이상 효과가 부여된 적이 있어야 사용할 수 있습니다.",
            "affected": "아케인 스태프 · 매트릭스 이동",
            "implication": "질베르타의 기본 스킬만으로는 아츠 이상을 직접 완성하지 못하므로 파티의 부착 조합과 이상 발동 속도에 의존합니다. 상태 부여가 막히거나 늦어지면 광역 집적과 띄우기 기회가 사라집니다."
          },
          {
            "character": {
              "id": "gilberta",
              "name": "질베르타"
            },
            "axis": "지속 시전과 준비 시간",
            "evidence": "중력 모드는 지속 시전 후 마지막 폭발에서 자연 부착을 부여합니다.",
            "affected": "아케인 스태프 · 중력 모드",
            "implication": "자연 부착과 마지막 타격 치유 조건이 시전 종료에 몰려 있습니다. 적이 범위를 벗어나거나 시전이 끊기면 핵심 후속 효과를 놓칠 수 있어 시전 시간 증가·행동 방해 방향의 제약에 약합니다."
          },
          {
            "character": {
              "id": "gilberta",
              "name": "질베르타"
            },
            "axis": "다수 대상 치유 조건",
            "evidence": "뒤늦은 편지는 중력 모드의 마지막 공격 또는 매트릭스 이동이 최소 2명의 적에게 명중해야 발동합니다.",
            "affected": "뒤늦은 편지",
            "implication": "단일 보스전이나 적이 흩어진 상황에서는 치유가 발동하지 않습니다. 적을 모으는 스킬과 실제 명중 수를 함께 확보해야 하므로 안정적인 전담 회복 수단으로 보기 어렵습니다."
          },
          {
            "character": {
              "id": "gilberta",
              "name": "질베르타"
            },
            "axis": "방어 불능 파티 의존",
            "evidence": "중력장의 추가 아츠 취약은 목표의 방어 불능 스택에 따라 증가합니다.",
            "affected": "아케인 스태프 · 중력장 · P2",
            "implication": "기본 아츠 취약은 제공하지만 최대 효율에는 물리 이상과 방어 불능 누적을 담당할 동료가 필요합니다. 방어 불능 축적이 어려운 적이나 물리 이상이 제한되는 전투에서는 강화 폭이 줄어듭니다."
          },
          {
            "character": {
              "id": "gilberta",
              "name": "질베르타"
            },
            "axis": "궁극기·잠재력 의존",
            "evidence": "강한 감속과 아츠 취약은 궁극기에 집중되어 있고 P2·P3·P5가 취약, 충전, 연계 주기를 크게 강화합니다.",
            "affected": "중력장 · P2 · P3 · P5",
            "implication": "궁극기 에너지 수급이 느려지거나 쿨타임이 늘면 주요 지원 공백이 커집니다. 방어 불능 연동 취약과 연계 회전은 잠재력 단계에 따라 체감 차이가 큽니다."
          },
          {
            "character": {
              "id": "perlica",
              "name": "펠리카"
            },
            "axis": "물리 상태와 전기 화력의 조합 의존",
            "evidence": "오블리터레이션 프로토콜은 불균형 대상을 요구하고, 순환 프로토콜의 추가 튕김은 방어 불능 대상을 요구합니다.",
            "affected": "재능 1 · 재능 2",
            "implication": "펠리카의 전기 스킬만으로는 불균형과 방어 불능을 안정적으로 준비하기 어렵습니다. 물리 이상·불균형 지원 캐릭터가 없으면 두 재능의 효율이 제한됩니다."
          },
          {
            "character": {
              "id": "perlica",
              "name": "펠리카"
            },
            "axis": "좁은 배틀 스킬 범위",
            "evidence": "프로토콜ω · 뇌격은 좁은 범위 내의 적에게 전기 피해와 전기 부착을 부여합니다.",
            "affected": "프로토콜ω · 뇌격",
            "implication": "적이 넓게 분산된 상황에서는 한 번에 여러 대상에게 전기 부착을 공급하기 어렵습니다. 적 분산과 이동이 많은 전투에서 준비 효율이 낮아집니다."
          }
        ]
      },
      {
        "title": "스킬 게이지·궁극기 순환",
        "entries": [
          {
            "character": {
              "id": "rossi",
              "name": "로시"
            },
            "axis": "치명타 의존",
            "evidence": "끓어오르는 피와 궁극기의 강화 효과는 치명타 피해를 줬을 때 발동합니다.",
            "affected": "끓어오르는 피 · 기습 날카로운 발톱",
            "implication": "치명타가 발생하지 않으면 추가 열기 피해·자기 회복·궁극기 강화의 기대값이 낮아집니다. 치명타 확률 감소나 버프 공백에 민감합니다."
          },
          {
            "character": {
              "id": "rossi",
              "name": "로시"
            },
            "axis": "궁극기 에너지와 잠재력",
            "evidence": "궁극기는 에너지 110이 필요하고 P2·P4·P5가 치명타 확률, 에너지 비용, 궁극기 피해를 직접 보완합니다.",
            "affected": "기습 날카로운 발톱 · P2 · P4 · P5",
            "implication": "치명타 중심 마무리의 빈도와 안정성이 잠재력에 따라 크게 달라집니다. 에너지 획득 저하 환경에서는 연계 버프 시간 안에 궁극기를 맞추기 어려울 수 있습니다."
          },
          {
            "character": {
              "id": "tangtang",
              "name": "탕탕"
            },
            "axis": "와류 준비 시간과 최대 수량",
            "evidence": "야, 강물! 도와줘!로 와류를 한 번에 1개 생성하며 필드에는 최대 2개만 존재하고, 연계 스킬의 쿨타임은 12초입니다.",
            "affected": "야, 강물! 도와줘! · 우당탕탕 파도!",
            "implication": "최대 용오름 전환을 위해서는 연계 스킬을 반복해 와류를 미리 준비해야 합니다. 연계 쿨타임 증가나 생성물 지속 시간 감소 방향의 제약에서 준비 시간이 길어집니다."
          },
          {
            "character": {
              "id": "tangtang",
              "name": "탕탕"
            },
            "axis": "스킬 게이지 반환의 사전 설치 의존",
            "evidence": "우당탕탕 파도!는 스킬 게이지 100포인트를 소모하고, 스킬 게이지 반환은 주변 와류를 소모해 용오름을 생성할 때 와류마다 20포인트씩 발생합니다.",
            "affected": "우당탕탕 파도! · 야, 강물! 도와줘!",
            "implication": "와류가 없는 상태에서는 배틀 스킬의 게이지 반환을 얻지 못합니다. 기본 최대 2개의 와류를 모두 소모해도 반환량은 40포인트이므로 자연 회복이나 추가 수급이 필요합니다."
          },
          {
            "character": {
              "id": "tangtang",
              "name": "탕탕"
            },
            "axis": "잠재력에 따른 순환 효율",
            "evidence": "P1은 연계 쿨타임과 와류당 추가 게이지 반환을 개선하고, P3은 아츠 취약을 강화하며, P5는 궁극기와 궁극기 생성 용오름의 피해를 강화합니다.",
            "affected": "P1 · P3 · P5",
            "implication": "기본 구조는 완성되어 있지만 와류 회전·아츠 취약 수치·궁극기 폭발력의 상한은 관련 잠재력에 크게 좌우됩니다."
          },
          {
            "character": {
              "id": "gilberta",
              "name": "질베르타"
            },
            "axis": "다수 대상 치유 조건",
            "evidence": "뒤늦은 편지는 중력 모드의 마지막 공격 또는 매트릭스 이동이 최소 2명의 적에게 명중해야 발동합니다.",
            "affected": "뒤늦은 편지",
            "implication": "단일 보스전이나 적이 흩어진 상황에서는 치유가 발동하지 않습니다. 적을 모으는 스킬과 실제 명중 수를 함께 확보해야 하므로 안정적인 전담 회복 수단으로 보기 어렵습니다."
          },
          {
            "character": {
              "id": "gilberta",
              "name": "질베르타"
            },
            "axis": "궁극기·잠재력 의존",
            "evidence": "강한 감속과 아츠 취약은 궁극기에 집중되어 있고 P2·P3·P5가 취약, 충전, 연계 주기를 크게 강화합니다.",
            "affected": "중력장 · P2 · P3 · P5",
            "implication": "궁극기 에너지 수급이 느려지거나 쿨타임이 늘면 주요 지원 공백이 커집니다. 방어 불능 연동 취약과 연계 회전은 잠재력 단계에 따라 체감 차이가 큽니다."
          },
          {
            "character": {
              "id": "perlica",
              "name": "펠리카"
            },
            "axis": "직접적인 자원 회복 부재",
            "evidence": "제공된 기본 스킬과 재능에는 스킬 게이지 반환이나 궁극기 에너지 직접 획득 효과가 없습니다.",
            "affected": "전 스킬 순환",
            "implication": "코스트 100 배틀 스킬과 궁극기 에너지 80을 외부 자원 공급과 자연 회복에 의존합니다. 자원 회복 감소 방향의 제약에서 스킬 빈도가 낮아집니다."
          }
        ]
      },
      {
        "title": "위치·대상 수",
        "entries": [
          {
            "character": {
              "id": "rossi",
              "name": "로시"
            },
            "axis": "늑대의 발톱 전제",
            "evidence": "늑대의 발톱은 방어 불능 대상에게 배틀 스킬을 써 울프팀의 진주가 명중해야 부여됩니다.",
            "affected": "절흔 · 끓어오르는 피",
            "implication": "방어 불능이 없는 목표에게는 진주가 발동하지 않아 지속 피해와 받는 피해 증가, 치명타 추가 효과가 모두 비활성화됩니다. 목표 전환 때마다 다시 준비해야 합니다."
          },
          {
            "character": {
              "id": "tangtang",
              "name": "탕탕"
            },
            "axis": "스킬 게이지 반환의 사전 설치 의존",
            "evidence": "우당탕탕 파도!는 스킬 게이지 100포인트를 소모하고, 스킬 게이지 반환은 주변 와류를 소모해 용오름을 생성할 때 와류마다 20포인트씩 발생합니다.",
            "affected": "우당탕탕 파도! · 야, 강물! 도와줘!",
            "implication": "와류가 없는 상태에서는 배틀 스킬의 게이지 반환을 얻지 못합니다. 기본 최대 2개의 와류를 모두 소모해도 반환량은 40포인트이므로 자연 회복이나 추가 수급이 필요합니다."
          },
          {
            "character": {
              "id": "tangtang",
              "name": "탕탕"
            },
            "axis": "위치 기반 가속·감속",
            "evidence": "의기투합의 가속과 감속은 와류 주변 5미터에서 적용되고 범위를 벗어난 뒤 3초만 유지됩니다.",
            "affected": "의기투합 · 와류",
            "implication": "전투 위치가 와류에서 멀어지거나 적이 크게 이동하면 지원 효과를 계속 받기 어렵습니다. 적 이동 증가나 설치물 범위 축소 방향의 제약에 취약합니다."
          },
          {
            "character": {
              "id": "gilberta",
              "name": "질베르타"
            },
            "axis": "지속 시전과 준비 시간",
            "evidence": "중력 모드는 지속 시전 후 마지막 폭발에서 자연 부착을 부여합니다.",
            "affected": "아케인 스태프 · 중력 모드",
            "implication": "자연 부착과 마지막 타격 치유 조건이 시전 종료에 몰려 있습니다. 적이 범위를 벗어나거나 시전이 끊기면 핵심 후속 효과를 놓칠 수 있어 시전 시간 증가·행동 방해 방향의 제약에 약합니다."
          },
          {
            "character": {
              "id": "gilberta",
              "name": "질베르타"
            },
            "axis": "다수 대상 치유 조건",
            "evidence": "뒤늦은 편지는 중력 모드의 마지막 공격 또는 매트릭스 이동이 최소 2명의 적에게 명중해야 발동합니다.",
            "affected": "뒤늦은 편지",
            "implication": "단일 보스전이나 적이 흩어진 상황에서는 치유가 발동하지 않습니다. 적을 모으는 스킬과 실제 명중 수를 함께 확보해야 하므로 안정적인 전담 회복 수단으로 보기 어렵습니다."
          },
          {
            "character": {
              "id": "perlica",
              "name": "펠리카"
            },
            "axis": "메인 컨트롤 강력한 일격 의존",
            "evidence": "연쇄 섬광은 메인 컨트롤 오퍼레이터가 강력한 일격 피해를 준 다음에만 사용할 수 있습니다.",
            "affected": "실시간 프로토콜 · 연쇄 섬광",
            "implication": "메인 컨트롤의 일반 공격 순환이나 강력한 일격 기회가 끊기면 핵심 감전 공급이 지연됩니다. 교대 제한·공격 중단 방향의 제약에 취약합니다."
          },
          {
            "character": {
              "id": "perlica",
              "name": "펠리카"
            },
            "axis": "짧은 감전 지속 시간",
            "evidence": "연쇄 섬광이 부여하는 강제 감전은 기본 5초 동안 지속됩니다.",
            "affected": "연쇄 섬광 · P1",
            "implication": "감전이 유지되는 짧은 시간 안에 아츠 공격을 집중해야 합니다. 후속 스킬 지연이나 적 이동으로 피해 집중 창을 놓치기 쉽고, 지속 연장은 P1에 배치되어 있습니다."
          },
          {
            "character": {
              "id": "perlica",
              "name": "펠리카"
            },
            "axis": "좁은 배틀 스킬 범위",
            "evidence": "프로토콜ω · 뇌격은 좁은 범위 내의 적에게 전기 피해와 전기 부착을 부여합니다.",
            "affected": "프로토콜ω · 뇌격",
            "implication": "적이 넓게 분산된 상황에서는 한 번에 여러 대상에게 전기 부착을 공급하기 어렵습니다. 적 분산과 이동이 많은 전투에서 준비 효율이 낮아집니다."
          }
        ]
      },
      {
        "title": "잠재력 의존",
        "entries": [
          {
            "character": {
              "id": "rossi",
              "name": "로시"
            },
            "axis": "궁극기 에너지와 잠재력",
            "evidence": "궁극기는 에너지 110이 필요하고 P2·P4·P5가 치명타 확률, 에너지 비용, 궁극기 피해를 직접 보완합니다.",
            "affected": "기습 날카로운 발톱 · P2 · P4 · P5",
            "implication": "치명타 중심 마무리의 빈도와 안정성이 잠재력에 따라 크게 달라집니다. 에너지 획득 저하 환경에서는 연계 버프 시간 안에 궁극기를 맞추기 어려울 수 있습니다."
          },
          {
            "character": {
              "id": "tangtang",
              "name": "탕탕"
            },
            "axis": "잠재력에 따른 순환 효율",
            "evidence": "P1은 연계 쿨타임과 와류당 추가 게이지 반환을 개선하고, P3은 아츠 취약을 강화하며, P5는 궁극기와 궁극기 생성 용오름의 피해를 강화합니다.",
            "affected": "P1 · P3 · P5",
            "implication": "기본 구조는 완성되어 있지만 와류 회전·아츠 취약 수치·궁극기 폭발력의 상한은 관련 잠재력에 크게 좌우됩니다."
          },
          {
            "character": {
              "id": "gilberta",
              "name": "질베르타"
            },
            "axis": "역할군 제한 지원",
            "evidence": "전달자의 노래는 가드·캐스터·서포터 오퍼레이터에게만 궁극기 충전 효율을 제공합니다.",
            "affected": "전달자의 노래 · P3",
            "implication": "디펜더·스트라이커·뱅가드 중심 조합에서는 재능과 P3의 가치가 낮아집니다. 파티 역할군 구성이 바뀌면 핵심 지원 효과의 수혜 인원이 크게 달라집니다."
          },
          {
            "character": {
              "id": "gilberta",
              "name": "질베르타"
            },
            "axis": "궁극기·잠재력 의존",
            "evidence": "강한 감속과 아츠 취약은 궁극기에 집중되어 있고 P2·P3·P5가 취약, 충전, 연계 주기를 크게 강화합니다.",
            "affected": "중력장 · P2 · P3 · P5",
            "implication": "궁극기 에너지 수급이 느려지거나 쿨타임이 늘면 주요 지원 공백이 커집니다. 방어 불능 연동 취약과 연계 회전은 잠재력 단계에 따라 체감 차이가 큽니다."
          },
          {
            "character": {
              "id": "perlica",
              "name": "펠리카"
            },
            "axis": "짧은 감전 지속 시간",
            "evidence": "연쇄 섬광이 부여하는 강제 감전은 기본 5초 동안 지속됩니다.",
            "affected": "연쇄 섬광 · P1",
            "implication": "감전이 유지되는 짧은 시간 안에 아츠 공격을 집중해야 합니다. 후속 스킬 지연이나 적 이동으로 피해 집중 창을 놓치기 쉽고, 지속 연장은 P1에 배치되어 있습니다."
          },
          {
            "character": {
              "id": "perlica",
              "name": "펠리카"
            },
            "axis": "잠재력에 집중된 감전·궁극기 강화",
            "evidence": "P1은 감전 지속을 늘리고, P3·P4는 감전 중 공격력과 아츠 피해 증가 효과를 강화하며, P5는 궁극기 치명타 확률을 올립니다.",
            "affected": "P1 · P3 · P4 · P5",
            "implication": "기본 감전 창과 최종 화력이 잠재력에서 크게 개선됩니다. 잠재력 단계에 따라 감전 지원과 궁극기 마무리 성능 차이가 큽니다."
          }
        ]
      },
      {
        "title": "메인 컨트롤·조작 집중",
        "entries": [
          {
            "character": {
              "id": "rossi",
              "name": "로시"
            },
            "axis": "정확한 2연속 입력",
            "evidence": "연계는 연속 2회 발동하며 두 번째 공격이 정확하게 연계될 때 방어 불능 1스택을 추가합니다.",
            "affected": "그림자가 타오르는 순간",
            "implication": "두 번째 입력 타이밍을 놓치거나 적이 이동·무적 상태가 되면 아츠 부착 소모, 치명타 강화, 추가 스택 중 일부를 잃을 수 있습니다."
          },
          {
            "character": {
              "id": "tangtang",
              "name": "탕탕"
            },
            "axis": "메인 컨트롤 낙하 공격 조율",
            "evidence": "궁극기의 강화된 조기 파도와 풍랑의 주재자 용오름은 메인 컨트롤 오퍼레이터가 고대의 진 안에서 낙하 공격을 사용해야 발동합니다.",
            "affected": "대당가께서 지켜보고 계신다! · 풍랑의 주재자",
            "implication": "낙하 공격을 빠르게 넣지 못하면 강화 파도와 추가 용오름의 시점을 놓칠 수 있습니다. 공중 행동 제한이나 메인 컨트롤 교대 제한 방향의 제약이 불리합니다."
          },
          {
            "character": {
              "id": "tangtang",
              "name": "탕탕"
            },
            "axis": "지속 제어와 조기 폭발의 선택",
            "evidence": "고대의 진은 4초 동안 적을 묶고 피해를 주지만, 낙하 공격을 사용하면 변화가 중단되고 거대한 파도가 예정보다 일찍 발생합니다.",
            "affected": "대당가께서 지켜보고 계신다!",
            "implication": "조기 폭발을 선택하면 강화된 파도와 용오름을 빠르게 얻는 대신 남은 지속 제어 구간을 끝내게 됩니다. 생존이나 제어 유지가 중요한 상황에서는 발동 시점을 조절해야 합니다."
          },
          {
            "character": {
              "id": "perlica",
              "name": "펠리카"
            },
            "axis": "메인 컨트롤 강력한 일격 의존",
            "evidence": "연쇄 섬광은 메인 컨트롤 오퍼레이터가 강력한 일격 피해를 준 다음에만 사용할 수 있습니다.",
            "affected": "실시간 프로토콜 · 연쇄 섬광",
            "implication": "메인 컨트롤의 일반 공격 순환이나 강력한 일격 기회가 끊기면 핵심 감전 공급이 지연됩니다. 교대 제한·공격 중단 방향의 제약에 취약합니다."
          }
        ]
      }
    ],
    "discoveries": [
      {
        "character": {
          "id": "rossi",
          "name": "로시"
        },
        "title": "연계 스킬 재평가",
        "description": "현재 순환은 배틀 스킬 비중이 높지만, 연계 스킬은 아츠 부착·방어 불능 조건을 이용하는 별도 기능을 갖고 있습니다.",
        "opportunity": "주력 피해원을 약화시키되 이 효과까지 함께 막지 않는 설계라면 보조 루트가 새로운 선택지로 떠오를 수 있습니다.",
        "skillName": "연계 스킬"
      },
      {
        "character": {
          "id": "tangtang",
          "name": "탕탕"
        },
        "title": "연계 스킬 재평가",
        "description": "현재 순환은 배틀 스킬 비중이 높지만, 연계 스킬은 냉기 부착 조건을 이용하는 별도 기능을 갖고 있습니다.",
        "opportunity": "주력 피해원을 약화시키되 이 효과까지 함께 막지 않는 설계라면 보조 루트가 새로운 선택지로 떠오를 수 있습니다.",
        "skillName": "연계 스킬"
      },
      {
        "character": {
          "id": "gilberta",
          "name": "질베르타"
        },
        "title": "궁극기 재평가",
        "description": "현재 순환은 일반 공격 비중이 높지만, 궁극기은 방어 불능·아츠 취약 조건을 이용하는 별도 기능을 갖고 있습니다.",
        "opportunity": "주력 피해원을 약화시키되 이 효과까지 함께 막지 않는 설계라면 보조 루트가 새로운 선택지로 떠오를 수 있습니다.",
        "skillName": "궁극기"
      },
      {
        "character": {
          "id": "perlica",
          "name": "펠리카"
        },
        "title": "연계 스킬 재평가",
        "description": "현재 순환은 배틀 스킬 비중이 높지만, 연계 스킬은 강력한 일격·메인 컨트롤 조건을 이용하는 별도 기능을 갖고 있습니다.",
        "opportunity": "주력 피해원을 약화시키되 이 효과까지 함께 막지 않는 설계라면 보조 루트가 새로운 선택지로 떠오를 수 있습니다.",
        "skillName": "연계 스킬"
      }
    ],
    "designHints": [
      {
        "id": "normal",
        "title": "일반 공격 의존도",
        "pressure": "일반 공격 피해 비중을 낮추는 방향",
        "impact": "강화 상태나 메인 컨트롤 중 일반 공격에 몰린 화력 구간이 짧아집니다.",
        "opportunity": "로시의 연계 스킬, 탕탕의 연계 스킬처럼 연계·배틀 스킬 중심의 보조 축이 상대적으로 중요해질 수 있습니다.",
        "caution": "일반 공격과 강력한 일격을 동시에 완전히 막으면 스킬 게이지 회복과 불균형 순환까지 함께 끊길 수 있습니다.",
        "characters": [
          {
            "id": "perlica",
            "name": "펠리카"
          }
        ]
      },
      {
        "id": "ultimate",
        "title": "궁극기 반복 의존도",
        "pressure": "궁극기 반복 사용의 효율이 점차 낮아지는 방향",
        "impact": "궁극기를 중심으로 한 강화 구간과 마무리 빈도가 줄어듭니다.",
        "opportunity": "궁극기 에너지를 다른 가치로 돌리거나 배틀·연계 스킬을 주력화하는 운용을 찾게 됩니다.",
        "caution": "첫 궁극기까지 무력화하면 준비 과정의 의미도 사라질 수 있으므로 반복 효율을 조절하는 편이 발견을 만들기 쉽습니다.",
        "characters": [
          {
            "id": "rossi",
            "name": "로시"
          },
          {
            "id": "tangtang",
            "name": "탕탕"
          },
          {
            "id": "perlica",
            "name": "펠리카"
          }
        ]
      },
      {
        "id": "battle",
        "title": "배틀 스킬 피해 비중",
        "pressure": "배틀 스킬의 직접 피해를 줄이되 연계 스킬 순환은 열어주는 방향",
        "impact": "스킬 게이지를 사용해 즉시 내는 화력이 줄어듭니다.",
        "opportunity": "배틀 스킬을 상태 생성·변환 용도로만 쓰고, 연계 스킬이나 궁극기 외 추가 피해를 주력으로 삼는 구조가 떠오를 수 있습니다.",
        "caution": "배틀 스킬의 상태 부여까지 막으면 후속 연계 조건 자체가 사라질 수 있습니다.",
        "characters": [
          {
            "id": "rossi",
            "name": "로시"
          },
          {
            "id": "tangtang",
            "name": "탕탕"
          },
          {
            "id": "perlica",
            "name": "펠리카"
          }
        ]
      },
      {
        "id": "link",
        "title": "연계 스킬 빈도",
        "pressure": "연계 스킬 사용 빈도와 쿨타임을 크게 흔드는 방향",
        "impact": "조건을 자주 열 수 있는 파티일수록 순환 속도가 크게 달라집니다.",
        "opportunity": "연계 횟수가 늘어날 때 생기는 자원 수급과 보조 피해, 반대로 연계에 대가가 생길 때의 대체 순서를 비교할 수 있습니다.",
        "caution": "연계 조건과 쿨타임을 동시에 막으면 조합의 상호작용이 사라질 수 있습니다.",
        "characters": [
          {
            "id": "rossi",
            "name": "로시"
          },
          {
            "id": "tangtang",
            "name": "탕탕"
          }
        ]
      },
      {
        "id": "stack",
        "title": "부착·방어 불능 축적 속도",
        "pressure": "같은 대상에게 스택을 연속으로 쌓는 속도를 제한하는 방향",
        "impact": "최대 스택을 전제로 하는 동결·강타·갑옷 파괴·취약 발동 시점이 늦어집니다.",
        "opportunity": "낮은 스택에서 바로 작동하는 스킬, 강제 이상, 직접 부여 효과의 가치가 올라갈 수 있습니다.",
        "caution": "부착 자체를 금지하면 대체 운용이 아니라 파티의 핵심 문법을 삭제하게 됩니다.",
        "characters": [
          {
            "id": "rossi",
            "name": "로시"
          },
          {
            "id": "tangtang",
            "name": "탕탕"
          },
          {
            "id": "gilberta",
            "name": "질베르타"
          },
          {
            "id": "perlica",
            "name": "펠리카"
          }
        ]
      }
    ],
    "mechanicProfile": {
      "mechanicIds": [
        "defenseless",
        "artsInfliction",
        "shock",
        "natureInfliction",
        "artsVulnerability",
        "slow",
        "mainControl",
        "ultimate",
        "launch",
        "heatDamage",
        "frostInfliction",
        "skillGauge",
        "combustion",
        "freeze",
        "corrosion",
        "battleSkill",
        "artsAbnormality",
        "heatInfliction",
        "electricInfliction",
        "physicalDamage",
        "powerStrike",
        "haste",
        "electricDamage",
        "artsDamage",
        "imbalance",
        "ultimateEnergy",
        "generalAttack"
      ],
      "mechanicScores": {
        "defenseless": 20.5,
        "artsInfliction": 20,
        "shock": 10.5,
        "natureInfliction": 9.5,
        "artsVulnerability": 9,
        "slow": 9,
        "mainControl": 9,
        "ultimate": 9,
        "launch": 8.5,
        "heatDamage": 6.5,
        "frostInfliction": 6.5,
        "skillGauge": 6.5,
        "combustion": 6,
        "freeze": 6,
        "corrosion": 6,
        "battleSkill": 6,
        "artsAbnormality": 5.5,
        "heatInfliction": 5,
        "electricInfliction": 5,
        "physicalDamage": 4.5,
        "powerStrike": 4.5,
        "haste": 4.5,
        "electricDamage": 4,
        "artsDamage": 3,
        "imbalance": 3,
        "ultimateEnergy": 3,
        "generalAttack": 3,
        "frostDamage": 0,
        "natureDamage": 0,
        "knockdown": 0,
        "smash": 0,
        "armorBreak": 0,
        "execution": 0,
        "physicalVulnerability": 0,
        "heatVulnerability": 0,
        "electricVulnerability": 0,
        "frostVulnerability": 0,
        "natureVulnerability": 0,
        "artsAmplification": 0,
        "physicalAmplification": 0,
        "heatAmplification": 0,
        "electricAmplification": 0,
        "frostAmplification": 0,
        "natureAmplification": 0,
        "skillGaugeReturn": 0,
        "protection": 0,
        "fortification": 0,
        "healing": 0,
        "weakness": 0,
        "comboHit": 0,
        "cleanse": 0,
        "originiumCrystal": 0,
        "linkSkill": 0
      },
      "dominantAction": "battleSkill",
      "actionTotals": {
        "generalAttack": 6,
        "battleSkill": 17,
        "linkSkill": 10,
        "ultimate": 14
      },
      "hintIds": [
        "normal",
        "ultimate",
        "battle",
        "link",
        "stack"
      ],
      "hintTitles": [
        "일반 공격 의존도",
        "궁극기 반복 의존도",
        "배틀 스킬 피해 비중",
        "연계 스킬 빈도",
        "부착·방어 불능 축적 속도"
      ],
      "weaknessAxes": [
        "이중 상태 의존",
        "정확한 2연속 입력",
        "물리·열기 혼합 지원",
        "늑대의 발톱 전제",
        "와류 준비 시간과 최대 수량",
        "스킬 게이지 반환의 사전 설치 의존",
        "아츠 취약의 다중 용오름 조건",
        "아츠 이상 발동 조건",
        "지속 시전과 준비 시간",
        "다수 대상 치유 조건",
        "방어 불능 파티 의존",
        "궁극기·잠재력 의존",
        "물리 상태와 전기 화력의 조합 의존",
        "좁은 배틀 스킬 범위",
        "치명타 의존",
        "궁극기 에너지와 잠재력",
        "와류 준비 시간과 최대 수량",
        "스킬 게이지 반환의 사전 설치 의존",
        "잠재력에 따른 순환 효율",
        "다수 대상 치유 조건",
        "궁극기·잠재력 의존",
        "직접적인 자원 회복 부재",
        "늑대의 발톱 전제",
        "스킬 게이지 반환의 사전 설치 의존",
        "위치 기반 가속·감속",
        "지속 시전과 준비 시간",
        "다수 대상 치유 조건",
        "메인 컨트롤 강력한 일격 의존",
        "짧은 감전 지속 시간",
        "좁은 배틀 스킬 범위",
        "궁극기 에너지와 잠재력",
        "잠재력에 따른 순환 효율",
        "역할군 제한 지원",
        "궁극기·잠재력 의존",
        "짧은 감전 지속 시간",
        "잠재력에 집중된 감전·궁극기 강화",
        "정확한 2연속 입력",
        "메인 컨트롤 낙하 공격 조율",
        "지속 제어와 조기 폭발의 선택",
        "메인 컨트롤 강력한 일격 의존"
      ],
      "dependencyLabels": [
        "방어 불능",
        "아츠 부착",
        "감전",
        "자연 부착",
        "배틀 스킬"
      ]
    }
  },
  {
    "schemaVersion": 1,
    "id": "party-yvonne-tangtang-gilberta-xaihi",
    "exportedAt": "2026-07-22T07:51:28.762Z",
    "title": "이본 · 탕탕 · 질베르타 · 자이히 파티 분석",
    "party": [
      {
        "id": "yvonne",
        "name": "이본",
        "order": 1
      },
      {
        "id": "tangtang",
        "name": "탕탕",
        "order": 2
      },
      {
        "id": "gilberta",
        "name": "질베르타",
        "order": 3
      },
      {
        "id": "xaihi",
        "name": "자이히",
        "order": 4
      }
    ],
    "summary": {
      "title": "파티 전투 구조 분석",
      "sentence": "냉기 부착·자연 부착을 준비해 동결 조건으로 전환하고, 궁극기·배틀 스킬에 화력을 모으는 파티입니다.",
      "dominantAction": "ultimate",
      "actionTotals": {
        "generalAttack": 8,
        "battleSkill": 16,
        "linkSkill": 16,
        "ultimate": 20
      },
      "dependencies": [
        {
          "id": "freeze",
          "label": "동결",
          "color": "frost",
          "level": "매우 높음",
          "score": 30
        },
        {
          "id": "frostInfliction",
          "label": "냉기 부착",
          "color": "frost",
          "level": "매우 높음",
          "score": 26
        },
        {
          "id": "natureInfliction",
          "label": "자연 부착",
          "color": "nature",
          "level": "매우 높음",
          "score": 17.5
        },
        {
          "id": "artsInfliction",
          "label": "아츠 부착",
          "color": "cyan",
          "level": "매우 높음",
          "score": 16.5
        },
        {
          "id": "ultimate",
          "label": "궁극기",
          "color": "orange",
          "level": "주력 행동",
          "score": 20
        }
      ]
    },
    "diagram": {
      "nodes": [
        {
          "order": 1,
          "character": {
            "id": "yvonne",
            "name": "이본"
          },
          "skill": {
            "name": "얼음 폭탄 · β형",
            "type": "배틀 스킬",
            "typeId": "battleSkill",
            "index": 1
          },
          "title": "부착 스택 준비"
        },
        {
          "order": 2,
          "character": {
            "id": "xaihi",
            "name": "자이히"
          },
          "skill": {
            "name": "스트레스 테스트",
            "type": "연계 스킬",
            "typeId": "linkSkill",
            "index": 2
          },
          "title": "냉기 피해 보조"
        },
        {
          "order": 3,
          "character": {
            "id": "tangtang",
            "name": "탕탕"
          },
          "skill": {
            "name": "야, 강물! 도와줘!",
            "type": "연계 스킬",
            "typeId": "linkSkill",
            "index": 2
          },
          "title": "와류 생성"
        },
        {
          "order": 4,
          "character": {
            "id": "yvonne",
            "name": "이본"
          },
          "skill": {
            "name": "꽁꽁이 · υ37",
            "type": "연계 스킬",
            "typeId": "linkSkill",
            "index": 2
          },
          "title": "연계 제어"
        },
        {
          "order": 5,
          "character": {
            "id": "gilberta",
            "name": "질베르타"
          },
          "skill": {
            "name": "아케인 스태프 · 매트릭스 이동",
            "type": "연계 스킬",
            "typeId": "linkSkill",
            "index": 2
          },
          "title": "아츠 이상 준비"
        },
        {
          "order": 6,
          "character": {
            "id": "xaihi",
            "name": "자이히"
          },
          "skill": {
            "name": "스택 오버플로",
            "type": "궁극기",
            "typeId": "ultimate",
            "index": 3
          },
          "title": "팀 증폭·정화"
        },
        {
          "order": 7,
          "character": {
            "id": "gilberta",
            "name": "질베르타"
          },
          "skill": {
            "name": "아케인 스태프 · 중력장",
            "type": "궁극기",
            "typeId": "ultimate",
            "index": 3
          },
          "title": "질베르타의 궁극기 전개"
        },
        {
          "order": 8,
          "character": {
            "id": "yvonne",
            "name": "이본"
          },
          "skill": {
            "name": "아이스 슈터",
            "type": "궁극기",
            "typeId": "ultimate",
            "index": 3
          },
          "title": "궁극기 집중 공격"
        }
      ],
      "connections": [
        {
          "fromOrder": 1,
          "toOrder": 2,
          "label": "냉기 부착",
          "preparationRoutes": [
            {
              "character": {
                "id": "yvonne",
                "name": "이본"
              },
              "skill": {
                "name": "얼음 폭탄 · β형",
                "type": "배틀 스킬",
                "typeId": "battleSkill",
                "index": 1
              },
              "matchedMechanics": [
                {
                  "id": "frostInfliction",
                  "label": "냉기 부착"
                },
                {
                  "id": "freeze",
                  "label": "동결"
                }
              ],
              "summary": "냉기 부착 혹은 자연 부착 상태의 적에게 명중했을 때 목표가 보유한 모든 아츠 부착을 소모하고, 대상에게 강제로 동결을 부여하며 소모한 스택 수치에 따라 냉기 피해를 줍니다."
            },
            {
              "character": {
                "id": "tangtang",
                "name": "탕탕"
              },
              "skill": {
                "name": "우당탕탕 파도!",
                "type": "배틀 스킬",
                "typeId": "battleSkill",
                "index": 1
              },
              "matchedMechanics": [
                {
                  "id": "frostInfliction",
                  "label": "냉기 부착"
                }
              ],
              "summary": "용오름은 범위 내의 적에게 냉기 부착 1스택을 부여하고 지속적으로 냉기 피해를 줍니다. 와류를 소모해 생성한 용오름의 개수에 따라 스킬 게이지를 반환하며, 와류마다 20포인트를 반환합니다."
            },
            {
              "character": {
                "id": "yvonne",
                "name": "이본"
              },
              "skill": {
                "name": "꽁꽁이 · υ37",
                "type": "연계 스킬",
                "typeId": "linkSkill",
                "index": 2
              },
              "matchedMechanics": [
                {
                  "id": "freeze",
                  "label": "동결"
                }
              ],
              "summary": "메인 컨트롤 오퍼레이터가 동결 상태의 적에게 강력한 일격을 사용했을 때 사용할 수 있습니다. 지속 시간이 끝나면 꽁꽁이가 자폭하여 주위의 적에게 강제로 동결 상태를 부여하고 냉기 피해를 줍니다."
            },
            {
              "character": {
                "id": "tangtang",
                "name": "탕탕"
              },
              "skill": {
                "name": "야, 강물! 도와줘!",
                "type": "연계 스킬",
                "typeId": "linkSkill",
                "index": 2
              },
              "matchedMechanics": [
                {
                  "id": "frostInfliction",
                  "label": "냉기 부착"
                }
              ],
              "summary": "적이 냉기 부착을 부여받았거나 아츠 폭발 피해를 받았을 때 사용할 수 있습니다."
            }
          ]
        },
        {
          "fromOrder": 2,
          "toOrder": 3,
          "label": "냉기 부착",
          "preparationRoutes": [
            {
              "character": {
                "id": "yvonne",
                "name": "이본"
              },
              "skill": {
                "name": "얼음 폭탄 · β형",
                "type": "배틀 스킬",
                "typeId": "battleSkill",
                "index": 1
              },
              "matchedMechanics": [
                {
                  "id": "frostInfliction",
                  "label": "냉기 부착"
                }
              ],
              "summary": "냉기 부착 혹은 자연 부착 상태의 적에게 명중했을 때 목표가 보유한 모든 아츠 부착을 소모하고, 대상에게 강제로 동결을 부여하며 소모한 스택 수치에 따라 냉기 피해를 줍니다. 배틀 스킬로 적에게 동결 상태를 부여한 후, 동결 부여로 궁극기 에너지 10을 획득하고 중첩된 부착 스택을 소모할 때마다 궁극기 에너지 30을 획득합니다."
            },
            {
              "character": {
                "id": "tangtang",
                "name": "탕탕"
              },
              "skill": {
                "name": "우당탕탕 파도!",
                "type": "배틀 스킬",
                "typeId": "battleSkill",
                "index": 1
              },
              "matchedMechanics": [
                {
                  "id": "frostInfliction",
                  "label": "냉기 부착"
                }
              ],
              "summary": "용오름은 범위 내의 적에게 냉기 부착 1스택을 부여하고 지속적으로 냉기 피해를 줍니다. 와류를 소모해 생성한 용오름의 개수에 따라 스킬 게이지를 반환하며, 와류마다 20포인트를 반환합니다."
            },
            {
              "character": {
                "id": "xaihi",
                "name": "자이히"
              },
              "skill": {
                "name": "스트레스 테스트",
                "type": "연계 스킬",
                "typeId": "linkSkill",
                "index": 2
              },
              "matchedMechanics": [
                {
                  "id": "frostInfliction",
                  "label": "냉기 부착"
                }
              ],
              "summary": "지원 결정체의 생명력 회복 횟수를 모두 소모했을 때 사용할 수 있습니다. 짧게 차지하여 지원 결정체를 적에게 투척해 냉기 피해를 주고 냉기 부착 상태를 부여합니다."
            }
          ]
        },
        {
          "fromOrder": 3,
          "toOrder": 4,
          "label": "다음 조건 연결",
          "preparationRoutes": [
            {
              "character": {
                "id": "yvonne",
                "name": "이본"
              },
              "skill": {
                "name": "얼음 폭탄 · β형",
                "type": "배틀 스킬",
                "typeId": "battleSkill",
                "index": 1
              },
              "matchedMechanics": [
                {
                  "id": "freeze",
                  "label": "동결"
                }
              ],
              "summary": "냉기 부착 혹은 자연 부착 상태의 적에게 명중했을 때 목표가 보유한 모든 아츠 부착을 소모하고, 대상에게 강제로 동결을 부여하며 소모한 스택 수치에 따라 냉기 피해를 줍니다."
            }
          ]
        },
        {
          "fromOrder": 4,
          "toOrder": 5,
          "label": "동결",
          "preparationRoutes": [
            {
              "character": {
                "id": "yvonne",
                "name": "이본"
              },
              "skill": {
                "name": "얼음 폭탄 · β형",
                "type": "배틀 스킬",
                "typeId": "battleSkill",
                "index": 1
              },
              "matchedMechanics": [
                {
                  "id": "freeze",
                  "label": "동결"
                },
                {
                  "id": "artsAbnormality",
                  "label": "아츠 이상"
                }
              ],
              "summary": "냉기 부착 혹은 자연 부착 상태의 적에게 명중했을 때 목표가 보유한 모든 아츠 부착을 소모하고, 대상에게 강제로 동결을 부여하며 소모한 스택 수치에 따라 냉기 피해를 줍니다."
            },
            {
              "character": {
                "id": "yvonne",
                "name": "이본"
              },
              "skill": {
                "name": "꽁꽁이 · υ37",
                "type": "연계 스킬",
                "typeId": "linkSkill",
                "index": 2
              },
              "matchedMechanics": [
                {
                  "id": "freeze",
                  "label": "동결"
                },
                {
                  "id": "artsAbnormality",
                  "label": "아츠 이상"
                }
              ],
              "summary": "메인 컨트롤 오퍼레이터가 동결 상태의 적에게 강력한 일격을 사용했을 때 사용할 수 있습니다. 지속 시간이 끝나면 꽁꽁이가 자폭하여 주위의 적에게 강제로 동결 상태를 부여하고 냉기 피해를 줍니다."
            }
          ]
        },
        {
          "fromOrder": 5,
          "toOrder": 6,
          "label": "동결",
          "preparationRoutes": []
        },
        {
          "fromOrder": 6,
          "toOrder": 7,
          "label": "다음 조건 연결",
          "preparationRoutes": []
        },
        {
          "fromOrder": 7,
          "toOrder": 8,
          "label": "다음 조건 연결",
          "preparationRoutes": [
            {
              "character": {
                "id": "yvonne",
                "name": "이본"
              },
              "skill": {
                "name": "얼음 폭탄 · β형",
                "type": "배틀 스킬",
                "typeId": "battleSkill",
                "index": 1
              },
              "matchedMechanics": [
                {
                  "id": "freeze",
                  "label": "동결"
                }
              ],
              "summary": "냉기 부착 혹은 자연 부착 상태의 적에게 명중했을 때 목표가 보유한 모든 아츠 부착을 소모하고, 대상에게 강제로 동결을 부여하며 소모한 스택 수치에 따라 냉기 피해를 줍니다."
            },
            {
              "character": {
                "id": "yvonne",
                "name": "이본"
              },
              "skill": {
                "name": "꽁꽁이 · υ37",
                "type": "연계 스킬",
                "typeId": "linkSkill",
                "index": 2
              },
              "matchedMechanics": [
                {
                  "id": "freeze",
                  "label": "동결"
                }
              ],
              "summary": "메인 컨트롤 오퍼레이터가 동결 상태의 적에게 강력한 일격을 사용했을 때 사용할 수 있습니다. 지속 시간이 끝나면 꽁꽁이가 자폭하여 주위의 적에게 강제로 동결 상태를 부여하고 냉기 피해를 줍니다."
            }
          ]
        }
      ]
    },
    "combatFlow": [
      {
        "order": 1,
        "character": {
          "id": "yvonne",
          "name": "이본"
        },
        "stageIds": [
          "setup",
          "trigger",
          "convert"
        ],
        "title": "부착 스택 준비",
        "detail": "냉기 부착 또는 자연 부착을 목표에게 쌓아 이본의 배틀 스킬의 소모 조건을 준비한다.",
        "skill": {
          "name": "얼음 폭탄 · β형",
          "type": "배틀 스킬",
          "typeId": "battleSkill",
          "index": 1
        },
        "conditions": [
          "냉기 부착 혹은 자연 부착 상태의 적에게 명중했을 때 목표가 보유한 모든 아츠 부착을 소모하고, 대상에게 강제로 동결을 부여하며 소모한 스택 수치에 따라 냉기 피해를 줍니다."
        ],
        "timing": "",
        "effects": [
          "배틀 스킬로 적에게 동결 상태를 부여한 후, 동결 부여로 궁극기 에너지 10을 획득하고 중첩된 부착 스택을 소모할 때마다 궁극기 에너지 30을 획득합니다."
        ],
        "mechanics": [
          {
            "id": "frostInfliction",
            "label": "냉기 부착"
          },
          {
            "id": "natureInfliction",
            "label": "자연 부착"
          }
        ],
        "preparationRoutes": [
          {
            "character": {
              "id": "tangtang",
              "name": "탕탕"
            },
            "skill": {
              "name": "우당탕탕 파도!",
              "type": "배틀 스킬",
              "typeId": "battleSkill",
              "index": 1
            },
            "matchedMechanics": [
              {
                "id": "frostInfliction",
                "label": "냉기 부착"
              }
            ],
            "summary": "용오름은 범위 내의 적에게 냉기 부착 1스택을 부여하고 지속적으로 냉기 피해를 줍니다. 와류를 소모해 생성한 용오름의 개수에 따라 스킬 게이지를 반환하며, 와류마다 20포인트를 반환합니다."
          },
          {
            "character": {
              "id": "gilberta",
              "name": "질베르타"
            },
            "skill": {
              "name": "아케인 스태프 · 중력 모드",
              "type": "배틀 스킬",
              "typeId": "battleSkill",
              "index": 1
            },
            "matchedMechanics": [
              {
                "id": "natureInfliction",
                "label": "자연 부착"
              }
            ],
            "summary": "시전이 끝나면 중력 특이점이 폭발하여 범위 내의 적에게 자연 피해를 주고 자연 부착 상태를 부여합니다."
          },
          {
            "character": {
              "id": "tangtang",
              "name": "탕탕"
            },
            "skill": {
              "name": "야, 강물! 도와줘!",
              "type": "연계 스킬",
              "typeId": "linkSkill",
              "index": 2
            },
            "matchedMechanics": [
              {
                "id": "frostInfliction",
                "label": "냉기 부착"
              }
            ],
            "summary": "적이 냉기 부착을 부여받았거나 아츠 폭발 피해를 받았을 때 사용할 수 있습니다."
          },
          {
            "character": {
              "id": "xaihi",
              "name": "자이히"
            },
            "skill": {
              "name": "스트레스 테스트",
              "type": "연계 스킬",
              "typeId": "linkSkill",
              "index": 2
            },
            "matchedMechanics": [
              {
                "id": "frostInfliction",
                "label": "냉기 부착"
              }
            ],
            "summary": "지원 결정체의 생명력 회복 횟수를 모두 소모했을 때 사용할 수 있습니다. 짧게 차지하여 지원 결정체를 적에게 투척해 냉기 피해를 주고 냉기 부착 상태를 부여합니다."
          },
          {
            "character": {
              "id": "gilberta",
              "name": "질베르타"
            },
            "skill": {
              "name": "아케인 스태프 · 중력장",
              "type": "궁극기",
              "typeId": "ultimate",
              "index": 3
            },
            "matchedMechanics": [
              {
                "id": "natureInfliction",
                "label": "자연 부착"
              }
            ],
            "summary": "목표가 방어 불능 상태라면 아츠 취약 효과가 방어 불능 스택마다 3% 추가로 증가합니다. 중력 혼란 구역을 생성하여 구역 내의 적에게 즉시 1회의 자연 피해를 주고 자연 부착을 부여합니다. 구역 내 목표에게 감속 80%와 아츠 취약 30%를 부여합니다."
          }
        ]
      },
      {
        "order": 2,
        "character": {
          "id": "xaihi",
          "name": "자이히"
        },
        "stageIds": [
          "setup",
          "trigger",
          "convert"
        ],
        "title": "냉기 피해 보조",
        "detail": "자이히의 연계 스킬 명중 시 대상이 냉기 부착 또는 동결 상태라면 가동 프로세스로 5초 동안 받는 냉기 피해를 10% 증가시킨다.",
        "skill": {
          "name": "스트레스 테스트",
          "type": "연계 스킬",
          "typeId": "linkSkill",
          "index": 2
        },
        "conditions": [
          "지원 결정체의 생명력 회복 횟수를 모두 소모했을 때 사용할 수 있습니다.",
          "지원 결정체 회복 2회 소모 후"
        ],
        "timing": "",
        "effects": [
          "짧게 차지하여 지원 결정체를 적에게 투척해 냉기 피해를 주고 냉기 부착 상태를 부여합니다."
        ],
        "mechanics": [
          {
            "id": "frostDamage",
            "label": "냉기 피해"
          },
          {
            "id": "frostInfliction",
            "label": "냉기 부착"
          },
          {
            "id": "freeze",
            "label": "동결"
          }
        ],
        "preparationRoutes": [
          {
            "character": {
              "id": "yvonne",
              "name": "이본"
            },
            "skill": {
              "name": "얼음 폭탄 · β형",
              "type": "배틀 스킬",
              "typeId": "battleSkill",
              "index": 1
            },
            "matchedMechanics": [
              {
                "id": "frostInfliction",
                "label": "냉기 부착"
              },
              {
                "id": "freeze",
                "label": "동결"
              }
            ],
            "summary": "냉기 부착 혹은 자연 부착 상태의 적에게 명중했을 때 목표가 보유한 모든 아츠 부착을 소모하고, 대상에게 강제로 동결을 부여하며 소모한 스택 수치에 따라 냉기 피해를 줍니다."
          },
          {
            "character": {
              "id": "tangtang",
              "name": "탕탕"
            },
            "skill": {
              "name": "우당탕탕 파도!",
              "type": "배틀 스킬",
              "typeId": "battleSkill",
              "index": 1
            },
            "matchedMechanics": [
              {
                "id": "frostInfliction",
                "label": "냉기 부착"
              }
            ],
            "summary": "용오름은 범위 내의 적에게 냉기 부착 1스택을 부여하고 지속적으로 냉기 피해를 줍니다. 와류를 소모해 생성한 용오름의 개수에 따라 스킬 게이지를 반환하며, 와류마다 20포인트를 반환합니다."
          },
          {
            "character": {
              "id": "yvonne",
              "name": "이본"
            },
            "skill": {
              "name": "꽁꽁이 · υ37",
              "type": "연계 스킬",
              "typeId": "linkSkill",
              "index": 2
            },
            "matchedMechanics": [
              {
                "id": "freeze",
                "label": "동결"
              }
            ],
            "summary": "메인 컨트롤 오퍼레이터가 동결 상태의 적에게 강력한 일격을 사용했을 때 사용할 수 있습니다. 지속 시간이 끝나면 꽁꽁이가 자폭하여 주위의 적에게 강제로 동결 상태를 부여하고 냉기 피해를 줍니다."
          },
          {
            "character": {
              "id": "tangtang",
              "name": "탕탕"
            },
            "skill": {
              "name": "야, 강물! 도와줘!",
              "type": "연계 스킬",
              "typeId": "linkSkill",
              "index": 2
            },
            "matchedMechanics": [
              {
                "id": "frostInfliction",
                "label": "냉기 부착"
              }
            ],
            "summary": "적이 냉기 부착을 부여받았거나 아츠 폭발 피해를 받았을 때 사용할 수 있습니다."
          }
        ]
      },
      {
        "order": 3,
        "character": {
          "id": "tangtang",
          "name": "탕탕"
        },
        "stageIds": [
          "setup",
          "trigger",
          "convert",
          "recycle"
        ],
        "title": "와류 생성",
        "detail": "냉기 부착 또는 아츠 폭발 피해 조건을 맞춰 탕탕의 연계 스킬을 사용하고 30초 동안 유지되는 와류를 최대 2개까지 준비한다.",
        "skill": {
          "name": "야, 강물! 도와줘!",
          "type": "연계 스킬",
          "typeId": "linkSkill",
          "index": 2
        },
        "conditions": [
          "적이 냉기 부착을 부여받았거나 아츠 폭발 피해를 받았을 때 사용할 수 있습니다.",
          "냉기 부착·아츠 폭발 피해 조건"
        ],
        "timing": "",
        "effects": [],
        "mechanics": [
          {
            "id": "frostInfliction",
            "label": "냉기 부착"
          }
        ],
        "preparationRoutes": [
          {
            "character": {
              "id": "yvonne",
              "name": "이본"
            },
            "skill": {
              "name": "얼음 폭탄 · β형",
              "type": "배틀 스킬",
              "typeId": "battleSkill",
              "index": 1
            },
            "matchedMechanics": [
              {
                "id": "frostInfliction",
                "label": "냉기 부착"
              }
            ],
            "summary": "냉기 부착 혹은 자연 부착 상태의 적에게 명중했을 때 목표가 보유한 모든 아츠 부착을 소모하고, 대상에게 강제로 동결을 부여하며 소모한 스택 수치에 따라 냉기 피해를 줍니다. 배틀 스킬로 적에게 동결 상태를 부여한 후, 동결 부여로 궁극기 에너지 10을 획득하고 중첩된 부착 스택을 소모할 때마다 궁극기 에너지 30을 획득합니다."
          },
          {
            "character": {
              "id": "tangtang",
              "name": "탕탕"
            },
            "skill": {
              "name": "우당탕탕 파도!",
              "type": "배틀 스킬",
              "typeId": "battleSkill",
              "index": 1
            },
            "matchedMechanics": [
              {
                "id": "frostInfliction",
                "label": "냉기 부착"
              }
            ],
            "summary": "용오름은 범위 내의 적에게 냉기 부착 1스택을 부여하고 지속적으로 냉기 피해를 줍니다. 와류를 소모해 생성한 용오름의 개수에 따라 스킬 게이지를 반환하며, 와류마다 20포인트를 반환합니다."
          },
          {
            "character": {
              "id": "xaihi",
              "name": "자이히"
            },
            "skill": {
              "name": "스트레스 테스트",
              "type": "연계 스킬",
              "typeId": "linkSkill",
              "index": 2
            },
            "matchedMechanics": [
              {
                "id": "frostInfliction",
                "label": "냉기 부착"
              }
            ],
            "summary": "지원 결정체의 생명력 회복 횟수를 모두 소모했을 때 사용할 수 있습니다. 짧게 차지하여 지원 결정체를 적에게 투척해 냉기 피해를 주고 냉기 부착 상태를 부여합니다."
          }
        ]
      },
      {
        "order": 4,
        "character": {
          "id": "yvonne",
          "name": "이본"
        },
        "stageIds": [
          "setup",
          "trigger",
          "convert",
          "payoff"
        ],
        "title": "연계 제어",
        "detail": "동결 대상에게 강력한 일격을 명중시켜 이본의 연계 스킬을 발동하고, 끌어당김·지속 피해·종료 시 강제 동결과 궁극기 에너지를 확보한다.",
        "skill": {
          "name": "꽁꽁이 · υ37",
          "type": "연계 스킬",
          "typeId": "linkSkill",
          "index": 2
        },
        "conditions": [
          "메인 컨트롤 오퍼레이터가 동결 상태의 적에게 강력한 일격을 사용했을 때 사용할 수 있습니다.",
          "동결 대상 강력한 일격 후"
        ],
        "timing": "",
        "effects": [
          "지속 시간이 끝나면 꽁꽁이가 자폭하여 주위의 적에게 강제로 동결 상태를 부여하고 냉기 피해를 줍니다."
        ],
        "mechanics": [
          {
            "id": "freeze",
            "label": "동결"
          },
          {
            "id": "powerStrike",
            "label": "강력한 일격"
          },
          {
            "id": "ultimateEnergy",
            "label": "궁극기 에너지"
          },
          {
            "id": "ultimate",
            "label": "궁극기"
          }
        ],
        "preparationRoutes": [
          {
            "character": {
              "id": "yvonne",
              "name": "이본"
            },
            "skill": {
              "name": "얼음 폭탄 · β형",
              "type": "배틀 스킬",
              "typeId": "battleSkill",
              "index": 1
            },
            "matchedMechanics": [
              {
                "id": "freeze",
                "label": "동결"
              }
            ],
            "summary": "냉기 부착 혹은 자연 부착 상태의 적에게 명중했을 때 목표가 보유한 모든 아츠 부착을 소모하고, 대상에게 강제로 동결을 부여하며 소모한 스택 수치에 따라 냉기 피해를 줍니다."
          }
        ]
      },
      {
        "order": 5,
        "character": {
          "id": "gilberta",
          "name": "질베르타"
        },
        "stageIds": [
          "setup",
          "trigger",
          "convert"
        ],
        "title": "아츠 이상 준비",
        "detail": "파티가 적에게 연소·감전·동결·부식 중 하나를 부여해 질베르타의 연계 스킬의 발동 조건을 만든다.",
        "skill": {
          "name": "아케인 스태프 · 매트릭스 이동",
          "type": "연계 스킬",
          "typeId": "linkSkill",
          "index": 2
        },
        "conditions": [
          "아츠 이상 효과를 부여한 적이 있을 때 사용할 수 있습니다.",
          "아츠 이상 대상"
        ],
        "timing": "",
        "effects": [
          "짧게 시전하여 목표 및 주변의 모든 적을 중력으로 끌어당기고 자연 피해와 강제 띄우기 피해를 줍니다."
        ],
        "mechanics": [
          {
            "id": "artsAbnormality",
            "label": "아츠 이상"
          },
          {
            "id": "combustion",
            "label": "연소"
          },
          {
            "id": "shock",
            "label": "감전"
          },
          {
            "id": "freeze",
            "label": "동결"
          },
          {
            "id": "corrosion",
            "label": "부식"
          }
        ],
        "preparationRoutes": [
          {
            "character": {
              "id": "yvonne",
              "name": "이본"
            },
            "skill": {
              "name": "얼음 폭탄 · β형",
              "type": "배틀 스킬",
              "typeId": "battleSkill",
              "index": 1
            },
            "matchedMechanics": [
              {
                "id": "freeze",
                "label": "동결"
              },
              {
                "id": "artsAbnormality",
                "label": "아츠 이상"
              }
            ],
            "summary": "냉기 부착 혹은 자연 부착 상태의 적에게 명중했을 때 목표가 보유한 모든 아츠 부착을 소모하고, 대상에게 강제로 동결을 부여하며 소모한 스택 수치에 따라 냉기 피해를 줍니다."
          },
          {
            "character": {
              "id": "yvonne",
              "name": "이본"
            },
            "skill": {
              "name": "꽁꽁이 · υ37",
              "type": "연계 스킬",
              "typeId": "linkSkill",
              "index": 2
            },
            "matchedMechanics": [
              {
                "id": "freeze",
                "label": "동결"
              },
              {
                "id": "artsAbnormality",
                "label": "아츠 이상"
              }
            ],
            "summary": "메인 컨트롤 오퍼레이터가 동결 상태의 적에게 강력한 일격을 사용했을 때 사용할 수 있습니다. 지속 시간이 끝나면 꽁꽁이가 자폭하여 주위의 적에게 강제로 동결 상태를 부여하고 냉기 피해를 줍니다."
          }
        ]
      },
      {
        "order": 6,
        "character": {
          "id": "xaihi",
          "name": "자이히"
        },
        "stageIds": [
          "setup",
          "convert",
          "payoff"
        ],
        "title": "팀 증폭·정화",
        "detail": "자이히의 궁극기로 팀 전체에 냉기·자연 증폭을 부여하고, 동시에 팀의 냉기 부착과 동결을 정화한다.",
        "skill": {
          "name": "스택 오버플로",
          "type": "궁극기",
          "typeId": "ultimate",
          "index": 3
        },
        "conditions": [],
        "timing": "냉기 증폭·자연 증폭 효과를 먼저 적용한 뒤 이본의 궁극기를 이어갑니다.",
        "effects": [
          "팀 전체에게 일정 시간 냉기 증폭과 자연 증폭 상태를 부여합니다."
        ],
        "mechanics": [
          {
            "id": "frostInfliction",
            "label": "냉기 부착"
          },
          {
            "id": "freeze",
            "label": "동결"
          },
          {
            "id": "natureAmplification",
            "label": "자연 증폭"
          },
          {
            "id": "cleanse",
            "label": "정화"
          }
        ],
        "preparationRoutes": []
      },
      {
        "order": 7,
        "character": {
          "id": "gilberta",
          "name": "질베르타"
        },
        "stageIds": [
          "setup",
          "payoff"
        ],
        "title": "질베르타의 궁극기 전개",
        "detail": "모인 적에게 질베르타의 궁극기를 사용해 자연 부착, 감속 80%, 아츠 취약 30%를 동시에 부여한다.",
        "skill": {
          "name": "아케인 스태프 · 중력장",
          "type": "궁극기",
          "typeId": "ultimate",
          "index": 3
        },
        "conditions": [
          "목표가 방어 불능 상태라면 아츠 취약 효과가 방어 불능 스택마다 3% 추가로 증가합니다.",
          "구역 내 목표가 띄우기 상태라면 구역 효과가 끝날 때까지 띄우기 상태를 유지합니다."
        ],
        "timing": "아츠 취약·감속 효과를 먼저 적용한 뒤 이본의 궁극기를 이어갑니다.",
        "effects": [
          "중력 혼란 구역을 생성하여 구역 내의 적에게 즉시 1회의 자연 피해를 주고 자연 부착을 부여합니다.",
          "구역 내 목표에게 감속 80%와 아츠 취약 30%를 부여합니다."
        ],
        "mechanics": [
          {
            "id": "natureInfliction",
            "label": "자연 부착"
          },
          {
            "id": "artsVulnerability",
            "label": "아츠 취약"
          },
          {
            "id": "slow",
            "label": "감속"
          }
        ],
        "preparationRoutes": []
      },
      {
        "order": 8,
        "character": {
          "id": "yvonne",
          "name": "이본"
        },
        "stageIds": [
          "convert",
          "payoff"
        ],
        "title": "궁극기 집중 공격",
        "detail": "이본의 궁극기로 메인 컨트롤을 점유해 일반 공격으로 치명타 강화 스택을 쌓고, 마지막 강력한 일격으로 동결 대상에게 추가 피해를 준 뒤 동결을 소모한다.",
        "skill": {
          "name": "아이스 슈터",
          "type": "궁극기",
          "typeId": "ultimate",
          "index": 3
        },
        "conditions": [
          "적이 동결 상태라면 추가로 냉기 피해를 1회 준 후 동결 상태를 소모합니다."
        ],
        "timing": "질베르타·자이히의 궁극기로 아츠 취약·냉기 증폭 효과가 적용된 동안 사용해 주력 피해를 집중합니다.",
        "effects": [
          "삐삐를 배치하여 지원을 요청하고 메인 컨트롤 오퍼레이터로 전환합니다.",
          "지속 시간이 끝나기 전의 마지막 공격은 강력한 일격으로 바뀌어 대량의 냉기 피해를 줍니다."
        ],
        "mechanics": [
          {
            "id": "freeze",
            "label": "동결"
          },
          {
            "id": "powerStrike",
            "label": "강력한 일격"
          },
          {
            "id": "mainControl",
            "label": "메인 컨트롤"
          },
          {
            "id": "generalAttack",
            "label": "일반 공격"
          },
          {
            "id": "ultimate",
            "label": "궁극기"
          }
        ],
        "preparationRoutes": [
          {
            "character": {
              "id": "yvonne",
              "name": "이본"
            },
            "skill": {
              "name": "얼음 폭탄 · β형",
              "type": "배틀 스킬",
              "typeId": "battleSkill",
              "index": 1
            },
            "matchedMechanics": [
              {
                "id": "freeze",
                "label": "동결"
              }
            ],
            "summary": "냉기 부착 혹은 자연 부착 상태의 적에게 명중했을 때 목표가 보유한 모든 아츠 부착을 소모하고, 대상에게 강제로 동결을 부여하며 소모한 스택 수치에 따라 냉기 피해를 줍니다."
          },
          {
            "character": {
              "id": "yvonne",
              "name": "이본"
            },
            "skill": {
              "name": "꽁꽁이 · υ37",
              "type": "연계 스킬",
              "typeId": "linkSkill",
              "index": 2
            },
            "matchedMechanics": [
              {
                "id": "freeze",
                "label": "동결"
              }
            ],
            "summary": "메인 컨트롤 오퍼레이터가 동결 상태의 적에게 강력한 일격을 사용했을 때 사용할 수 있습니다. 지속 시간이 끝나면 꽁꽁이가 자폭하여 주위의 적에게 강제로 동결 상태를 부여하고 냉기 피해를 줍니다."
          }
        ]
      }
    ],
    "supportFlow": [],
    "basicOperation": [
      {
        "order": 1,
        "title": "이본 · 배틀 스킬",
        "detail": "냉기 부착 또는 자연 부착을 목표에게 쌓아 이본의 배틀 스킬의 소모 조건을 준비한다."
      },
      {
        "order": 2,
        "title": "자이히 · 연계 스킬",
        "detail": "자이히의 연계 스킬 명중 시 대상이 냉기 부착 또는 동결 상태라면 가동 프로세스로 5초 동안 받는 냉기 피해를 10% 증가시킨다."
      },
      {
        "order": 3,
        "title": "탕탕 · 연계 스킬",
        "detail": "냉기 부착 또는 아츠 폭발 피해 조건을 맞춰 탕탕의 연계 스킬을 사용하고 30초 동안 유지되는 와류를 최대 2개까지 준비한다."
      },
      {
        "order": 4,
        "title": "이본 · 연계 스킬",
        "detail": "동결 대상에게 강력한 일격을 명중시켜 이본의 연계 스킬을 발동하고, 끌어당김·지속 피해·종료 시 강제 동결과 궁극기 에너지를 확보한다."
      },
      {
        "order": 5,
        "title": "질베르타 · 연계 스킬",
        "detail": "파티가 적에게 연소·감전·동결·부식 중 하나를 부여해 질베르타의 연계 스킬의 발동 조건을 만든다."
      },
      {
        "order": 6,
        "title": "자이히 · 궁극기",
        "detail": "자이히의 궁극기로 팀 전체에 냉기·자연 증폭을 부여하고, 동시에 팀의 냉기 부착과 동결을 정화한다."
      },
      {
        "order": 7,
        "title": "질베르타 · 궁극기",
        "detail": "모인 적에게 질베르타의 궁극기를 사용해 자연 부착, 감속 80%, 아츠 취약 30%를 동시에 부여한다."
      },
      {
        "order": 8,
        "title": "이본 · 궁극기",
        "detail": "이본의 궁극기로 메인 컨트롤을 점유해 일반 공격으로 치명타 강화 스택을 쌓고, 마지막 강력한 일격으로 동결 대상에게 추가 피해를 준 뒤 동결을 소모한다."
      }
    ],
    "roles": [
      {
        "character": {
          "id": "yvonne",
          "name": "이본"
        },
        "labels": [
          "냉기 부착·자연 부착 생성",
          "냉기 피해·냉기 부착 소모",
          "동결 활용",
          "전투 자원 순환"
        ],
        "relation": "탕탕의 냉기 피해 조건과 직접 이어집니다."
      },
      {
        "character": {
          "id": "tangtang",
          "name": "탕탕"
        },
        "labels": [
          "냉기 부착 생성",
          "스킬 게이지·스킬 게이지 반환 소모",
          "아츠 취약 지원",
          "전투 자원 순환"
        ],
        "relation": "이본의 냉기 피해 조건과 직접 이어집니다."
      },
      {
        "character": {
          "id": "gilberta",
          "name": "질베르타"
        },
        "labels": [
          "자연 부착·방어 불능 생성",
          "연소·감전·동결·부식 활용",
          "아츠 취약 지원",
          "전투 자원 순환"
        ],
        "relation": "이본의 불균형 조건과 직접 이어집니다."
      },
      {
        "character": {
          "id": "xaihi",
          "name": "자이히"
        },
        "labels": [
          "냉기 부착 생성",
          "치유 소모",
          "동결 활용",
          "아츠 증폭·냉기 증폭 지원"
        ],
        "relation": "이본의 냉기 피해 조건과 직접 이어집니다."
      }
    ],
    "weaknesses": [
      {
        "title": "예열·상태 준비",
        "entries": [
          {
            "character": {
              "id": "yvonne",
              "name": "이본"
            },
            "axis": "냉기·자연 부착 스택 의존",
            "evidence": "얼음 폭탄 · β형의 강제 동결과 스택 비례 피해·궁극기 에너지 획득은 냉기 부착 또는 자연 부착을 보유한 대상의 모든 아츠 부착을 소모해야 발동합니다.",
            "affected": "얼음 폭탄 · β형 · 하이테크 버스트",
            "implication": "부착이 충분히 쌓이지 않은 대상에서는 배틀 스킬의 피해와 궁극기 에너지 수급이 줄어듭니다. 아츠 부착 부여량 감소나 부착 소모 방해 방향의 제약에 민감합니다."
          },
          {
            "character": {
              "id": "yvonne",
              "name": "이본"
            },
            "axis": "높은 궁극기 에너지 요구량",
            "evidence": "아이스 슈터는 궁극기 에너지 220이 필요하며, 주요 에너지 수급원은 얼음 폭탄 · β형과 꽁꽁이 · υ37입니다.",
            "affected": "아이스 슈터 · 얼음 폭탄 · β형 · 꽁꽁이 · υ37",
            "implication": "부착 소모나 연계 스킬 발동이 끊기면 궁극기 회전이 크게 늦어집니다. 궁극기 에너지 획득 감소나 연계 쿨타임 증가 방향의 제약이 특히 불리합니다."
          },
          {
            "character": {
              "id": "yvonne",
              "name": "이본"
            },
            "axis": "동결 상태의 생성과 소모 순서",
            "evidence": "꽁꽁이 · υ37은 동결 대상에게 강력한 일격을 사용해야 발동하지만, 아이스 슈터의 마지막 공격은 동결 상태를 소모합니다.",
            "affected": "꽁꽁이 · υ37 · 아이스 슈터",
            "implication": "연계 스킬 기회를 남기려면 동결을 궁극기 마지막 공격으로 소모하기 전후의 행동 순서를 맞춰야 합니다. 상태 지속 시간 감소나 상태 즉시 제거 방향의 제약에서 순환이 불안정해집니다."
          },
          {
            "character": {
              "id": "yvonne",
              "name": "이본"
            },
            "axis": "메인 컨트롤 오퍼레이터 점유",
            "evidence": "아이스 슈터는 이본을 메인 컨트롤 오퍼레이터로 전환하고, 일반 공격을 반복해 치명타 확률 스택과 마지막 강력한 일격을 완성합니다.",
            "affected": "아이스 슈터",
            "implication": "궁극기 지속 중에는 다른 메인 컨트롤 오퍼레이터의 일반 공격 순환을 사용할 수 없습니다. 교대 제한이나 지속 시간 단축 방향의 제약은 궁극기 완성도를 낮춥니다."
          },
          {
            "character": {
              "id": "yvonne",
              "name": "이본"
            },
            "axis": "잠재력에 따른 궁극기 완성도",
            "evidence": "P1은 연계 범위·추가 방출·궁극기 에너지를 늘리고, P3은 빙점의 치명타 피해를 강화하며, P5는 궁극기 중 공격력과 치명타 피해를 증가시킵니다.",
            "affected": "P1 · P3 · P5",
            "implication": "기본 상태에서도 동결 순환은 가능하지만, 연계 제어와 궁극기 에너지 회수·집중 화력의 상한은 관련 잠재력에 크게 좌우됩니다."
          },
          {
            "character": {
              "id": "tangtang",
              "name": "탕탕"
            },
            "axis": "와류 준비 시간과 최대 수량",
            "evidence": "야, 강물! 도와줘!로 와류를 한 번에 1개 생성하며 필드에는 최대 2개만 존재하고, 연계 스킬의 쿨타임은 12초입니다.",
            "affected": "야, 강물! 도와줘! · 우당탕탕 파도!",
            "implication": "최대 용오름 전환을 위해서는 연계 스킬을 반복해 와류를 미리 준비해야 합니다. 연계 쿨타임 증가나 생성물 지속 시간 감소 방향의 제약에서 준비 시간이 길어집니다."
          },
          {
            "character": {
              "id": "tangtang",
              "name": "탕탕"
            },
            "axis": "스킬 게이지 반환의 사전 설치 의존",
            "evidence": "우당탕탕 파도!는 스킬 게이지 100포인트를 소모하고, 스킬 게이지 반환은 주변 와류를 소모해 용오름을 생성할 때 와류마다 20포인트씩 발생합니다.",
            "affected": "우당탕탕 파도! · 야, 강물! 도와줘!",
            "implication": "와류가 없는 상태에서는 배틀 스킬의 게이지 반환을 얻지 못합니다. 기본 최대 2개의 와류를 모두 소모해도 반환량은 40포인트이므로 자연 회복이나 추가 수급이 필요합니다."
          },
          {
            "character": {
              "id": "tangtang",
              "name": "탕탕"
            },
            "axis": "아츠 취약의 다중 용오름 조건",
            "evidence": "아츠 취약은 여러 개의 용오름이 생성될 때만 부여되며, 용오름 3개에서 10%가 명시되어 있습니다.",
            "affected": "우당탕탕 파도! · 풍랑의 주재자",
            "implication": "와류 준비가 끊기면 아츠 취약 지원도 함께 사라집니다. 소환물 수 제한이나 생성물 제거 방향의 제약에서 파티 지원 가치가 크게 낮아집니다."
          },
          {
            "character": {
              "id": "gilberta",
              "name": "질베르타"
            },
            "axis": "아츠 이상 발동 조건",
            "evidence": "매트릭스 이동은 아츠 이상 효과가 부여된 적이 있어야 사용할 수 있습니다.",
            "affected": "아케인 스태프 · 매트릭스 이동",
            "implication": "질베르타의 기본 스킬만으로는 아츠 이상을 직접 완성하지 못하므로 파티의 부착 조합과 이상 발동 속도에 의존합니다. 상태 부여가 막히거나 늦어지면 광역 집적과 띄우기 기회가 사라집니다."
          },
          {
            "character": {
              "id": "gilberta",
              "name": "질베르타"
            },
            "axis": "지속 시전과 준비 시간",
            "evidence": "중력 모드는 지속 시전 후 마지막 폭발에서 자연 부착을 부여합니다.",
            "affected": "아케인 스태프 · 중력 모드",
            "implication": "자연 부착과 마지막 타격 치유 조건이 시전 종료에 몰려 있습니다. 적이 범위를 벗어나거나 시전이 끊기면 핵심 후속 효과를 놓칠 수 있어 시전 시간 증가·행동 방해 방향의 제약에 약합니다."
          },
          {
            "character": {
              "id": "gilberta",
              "name": "질베르타"
            },
            "axis": "다수 대상 치유 조건",
            "evidence": "뒤늦은 편지는 중력 모드의 마지막 공격 또는 매트릭스 이동이 최소 2명의 적에게 명중해야 발동합니다.",
            "affected": "뒤늦은 편지",
            "implication": "단일 보스전이나 적이 흩어진 상황에서는 치유가 발동하지 않습니다. 적을 모으는 스킬과 실제 명중 수를 함께 확보해야 하므로 안정적인 전담 회복 수단으로 보기 어렵습니다."
          },
          {
            "character": {
              "id": "gilberta",
              "name": "질베르타"
            },
            "axis": "방어 불능 파티 의존",
            "evidence": "중력장의 추가 아츠 취약은 목표의 방어 불능 스택에 따라 증가합니다.",
            "affected": "아케인 스태프 · 중력장 · P2",
            "implication": "기본 아츠 취약은 제공하지만 최대 효율에는 물리 이상과 방어 불능 누적을 담당할 동료가 필요합니다. 방어 불능 축적이 어려운 적이나 물리 이상이 제한되는 전투에서는 강화 폭이 줄어듭니다."
          },
          {
            "character": {
              "id": "gilberta",
              "name": "질베르타"
            },
            "axis": "궁극기·잠재력 의존",
            "evidence": "강한 감속과 아츠 취약은 궁극기에 집중되어 있고 P2·P3·P5가 취약, 충전, 연계 주기를 크게 강화합니다.",
            "affected": "중력장 · P2 · P3 · P5",
            "implication": "궁극기 에너지 수급이 느려지거나 쿨타임이 늘면 주요 지원 공백이 커집니다. 방어 불능 연동 취약과 연계 회전은 잠재력 단계에 따라 체감 차이가 큽니다."
          },
          {
            "character": {
              "id": "xaihi",
              "name": "자이히"
            },
            "axis": "강력한 일격 발동 의존",
            "evidence": "지원 결정체의 치유는 메인 컨트롤 오퍼레이터가 적에게 강력한 일격 피해를 준 후에만 발동합니다.",
            "affected": "디도스 · 스트레스 테스트",
            "implication": "강력한 일격을 자주 사용하지 못하면 치유 2회를 소모하지 못해 연계 스킬 조건도 늦어집니다. 공격 단계 증가나 강력한 일격 봉쇄 방향의 제약에 취약합니다."
          },
          {
            "character": {
              "id": "xaihi",
              "name": "자이히"
            },
            "axis": "연계 스킬의 2회 치유 선행 조건",
            "evidence": "스트레스 테스트는 지원 결정체의 생명력 회복 횟수를 모두 소모해야 사용할 수 있으며, 결정체의 회복은 최대 2회 발동합니다.",
            "affected": "디도스 · 스트레스 테스트",
            "implication": "쿨타임이 8초여도 치유 2회를 먼저 발동하지 못하면 연계 스킬을 사용할 수 없습니다. 피해가 적거나 공격 기회가 끊기는 전투에서는 순환이 지연될 수 있습니다."
          },
          {
            "character": {
              "id": "xaihi",
              "name": "자이히"
            },
            "axis": "아츠 증폭의 최대 생명력 조건",
            "evidence": "디도스의 아츠 증폭 9%는 회복 효과가 발동할 때 메인 컨트롤 오퍼레이터의 생명력이 최대치에 도달한 상태여야 부여되며 중첩되지 않습니다.",
            "affected": "디도스 · P1",
            "implication": "생명력이 계속 감소하는 환경에서는 치유는 작동해도 아츠 증폭을 얻기 어렵습니다. 지속 피해나 최대 생명력 유지 방해 방향의 제약이 지원 화력을 낮춥니다."
          },
          {
            "character": {
              "id": "xaihi",
              "name": "자이히"
            },
            "axis": "냉기 상태 사전 준비",
            "evidence": "가동 프로세스는 스트레스 테스트가 명중할 때 목표가 냉기 부착 또는 동결 상태여야 받는 냉기 피해 +10%를 부여합니다.",
            "affected": "스트레스 테스트 · 가동 프로세스",
            "implication": "연계 스킬 자체가 냉기 부착을 부여하더라도 명중 시점의 상태 판정이 중요하므로, 안정적인 발동을 위해 다른 냉기 부착·동결 공급과 순서를 맞추는 편이 안전합니다."
          },
          {
            "character": {
              "id": "xaihi",
              "name": "자이히"
            },
            "axis": "냉기·자연 파티 조합 의존",
            "evidence": "스택 오버플로의 공격 지원은 팀 전체의 냉기 증폭과 자연 증폭에 한정되며 지능으로 강화됩니다.",
            "affected": "스택 오버플로 · P5",
            "implication": "물리·열기·전기 중심 파티에서는 궁극기의 증폭 효과를 충분히 활용하기 어렵습니다. 속성 혼합 제한이나 지능 감소 방향의 제약에서 지원 가치가 낮아집니다."
          },
          {
            "character": {
              "id": "xaihi",
              "name": "자이히"
            },
            "axis": "제한적인 정화 범위",
            "evidence": "프리징 프로토콜은 팀 전체의 냉기 부착과 동결 상태만 정화합니다.",
            "affected": "프리징 프로토콜 · 스택 오버플로",
            "implication": "다른 이상 효과는 제거하지 못하므로 범용 정화 역할을 완전히 대신할 수 없습니다. 냉기·동결 외 상태 이상이 중심인 전투에서는 재능의 효용이 제한됩니다."
          },
          {
            "character": {
              "id": "xaihi",
              "name": "자이히"
            },
            "axis": "잠재력에 따른 지원 상한",
            "evidence": "P1은 아츠 증폭을 추가로 5% 높이고, P3은 연계 스킬을 추가 목표에 튕기며, P5는 궁극기의 증폭 효과를 1.1배로 강화합니다.",
            "affected": "P1 · P3 · P5",
            "implication": "기본 상태에서도 치유와 속성 증폭을 제공하지만 다중 대상 연계와 아츠·속성 증폭의 상한은 관련 잠재력에 크게 좌우됩니다."
          }
        ]
      },
      {
        "title": "스킬 게이지·궁극기 순환",
        "entries": [
          {
            "character": {
              "id": "yvonne",
              "name": "이본"
            },
            "axis": "냉기·자연 부착 스택 의존",
            "evidence": "얼음 폭탄 · β형의 강제 동결과 스택 비례 피해·궁극기 에너지 획득은 냉기 부착 또는 자연 부착을 보유한 대상의 모든 아츠 부착을 소모해야 발동합니다.",
            "affected": "얼음 폭탄 · β형 · 하이테크 버스트",
            "implication": "부착이 충분히 쌓이지 않은 대상에서는 배틀 스킬의 피해와 궁극기 에너지 수급이 줄어듭니다. 아츠 부착 부여량 감소나 부착 소모 방해 방향의 제약에 민감합니다."
          },
          {
            "character": {
              "id": "yvonne",
              "name": "이본"
            },
            "axis": "높은 궁극기 에너지 요구량",
            "evidence": "아이스 슈터는 궁극기 에너지 220이 필요하며, 주요 에너지 수급원은 얼음 폭탄 · β형과 꽁꽁이 · υ37입니다.",
            "affected": "아이스 슈터 · 얼음 폭탄 · β형 · 꽁꽁이 · υ37",
            "implication": "부착 소모나 연계 스킬 발동이 끊기면 궁극기 회전이 크게 늦어집니다. 궁극기 에너지 획득 감소나 연계 쿨타임 증가 방향의 제약이 특히 불리합니다."
          },
          {
            "character": {
              "id": "yvonne",
              "name": "이본"
            },
            "axis": "대상 수에 따른 자원 효율 제한",
            "evidence": "얼음 폭탄 · β형과 꽁꽁이 · υ37은 여러 목표를 명중해도 궁극기 에너지를 1회만 획득하며, P4의 스킬 게이지 반환은 폭발이 단일 목표에 명중했을 때만 발동합니다.",
            "affected": "얼음 폭탄 · β형 · 꽁꽁이 · υ37 · P4",
            "implication": "다수전에서 제어 범위는 넓어도 에너지 획득량은 대상 수만큼 늘지 않으며, P4의 게이지 반환은 오히려 단일 대상에서만 얻을 수 있습니다."
          },
          {
            "character": {
              "id": "yvonne",
              "name": "이본"
            },
            "axis": "잠재력에 따른 궁극기 완성도",
            "evidence": "P1은 연계 범위·추가 방출·궁극기 에너지를 늘리고, P3은 빙점의 치명타 피해를 강화하며, P5는 궁극기 중 공격력과 치명타 피해를 증가시킵니다.",
            "affected": "P1 · P3 · P5",
            "implication": "기본 상태에서도 동결 순환은 가능하지만, 연계 제어와 궁극기 에너지 회수·집중 화력의 상한은 관련 잠재력에 크게 좌우됩니다."
          },
          {
            "character": {
              "id": "tangtang",
              "name": "탕탕"
            },
            "axis": "와류 준비 시간과 최대 수량",
            "evidence": "야, 강물! 도와줘!로 와류를 한 번에 1개 생성하며 필드에는 최대 2개만 존재하고, 연계 스킬의 쿨타임은 12초입니다.",
            "affected": "야, 강물! 도와줘! · 우당탕탕 파도!",
            "implication": "최대 용오름 전환을 위해서는 연계 스킬을 반복해 와류를 미리 준비해야 합니다. 연계 쿨타임 증가나 생성물 지속 시간 감소 방향의 제약에서 준비 시간이 길어집니다."
          },
          {
            "character": {
              "id": "tangtang",
              "name": "탕탕"
            },
            "axis": "스킬 게이지 반환의 사전 설치 의존",
            "evidence": "우당탕탕 파도!는 스킬 게이지 100포인트를 소모하고, 스킬 게이지 반환은 주변 와류를 소모해 용오름을 생성할 때 와류마다 20포인트씩 발생합니다.",
            "affected": "우당탕탕 파도! · 야, 강물! 도와줘!",
            "implication": "와류가 없는 상태에서는 배틀 스킬의 게이지 반환을 얻지 못합니다. 기본 최대 2개의 와류를 모두 소모해도 반환량은 40포인트이므로 자연 회복이나 추가 수급이 필요합니다."
          },
          {
            "character": {
              "id": "tangtang",
              "name": "탕탕"
            },
            "axis": "잠재력에 따른 순환 효율",
            "evidence": "P1은 연계 쿨타임과 와류당 추가 게이지 반환을 개선하고, P3은 아츠 취약을 강화하며, P5는 궁극기와 궁극기 생성 용오름의 피해를 강화합니다.",
            "affected": "P1 · P3 · P5",
            "implication": "기본 구조는 완성되어 있지만 와류 회전·아츠 취약 수치·궁극기 폭발력의 상한은 관련 잠재력에 크게 좌우됩니다."
          },
          {
            "character": {
              "id": "gilberta",
              "name": "질베르타"
            },
            "axis": "다수 대상 치유 조건",
            "evidence": "뒤늦은 편지는 중력 모드의 마지막 공격 또는 매트릭스 이동이 최소 2명의 적에게 명중해야 발동합니다.",
            "affected": "뒤늦은 편지",
            "implication": "단일 보스전이나 적이 흩어진 상황에서는 치유가 발동하지 않습니다. 적을 모으는 스킬과 실제 명중 수를 함께 확보해야 하므로 안정적인 전담 회복 수단으로 보기 어렵습니다."
          },
          {
            "character": {
              "id": "gilberta",
              "name": "질베르타"
            },
            "axis": "궁극기·잠재력 의존",
            "evidence": "강한 감속과 아츠 취약은 궁극기에 집중되어 있고 P2·P3·P5가 취약, 충전, 연계 주기를 크게 강화합니다.",
            "affected": "중력장 · P2 · P3 · P5",
            "implication": "궁극기 에너지 수급이 느려지거나 쿨타임이 늘면 주요 지원 공백이 커집니다. 방어 불능 연동 취약과 연계 회전은 잠재력 단계에 따라 체감 차이가 큽니다."
          },
          {
            "character": {
              "id": "xaihi",
              "name": "자이히"
            },
            "axis": "연계 스킬의 2회 치유 선행 조건",
            "evidence": "스트레스 테스트는 지원 결정체의 생명력 회복 횟수를 모두 소모해야 사용할 수 있으며, 결정체의 회복은 최대 2회 발동합니다.",
            "affected": "디도스 · 스트레스 테스트",
            "implication": "쿨타임이 8초여도 치유 2회를 먼저 발동하지 못하면 연계 스킬을 사용할 수 없습니다. 피해가 적거나 공격 기회가 끊기는 전투에서는 순환이 지연될 수 있습니다."
          },
          {
            "character": {
              "id": "xaihi",
              "name": "자이히"
            },
            "axis": "아츠 증폭의 최대 생명력 조건",
            "evidence": "디도스의 아츠 증폭 9%는 회복 효과가 발동할 때 메인 컨트롤 오퍼레이터의 생명력이 최대치에 도달한 상태여야 부여되며 중첩되지 않습니다.",
            "affected": "디도스 · P1",
            "implication": "생명력이 계속 감소하는 환경에서는 치유는 작동해도 아츠 증폭을 얻기 어렵습니다. 지속 피해나 최대 생명력 유지 방해 방향의 제약이 지원 화력을 낮춥니다."
          }
        ]
      },
      {
        "title": "위치·대상 수",
        "entries": [
          {
            "character": {
              "id": "yvonne",
              "name": "이본"
            },
            "axis": "대상 수에 따른 자원 효율 제한",
            "evidence": "얼음 폭탄 · β형과 꽁꽁이 · υ37은 여러 목표를 명중해도 궁극기 에너지를 1회만 획득하며, P4의 스킬 게이지 반환은 폭발이 단일 목표에 명중했을 때만 발동합니다.",
            "affected": "얼음 폭탄 · β형 · 꽁꽁이 · υ37 · P4",
            "implication": "다수전에서 제어 범위는 넓어도 에너지 획득량은 대상 수만큼 늘지 않으며, P4의 게이지 반환은 오히려 단일 대상에서만 얻을 수 있습니다."
          },
          {
            "character": {
              "id": "yvonne",
              "name": "이본"
            },
            "axis": "잠재력에 따른 궁극기 완성도",
            "evidence": "P1은 연계 범위·추가 방출·궁극기 에너지를 늘리고, P3은 빙점의 치명타 피해를 강화하며, P5는 궁극기 중 공격력과 치명타 피해를 증가시킵니다.",
            "affected": "P1 · P3 · P5",
            "implication": "기본 상태에서도 동결 순환은 가능하지만, 연계 제어와 궁극기 에너지 회수·집중 화력의 상한은 관련 잠재력에 크게 좌우됩니다."
          },
          {
            "character": {
              "id": "tangtang",
              "name": "탕탕"
            },
            "axis": "스킬 게이지 반환의 사전 설치 의존",
            "evidence": "우당탕탕 파도!는 스킬 게이지 100포인트를 소모하고, 스킬 게이지 반환은 주변 와류를 소모해 용오름을 생성할 때 와류마다 20포인트씩 발생합니다.",
            "affected": "우당탕탕 파도! · 야, 강물! 도와줘!",
            "implication": "와류가 없는 상태에서는 배틀 스킬의 게이지 반환을 얻지 못합니다. 기본 최대 2개의 와류를 모두 소모해도 반환량은 40포인트이므로 자연 회복이나 추가 수급이 필요합니다."
          },
          {
            "character": {
              "id": "tangtang",
              "name": "탕탕"
            },
            "axis": "위치 기반 가속·감속",
            "evidence": "의기투합의 가속과 감속은 와류 주변 5미터에서 적용되고 범위를 벗어난 뒤 3초만 유지됩니다.",
            "affected": "의기투합 · 와류",
            "implication": "전투 위치가 와류에서 멀어지거나 적이 크게 이동하면 지원 효과를 계속 받기 어렵습니다. 적 이동 증가나 설치물 범위 축소 방향의 제약에 취약합니다."
          },
          {
            "character": {
              "id": "gilberta",
              "name": "질베르타"
            },
            "axis": "지속 시전과 준비 시간",
            "evidence": "중력 모드는 지속 시전 후 마지막 폭발에서 자연 부착을 부여합니다.",
            "affected": "아케인 스태프 · 중력 모드",
            "implication": "자연 부착과 마지막 타격 치유 조건이 시전 종료에 몰려 있습니다. 적이 범위를 벗어나거나 시전이 끊기면 핵심 후속 효과를 놓칠 수 있어 시전 시간 증가·행동 방해 방향의 제약에 약합니다."
          },
          {
            "character": {
              "id": "gilberta",
              "name": "질베르타"
            },
            "axis": "다수 대상 치유 조건",
            "evidence": "뒤늦은 편지는 중력 모드의 마지막 공격 또는 매트릭스 이동이 최소 2명의 적에게 명중해야 발동합니다.",
            "affected": "뒤늦은 편지",
            "implication": "단일 보스전이나 적이 흩어진 상황에서는 치유가 발동하지 않습니다. 적을 모으는 스킬과 실제 명중 수를 함께 확보해야 하므로 안정적인 전담 회복 수단으로 보기 어렵습니다."
          },
          {
            "character": {
              "id": "xaihi",
              "name": "자이히"
            },
            "axis": "연계 스킬의 2회 치유 선행 조건",
            "evidence": "스트레스 테스트는 지원 결정체의 생명력 회복 횟수를 모두 소모해야 사용할 수 있으며, 결정체의 회복은 최대 2회 발동합니다.",
            "affected": "디도스 · 스트레스 테스트",
            "implication": "쿨타임이 8초여도 치유 2회를 먼저 발동하지 못하면 연계 스킬을 사용할 수 없습니다. 피해가 적거나 공격 기회가 끊기는 전투에서는 순환이 지연될 수 있습니다."
          },
          {
            "character": {
              "id": "xaihi",
              "name": "자이히"
            },
            "axis": "냉기 상태 사전 준비",
            "evidence": "가동 프로세스는 스트레스 테스트가 명중할 때 목표가 냉기 부착 또는 동결 상태여야 받는 냉기 피해 +10%를 부여합니다.",
            "affected": "스트레스 테스트 · 가동 프로세스",
            "implication": "연계 스킬 자체가 냉기 부착을 부여하더라도 명중 시점의 상태 판정이 중요하므로, 안정적인 발동을 위해 다른 냉기 부착·동결 공급과 순서를 맞추는 편이 안전합니다."
          },
          {
            "character": {
              "id": "xaihi",
              "name": "자이히"
            },
            "axis": "제한적인 정화 범위",
            "evidence": "프리징 프로토콜은 팀 전체의 냉기 부착과 동결 상태만 정화합니다.",
            "affected": "프리징 프로토콜 · 스택 오버플로",
            "implication": "다른 이상 효과는 제거하지 못하므로 범용 정화 역할을 완전히 대신할 수 없습니다. 냉기·동결 외 상태 이상이 중심인 전투에서는 재능의 효용이 제한됩니다."
          }
        ]
      },
      {
        "title": "생존·피격 조건",
        "entries": [
          {
            "character": {
              "id": "tangtang",
              "name": "탕탕"
            },
            "axis": "지속 제어와 조기 폭발의 선택",
            "evidence": "고대의 진은 4초 동안 적을 묶고 피해를 주지만, 낙하 공격을 사용하면 변화가 중단되고 거대한 파도가 예정보다 일찍 발생합니다.",
            "affected": "대당가께서 지켜보고 계신다!",
            "implication": "조기 폭발을 선택하면 강화된 파도와 용오름을 빠르게 얻는 대신 남은 지속 제어 구간을 끝내게 됩니다. 생존이나 제어 유지가 중요한 상황에서는 발동 시점을 조절해야 합니다."
          },
          {
            "character": {
              "id": "gilberta",
              "name": "질베르타"
            },
            "axis": "지속 시전과 준비 시간",
            "evidence": "중력 모드는 지속 시전 후 마지막 폭발에서 자연 부착을 부여합니다.",
            "affected": "아케인 스태프 · 중력 모드",
            "implication": "자연 부착과 마지막 타격 치유 조건이 시전 종료에 몰려 있습니다. 적이 범위를 벗어나거나 시전이 끊기면 핵심 후속 효과를 놓칠 수 있어 시전 시간 증가·행동 방해 방향의 제약에 약합니다."
          },
          {
            "character": {
              "id": "gilberta",
              "name": "질베르타"
            },
            "axis": "다수 대상 치유 조건",
            "evidence": "뒤늦은 편지는 중력 모드의 마지막 공격 또는 매트릭스 이동이 최소 2명의 적에게 명중해야 발동합니다.",
            "affected": "뒤늦은 편지",
            "implication": "단일 보스전이나 적이 흩어진 상황에서는 치유가 발동하지 않습니다. 적을 모으는 스킬과 실제 명중 수를 함께 확보해야 하므로 안정적인 전담 회복 수단으로 보기 어렵습니다."
          },
          {
            "character": {
              "id": "xaihi",
              "name": "자이히"
            },
            "axis": "강력한 일격 발동 의존",
            "evidence": "지원 결정체의 치유는 메인 컨트롤 오퍼레이터가 적에게 강력한 일격 피해를 준 후에만 발동합니다.",
            "affected": "디도스 · 스트레스 테스트",
            "implication": "강력한 일격을 자주 사용하지 못하면 치유 2회를 소모하지 못해 연계 스킬 조건도 늦어집니다. 공격 단계 증가나 강력한 일격 봉쇄 방향의 제약에 취약합니다."
          },
          {
            "character": {
              "id": "xaihi",
              "name": "자이히"
            },
            "axis": "연계 스킬의 2회 치유 선행 조건",
            "evidence": "스트레스 테스트는 지원 결정체의 생명력 회복 횟수를 모두 소모해야 사용할 수 있으며, 결정체의 회복은 최대 2회 발동합니다.",
            "affected": "디도스 · 스트레스 테스트",
            "implication": "쿨타임이 8초여도 치유 2회를 먼저 발동하지 못하면 연계 스킬을 사용할 수 없습니다. 피해가 적거나 공격 기회가 끊기는 전투에서는 순환이 지연될 수 있습니다."
          },
          {
            "character": {
              "id": "xaihi",
              "name": "자이히"
            },
            "axis": "아츠 증폭의 최대 생명력 조건",
            "evidence": "디도스의 아츠 증폭 9%는 회복 효과가 발동할 때 메인 컨트롤 오퍼레이터의 생명력이 최대치에 도달한 상태여야 부여되며 중첩되지 않습니다.",
            "affected": "디도스 · P1",
            "implication": "생명력이 계속 감소하는 환경에서는 치유는 작동해도 아츠 증폭을 얻기 어렵습니다. 지속 피해나 최대 생명력 유지 방해 방향의 제약이 지원 화력을 낮춥니다."
          },
          {
            "character": {
              "id": "xaihi",
              "name": "자이히"
            },
            "axis": "잠재력에 따른 지원 상한",
            "evidence": "P1은 아츠 증폭을 추가로 5% 높이고, P3은 연계 스킬을 추가 목표에 튕기며, P5는 궁극기의 증폭 효과를 1.1배로 강화합니다.",
            "affected": "P1 · P3 · P5",
            "implication": "기본 상태에서도 치유와 속성 증폭을 제공하지만 다중 대상 연계와 아츠·속성 증폭의 상한은 관련 잠재력에 크게 좌우됩니다."
          }
        ]
      },
      {
        "title": "잠재력 의존",
        "entries": [
          {
            "character": {
              "id": "yvonne",
              "name": "이본"
            },
            "axis": "대상 수에 따른 자원 효율 제한",
            "evidence": "얼음 폭탄 · β형과 꽁꽁이 · υ37은 여러 목표를 명중해도 궁극기 에너지를 1회만 획득하며, P4의 스킬 게이지 반환은 폭발이 단일 목표에 명중했을 때만 발동합니다.",
            "affected": "얼음 폭탄 · β형 · 꽁꽁이 · υ37 · P4",
            "implication": "다수전에서 제어 범위는 넓어도 에너지 획득량은 대상 수만큼 늘지 않으며, P4의 게이지 반환은 오히려 단일 대상에서만 얻을 수 있습니다."
          },
          {
            "character": {
              "id": "yvonne",
              "name": "이본"
            },
            "axis": "잠재력에 따른 궁극기 완성도",
            "evidence": "P1은 연계 범위·추가 방출·궁극기 에너지를 늘리고, P3은 빙점의 치명타 피해를 강화하며, P5는 궁극기 중 공격력과 치명타 피해를 증가시킵니다.",
            "affected": "P1 · P3 · P5",
            "implication": "기본 상태에서도 동결 순환은 가능하지만, 연계 제어와 궁극기 에너지 회수·집중 화력의 상한은 관련 잠재력에 크게 좌우됩니다."
          },
          {
            "character": {
              "id": "tangtang",
              "name": "탕탕"
            },
            "axis": "잠재력에 따른 순환 효율",
            "evidence": "P1은 연계 쿨타임과 와류당 추가 게이지 반환을 개선하고, P3은 아츠 취약을 강화하며, P5는 궁극기와 궁극기 생성 용오름의 피해를 강화합니다.",
            "affected": "P1 · P3 · P5",
            "implication": "기본 구조는 완성되어 있지만 와류 회전·아츠 취약 수치·궁극기 폭발력의 상한은 관련 잠재력에 크게 좌우됩니다."
          },
          {
            "character": {
              "id": "gilberta",
              "name": "질베르타"
            },
            "axis": "역할군 제한 지원",
            "evidence": "전달자의 노래는 가드·캐스터·서포터 오퍼레이터에게만 궁극기 충전 효율을 제공합니다.",
            "affected": "전달자의 노래 · P3",
            "implication": "디펜더·스트라이커·뱅가드 중심 조합에서는 재능과 P3의 가치가 낮아집니다. 파티 역할군 구성이 바뀌면 핵심 지원 효과의 수혜 인원이 크게 달라집니다."
          },
          {
            "character": {
              "id": "gilberta",
              "name": "질베르타"
            },
            "axis": "궁극기·잠재력 의존",
            "evidence": "강한 감속과 아츠 취약은 궁극기에 집중되어 있고 P2·P3·P5가 취약, 충전, 연계 주기를 크게 강화합니다.",
            "affected": "중력장 · P2 · P3 · P5",
            "implication": "궁극기 에너지 수급이 느려지거나 쿨타임이 늘면 주요 지원 공백이 커집니다. 방어 불능 연동 취약과 연계 회전은 잠재력 단계에 따라 체감 차이가 큽니다."
          },
          {
            "character": {
              "id": "xaihi",
              "name": "자이히"
            },
            "axis": "잠재력에 따른 지원 상한",
            "evidence": "P1은 아츠 증폭을 추가로 5% 높이고, P3은 연계 스킬을 추가 목표에 튕기며, P5는 궁극기의 증폭 효과를 1.1배로 강화합니다.",
            "affected": "P1 · P3 · P5",
            "implication": "기본 상태에서도 치유와 속성 증폭을 제공하지만 다중 대상 연계와 아츠·속성 증폭의 상한은 관련 잠재력에 크게 좌우됩니다."
          }
        ]
      }
    ],
    "discoveries": [
      {
        "character": {
          "id": "yvonne",
          "name": "이본"
        },
        "title": "배틀 스킬 재평가",
        "description": "현재 순환은 궁극기 비중이 높지만, 배틀 스킬은 냉기 피해·냉기 부착 조건을 이용하는 별도 기능을 갖고 있습니다.",
        "opportunity": "주력 피해원을 약화시키되 이 효과까지 함께 막지 않는 설계라면 보조 루트가 새로운 선택지로 떠오를 수 있습니다.",
        "skillName": "배틀 스킬"
      },
      {
        "character": {
          "id": "tangtang",
          "name": "탕탕"
        },
        "title": "연계 스킬 재평가",
        "description": "현재 순환은 배틀 스킬 비중이 높지만, 연계 스킬은 냉기 부착 조건을 이용하는 별도 기능을 갖고 있습니다.",
        "opportunity": "주력 피해원을 약화시키되 이 효과까지 함께 막지 않는 설계라면 보조 루트가 새로운 선택지로 떠오를 수 있습니다.",
        "skillName": "연계 스킬"
      },
      {
        "character": {
          "id": "gilberta",
          "name": "질베르타"
        },
        "title": "궁극기 재평가",
        "description": "현재 순환은 일반 공격 비중이 높지만, 궁극기은 방어 불능·아츠 취약 조건을 이용하는 별도 기능을 갖고 있습니다.",
        "opportunity": "주력 피해원을 약화시키되 이 효과까지 함께 막지 않는 설계라면 보조 루트가 새로운 선택지로 떠오를 수 있습니다.",
        "skillName": "궁극기"
      },
      {
        "character": {
          "id": "xaihi",
          "name": "자이히"
        },
        "title": "배틀 스킬 재평가",
        "description": "현재 순환은 연계 스킬 비중이 높지만, 배틀 스킬은 아츠 증폭·메인 컨트롤 조건을 이용하는 별도 기능을 갖고 있습니다.",
        "opportunity": "주력 피해원을 약화시키되 이 효과까지 함께 막지 않는 설계라면 보조 루트가 새로운 선택지로 떠오를 수 있습니다.",
        "skillName": "배틀 스킬"
      }
    ],
    "designHints": [
      {
        "id": "normal",
        "title": "일반 공격 의존도",
        "pressure": "일반 공격 피해 비중을 낮추는 방향",
        "impact": "강화 상태나 메인 컨트롤 중 일반 공격에 몰린 화력 구간이 짧아집니다.",
        "opportunity": "이본의 배틀 스킬, 탕탕의 연계 스킬처럼 연계·배틀 스킬 중심의 보조 축이 상대적으로 중요해질 수 있습니다.",
        "caution": "일반 공격과 강력한 일격을 동시에 완전히 막으면 스킬 게이지 회복과 불균형 순환까지 함께 끊길 수 있습니다.",
        "characters": [
          {
            "id": "yvonne",
            "name": "이본"
          }
        ]
      },
      {
        "id": "ultimate",
        "title": "궁극기 반복 의존도",
        "pressure": "궁극기 반복 사용의 효율이 점차 낮아지는 방향",
        "impact": "궁극기를 중심으로 한 강화 구간과 마무리 빈도가 줄어듭니다.",
        "opportunity": "궁극기 에너지를 다른 가치로 돌리거나 배틀·연계 스킬을 주력화하는 운용을 찾게 됩니다.",
        "caution": "첫 궁극기까지 무력화하면 준비 과정의 의미도 사라질 수 있으므로 반복 효율을 조절하는 편이 발견을 만들기 쉽습니다.",
        "characters": [
          {
            "id": "yvonne",
            "name": "이본"
          },
          {
            "id": "tangtang",
            "name": "탕탕"
          },
          {
            "id": "xaihi",
            "name": "자이히"
          }
        ]
      },
      {
        "id": "battle",
        "title": "배틀 스킬 피해 비중",
        "pressure": "배틀 스킬의 직접 피해를 줄이되 연계 스킬 순환은 열어주는 방향",
        "impact": "스킬 게이지를 사용해 즉시 내는 화력이 줄어듭니다.",
        "opportunity": "배틀 스킬을 상태 생성·변환 용도로만 쓰고, 연계 스킬이나 궁극기 외 추가 피해를 주력으로 삼는 구조가 떠오를 수 있습니다.",
        "caution": "배틀 스킬의 상태 부여까지 막으면 후속 연계 조건 자체가 사라질 수 있습니다.",
        "characters": [
          {
            "id": "yvonne",
            "name": "이본"
          },
          {
            "id": "tangtang",
            "name": "탕탕"
          },
          {
            "id": "xaihi",
            "name": "자이히"
          }
        ]
      },
      {
        "id": "link",
        "title": "연계 스킬 빈도",
        "pressure": "연계 스킬 사용 빈도와 쿨타임을 크게 흔드는 방향",
        "impact": "조건을 자주 열 수 있는 파티일수록 순환 속도가 크게 달라집니다.",
        "opportunity": "연계 횟수가 늘어날 때 생기는 자원 수급과 보조 피해, 반대로 연계에 대가가 생길 때의 대체 순서를 비교할 수 있습니다.",
        "caution": "연계 조건과 쿨타임을 동시에 막으면 조합의 상호작용이 사라질 수 있습니다.",
        "characters": [
          {
            "id": "yvonne",
            "name": "이본"
          },
          {
            "id": "tangtang",
            "name": "탕탕"
          },
          {
            "id": "xaihi",
            "name": "자이히"
          }
        ]
      },
      {
        "id": "stack",
        "title": "부착·방어 불능 축적 속도",
        "pressure": "같은 대상에게 스택을 연속으로 쌓는 속도를 제한하는 방향",
        "impact": "최대 스택을 전제로 하는 동결·강타·갑옷 파괴·취약 발동 시점이 늦어집니다.",
        "opportunity": "낮은 스택에서 바로 작동하는 스킬, 강제 이상, 직접 부여 효과의 가치가 올라갈 수 있습니다.",
        "caution": "부착 자체를 금지하면 대체 운용이 아니라 파티의 핵심 문법을 삭제하게 됩니다.",
        "characters": [
          {
            "id": "yvonne",
            "name": "이본"
          },
          {
            "id": "tangtang",
            "name": "탕탕"
          },
          {
            "id": "gilberta",
            "name": "질베르타"
          },
          {
            "id": "xaihi",
            "name": "자이히"
          }
        ]
      }
    ],
    "mechanicProfile": {
      "mechanicIds": [
        "freeze",
        "frostInfliction",
        "ultimate",
        "mainControl",
        "natureInfliction",
        "artsInfliction",
        "powerStrike",
        "ultimateEnergy",
        "frostDamage",
        "artsVulnerability",
        "slow",
        "healing",
        "generalAttack",
        "skillGauge",
        "combustion",
        "shock",
        "corrosion",
        "artsAbnormality",
        "launch",
        "defenseless",
        "artsAmplification",
        "natureAmplification",
        "cleanse",
        "haste",
        "artsDamage"
      ],
      "mechanicScores": {
        "freeze": 30,
        "frostInfliction": 26,
        "ultimate": 20,
        "mainControl": 18,
        "natureInfliction": 17.5,
        "artsInfliction": 16.5,
        "powerStrike": 16.5,
        "ultimateEnergy": 16,
        "frostDamage": 9,
        "artsVulnerability": 9,
        "slow": 9,
        "healing": 7.5,
        "generalAttack": 7.5,
        "skillGauge": 6.5,
        "combustion": 6,
        "shock": 6,
        "corrosion": 6,
        "artsAbnormality": 5.5,
        "launch": 5.5,
        "defenseless": 4.5,
        "artsAmplification": 4.5,
        "natureAmplification": 4.5,
        "cleanse": 4.5,
        "haste": 4.5,
        "artsDamage": 3,
        "physicalDamage": 0,
        "heatDamage": 0,
        "electricDamage": 0,
        "natureDamage": 0,
        "heatInfliction": 0,
        "electricInfliction": 0,
        "knockdown": 0,
        "smash": 0,
        "armorBreak": 0,
        "imbalance": 0,
        "execution": 0,
        "physicalVulnerability": 0,
        "heatVulnerability": 0,
        "electricVulnerability": 0,
        "frostVulnerability": 0,
        "natureVulnerability": 0,
        "physicalAmplification": 0,
        "heatAmplification": 0,
        "electricAmplification": 0,
        "frostAmplification": 0,
        "skillGaugeReturn": 0,
        "protection": 0,
        "fortification": 0,
        "weakness": 0,
        "comboHit": 0,
        "originiumCrystal": 0,
        "battleSkill": 0,
        "linkSkill": 0
      },
      "dominantAction": "ultimate",
      "actionTotals": {
        "generalAttack": 8,
        "battleSkill": 16,
        "linkSkill": 16,
        "ultimate": 20
      },
      "hintIds": [
        "normal",
        "ultimate",
        "battle",
        "link",
        "stack"
      ],
      "hintTitles": [
        "일반 공격 의존도",
        "궁극기 반복 의존도",
        "배틀 스킬 피해 비중",
        "연계 스킬 빈도",
        "부착·방어 불능 축적 속도"
      ],
      "weaknessAxes": [
        "냉기·자연 부착 스택 의존",
        "높은 궁극기 에너지 요구량",
        "동결 상태의 생성과 소모 순서",
        "메인 컨트롤 오퍼레이터 점유",
        "잠재력에 따른 궁극기 완성도",
        "와류 준비 시간과 최대 수량",
        "스킬 게이지 반환의 사전 설치 의존",
        "아츠 취약의 다중 용오름 조건",
        "아츠 이상 발동 조건",
        "지속 시전과 준비 시간",
        "다수 대상 치유 조건",
        "방어 불능 파티 의존",
        "궁극기·잠재력 의존",
        "강력한 일격 발동 의존",
        "연계 스킬의 2회 치유 선행 조건",
        "아츠 증폭의 최대 생명력 조건",
        "냉기 상태 사전 준비",
        "냉기·자연 파티 조합 의존",
        "제한적인 정화 범위",
        "잠재력에 따른 지원 상한",
        "냉기·자연 부착 스택 의존",
        "높은 궁극기 에너지 요구량",
        "대상 수에 따른 자원 효율 제한",
        "잠재력에 따른 궁극기 완성도",
        "와류 준비 시간과 최대 수량",
        "스킬 게이지 반환의 사전 설치 의존",
        "잠재력에 따른 순환 효율",
        "다수 대상 치유 조건",
        "궁극기·잠재력 의존",
        "연계 스킬의 2회 치유 선행 조건",
        "아츠 증폭의 최대 생명력 조건",
        "대상 수에 따른 자원 효율 제한",
        "잠재력에 따른 궁극기 완성도",
        "스킬 게이지 반환의 사전 설치 의존",
        "위치 기반 가속·감속",
        "지속 시전과 준비 시간",
        "다수 대상 치유 조건",
        "연계 스킬의 2회 치유 선행 조건",
        "냉기 상태 사전 준비",
        "제한적인 정화 범위",
        "지속 제어와 조기 폭발의 선택",
        "지속 시전과 준비 시간",
        "다수 대상 치유 조건",
        "강력한 일격 발동 의존",
        "연계 스킬의 2회 치유 선행 조건",
        "아츠 증폭의 최대 생명력 조건",
        "잠재력에 따른 지원 상한",
        "대상 수에 따른 자원 효율 제한",
        "잠재력에 따른 궁극기 완성도",
        "잠재력에 따른 순환 효율",
        "역할군 제한 지원",
        "궁극기·잠재력 의존",
        "잠재력에 따른 지원 상한"
      ],
      "dependencyLabels": [
        "동결",
        "냉기 부착",
        "자연 부착",
        "아츠 부착",
        "궁극기"
      ]
    }
  },
  {
    "schemaVersion": 1,
    "id": "party-laevatain-wolfguard-akekuri-adelia",
    "exportedAt": "2026-07-22T14:36:43.137Z",
    "title": "레바테인 · 울프가드 · 아케쿠리 · 아델리아 파티 분석",
    "party": [
      {
        "id": "laevatain",
        "name": "레바테인",
        "order": 1
      },
      {
        "id": "wolfguard",
        "name": "울프가드",
        "order": 2
      },
      {
        "id": "akekuri",
        "name": "아케쿠리",
        "order": 3
      },
      {
        "id": "adelia",
        "name": "아델리아",
        "order": 4
      }
    ],
    "summary": {
      "title": "파티 전투 구조 분석",
      "sentence": "열기 부착을 준비해 연소·부식 조건으로 전환하고, 연계 스킬·배틀 스킬에 화력을 모으는 파티입니다.",
      "dominantAction": "linkSkill",
      "actionTotals": {
        "generalAttack": 6,
        "battleSkill": 26,
        "linkSkill": 29,
        "ultimate": 24
      },
      "dependencies": [
        {
          "id": "combustion",
          "label": "연소",
          "color": "heat",
          "level": "매우 높음",
          "score": 19
        },
        {
          "id": "heatInfliction",
          "label": "열기 부착",
          "color": "heat",
          "level": "매우 높음",
          "score": 14.5
        },
        {
          "id": "skillGauge",
          "label": "스킬 게이지",
          "color": "cyan",
          "level": "매우 높음",
          "score": 13.5
        },
        {
          "id": "corrosion",
          "label": "부식",
          "color": "nature",
          "level": "매우 높음",
          "score": 11.5
        },
        {
          "id": "linkSkill",
          "label": "연계 스킬",
          "color": "purple",
          "level": "주력 행동",
          "score": 29
        }
      ]
    },
    "diagram": {
      "nodes": [
        {
          "order": 1,
          "character": {
            "id": "wolfguard",
            "name": "울프가드"
          },
          "skill": {
            "name": "폭렬 수류탄 · β형",
            "type": "연계 스킬",
            "typeId": "linkSkill",
            "index": 2
          },
          "title": "아츠 상태 준비"
        },
        {
          "order": 2,
          "character": {
            "id": "adelia",
            "name": "아델리아"
          },
          "skill": {
            "name": "화산 분화",
            "type": "연계 스킬",
            "typeId": "linkSkill",
            "index": 2
          },
          "title": "무상태 대상 포착"
        },
        {
          "order": 3,
          "character": {
            "id": "laevatain",
            "name": "레바테인"
          },
          "skill": {
            "name": "열화",
            "type": "연계 스킬",
            "typeId": "linkSkill",
            "index": 2
          },
          "title": "상태 준비"
        },
        {
          "order": 4,
          "character": {
            "id": "akekuri",
            "name": "아케쿠리"
          },
          "skill": {
            "name": "섬광 돌진",
            "type": "연계 스킬",
            "typeId": "linkSkill",
            "index": 2
          },
          "title": "불균형 준비"
        },
        {
          "order": 5,
          "character": {
            "id": "wolfguard",
            "name": "울프가드"
          },
          "skill": {
            "name": "탄흔의 열기",
            "type": "배틀 스킬",
            "typeId": "battleSkill",
            "index": 1
          },
          "title": "상태 소모 사격"
        },
        {
          "order": 6,
          "character": {
            "id": "wolfguard",
            "name": "울프가드"
          },
          "skill": {
            "name": "늑대의 분노",
            "type": "궁극기",
            "typeId": "ultimate",
            "index": 3
          },
          "title": "궁극기 재점화"
        },
        {
          "order": 7,
          "character": {
            "id": "akekuri",
            "name": "아케쿠리"
          },
          "skill": {
            "name": "소대, 집합!",
            "type": "궁극기",
            "typeId": "ultimate",
            "index": 3
          },
          "title": "궁극기 대량 회복"
        },
        {
          "order": 8,
          "character": {
            "id": "laevatain",
            "name": "레바테인"
          },
          "skill": {
            "name": "황혼",
            "type": "궁극기",
            "typeId": "ultimate",
            "index": 3
          },
          "title": "레바테인의 궁극기 유지"
        }
      ],
      "connections": [
        {
          "fromOrder": 1,
          "toOrder": 2,
          "label": "다음 조건 연결",
          "preparationRoutes": []
        },
        {
          "fromOrder": 2,
          "toOrder": 3,
          "label": "다음 조건 연결",
          "preparationRoutes": [
            {
              "character": {
                "id": "wolfguard",
                "name": "울프가드"
              },
              "skill": {
                "name": "탄흔의 열기",
                "type": "배틀 스킬",
                "typeId": "battleSkill",
                "index": 1
              },
              "matchedMechanics": [
                {
                  "id": "heatInfliction",
                  "label": "열기 부착"
                },
                {
                  "id": "combustion",
                  "label": "연소"
                }
              ],
              "summary": "목표를 연속으로 사격하여 소량의 열기 피해를 주고, 마지막 한 발은 열기 부착 상태를 부여합니다."
            },
            {
              "character": {
                "id": "laevatain",
                "name": "레바테인"
              },
              "skill": {
                "name": "불타오르는 화염",
                "type": "배틀 스킬",
                "typeId": "battleSkill",
                "index": 1
              },
              "matchedMechanics": [
                {
                  "id": "combustion",
                  "label": "연소"
                }
              ],
              "summary": "이미 녹아내린 불꽃 4스택이 쌓였을 경우 마지막에 모든 스택 수치를 소모해 넓은 범위 내의 적에게 추가로 1회 공격하며, 열기 피해를 주고 짧은 강제 연소 상태를 부여합니다."
            },
            {
              "character": {
                "id": "akekuri",
                "name": "아케쿠리"
              },
              "skill": {
                "name": "열정 분출",
                "type": "배틀 스킬",
                "typeId": "battleSkill",
                "index": 1
              },
              "matchedMechanics": [
                {
                  "id": "heatInfliction",
                  "label": "열기 부착"
                }
              ],
              "summary": "전방으로 검을 휘둘러 열기 피해를 주고 열기 부착 상태를 부여합니다."
            },
            {
              "character": {
                "id": "adelia",
                "name": "아델리아"
              },
              "skill": {
                "name": "질주하는 돌리",
                "type": "배틀 스킬",
                "typeId": "battleSkill",
                "index": 1
              },
              "matchedMechanics": [
                {
                  "id": "corrosion",
                  "label": "부식"
                }
              ],
              "summary": "목표가 부식 상태라면 부식을 소모하고 대상에게 물리 취약과 아츠 취약 16%를 30초 동안 부여합니다."
            },
            {
              "character": {
                "id": "wolfguard",
                "name": "울프가드"
              },
              "skill": {
                "name": "폭렬 수류탄 · β형",
                "type": "연계 스킬",
                "typeId": "linkSkill",
                "index": 2
              },
              "matchedMechanics": [
                {
                  "id": "heatInfliction",
                  "label": "열기 부착"
                }
              ],
              "summary": "아츠 부착 상태를 부여한 적이 있을 때 사용할 수 있습니다. 근처 범위 내의 적에게 열기 피해를 주고 열기 부착 상태를 부여합니다."
            },
            {
              "character": {
                "id": "adelia",
                "name": "아델리아"
              },
              "skill": {
                "name": "화산 분화",
                "type": "연계 스킬",
                "typeId": "linkSkill",
                "index": 2
              },
              "matchedMechanics": [
                {
                  "id": "corrosion",
                  "label": "부식"
                }
              ],
              "summary": "메인 컨트롤 오퍼레이터가 방어 불능 혹은 아츠 부착 상태에 처해 있지 않은 적에게 강력한 일격을 준 후 사용할 수 있습니다. 화산 구름은 목표를 추적한 뒤 폭발하여 주변의 다른 적에게 절반의 자연 피해를 주고 강제로 7초 동안 부식 상태를 부여합니다."
            }
          ]
        },
        {
          "fromOrder": 3,
          "toOrder": 4,
          "label": "다음 조건 연결",
          "preparationRoutes": [
            {
              "character": {
                "id": "laevatain",
                "name": "레바테인"
              },
              "skill": {
                "name": "재",
                "type": "일반 공격",
                "typeId": "generalAttack",
                "index": 0
              },
              "matchedMechanics": [
                {
                  "id": "imbalance",
                  "label": "불균형"
                }
              ],
              "summary": "처형 공격: 주변에 불균형 상태의 적이 있을 때 일반 공격을 사용하면 해당 적을 처형하여 대량의 열기 피해를 주고 일정량의 스킬 게이지를 회복합니다. 메인 컨트롤 오퍼레이터라면 강력한 일격이 18포인트의 불균형 피해를 줍니다."
            },
            {
              "character": {
                "id": "wolfguard",
                "name": "울프가드"
              },
              "skill": {
                "name": "다중 연사",
                "type": "일반 공격",
                "typeId": "generalAttack",
                "index": 0
              },
              "matchedMechanics": [
                {
                  "id": "imbalance",
                  "label": "불균형"
                }
              ],
              "summary": "처형 공격: 주변에 불균형 상태의 적이 있을 때, 일반 공격을 사용하면 해당 적을 처형하여 대량의 열기 피해를 주고 일정량의 스킬 게이지를 회복합니다. 메인 컨트롤 오퍼레이터라면 강력한 일격이 18포인트의 불균형 피해를 줍니다."
            },
            {
              "character": {
                "id": "akekuri",
                "name": "아케쿠리"
              },
              "skill": {
                "name": "진취의 검날",
                "type": "일반 공격",
                "typeId": "generalAttack",
                "index": 0
              },
              "matchedMechanics": [
                {
                  "id": "imbalance",
                  "label": "불균형"
                }
              ],
              "summary": "처형 공격: 주변에 불균형 상태의 적이 있을 때, 일반 공격을 사용하면 해당 적을 처형하여 대량의 물리 피해를 주고 일정량의 스킬 게이지를 회복합니다. 메인 컨트롤 오퍼레이터라면 강력한 일격이 17포인트의 불균형 피해를 줍니다."
            },
            {
              "character": {
                "id": "adelia",
                "name": "아델리아"
              },
              "skill": {
                "name": "바위의 속삭임",
                "type": "일반 공격",
                "typeId": "generalAttack",
                "index": 0
              },
              "matchedMechanics": [
                {
                  "id": "imbalance",
                  "label": "불균형"
                }
              ],
              "summary": "처형 공격: 주변에 불균형 상태의 적이 있을 때, 일반 공격을 사용하면 해당 적을 처형하여 대량의 자연 피해를 주고 일정량의 스킬 게이지를 회복합니다. 메인 컨트롤 오퍼레이터라면 강력한 일격이 18포인트의 불균형 피해를 줍니다."
            }
          ]
        },
        {
          "fromOrder": 4,
          "toOrder": 5,
          "label": "다음 조건 연결",
          "preparationRoutes": [
            {
              "character": {
                "id": "laevatain",
                "name": "레바테인"
              },
              "skill": {
                "name": "불타오르는 화염",
                "type": "배틀 스킬",
                "typeId": "battleSkill",
                "index": 1
              },
              "matchedMechanics": [
                {
                  "id": "combustion",
                  "label": "연소"
                }
              ],
              "summary": "이미 녹아내린 불꽃 4스택이 쌓였을 경우 마지막에 모든 스택 수치를 소모해 넓은 범위 내의 적에게 추가로 1회 공격하며, 열기 피해를 주고 짧은 강제 연소 상태를 부여합니다."
            },
            {
              "character": {
                "id": "laevatain",
                "name": "레바테인"
              },
              "skill": {
                "name": "열화",
                "type": "연계 스킬",
                "typeId": "linkSkill",
                "index": 2
              },
              "matchedMechanics": [
                {
                  "id": "combustion",
                  "label": "연소"
                }
              ],
              "summary": "적이 연소 상태거나 부식 상태일 때 사용할 수 있습니다."
            },
            {
              "character": {
                "id": "wolfguard",
                "name": "울프가드"
              },
              "skill": {
                "name": "늑대의 분노",
                "type": "궁극기",
                "typeId": "ultimate",
                "index": 3
              },
              "matchedMechanics": [
                {
                  "id": "combustion",
                  "label": "연소"
                }
              ],
              "summary": "5회에 걸쳐 열기 피해를 주고 강제 연소 상태를 부여합니다."
            }
          ]
        },
        {
          "fromOrder": 5,
          "toOrder": 6,
          "label": "열기 피해",
          "preparationRoutes": []
        },
        {
          "fromOrder": 6,
          "toOrder": 7,
          "label": "다음 조건 연결",
          "preparationRoutes": []
        },
        {
          "fromOrder": 7,
          "toOrder": 8,
          "label": "스킬 게이지 재투자",
          "preparationRoutes": []
        }
      ]
    },
    "combatFlow": [
      {
        "order": 1,
        "character": {
          "id": "wolfguard",
          "name": "울프가드"
        },
        "stageIds": [
          "setup",
          "trigger",
          "convert"
        ],
        "title": "아츠 상태 준비",
        "detail": "연소 또는 감전 상태를 준비하거나, 연계 스킬로 열기 부착을 부여해 스킬 조건을 만든다.",
        "skill": {
          "name": "폭렬 수류탄 · β형",
          "type": "연계 스킬",
          "typeId": "linkSkill",
          "index": 2
        },
        "conditions": [
          "아츠 부착 상태를 부여한 적이 있을 때 사용할 수 있습니다.",
          "아츠 부착 적 존재"
        ],
        "timing": "",
        "effects": [
          "근처 범위 내의 적에게 열기 피해를 주고 열기 부착 상태를 부여합니다."
        ],
        "mechanics": [
          {
            "id": "heatInfliction",
            "label": "열기 부착"
          },
          {
            "id": "combustion",
            "label": "연소"
          },
          {
            "id": "shock",
            "label": "감전"
          },
          {
            "id": "linkSkill",
            "label": "연계 스킬"
          }
        ],
        "preparationRoutes": [
          {
            "character": {
              "id": "wolfguard",
              "name": "울프가드"
            },
            "skill": {
              "name": "탄흔의 열기",
              "type": "배틀 스킬",
              "typeId": "battleSkill",
              "index": 1
            },
            "matchedMechanics": [
              {
                "id": "heatInfliction",
                "label": "열기 부착"
              },
              {
                "id": "combustion",
                "label": "연소"
              },
              {
                "id": "shock",
                "label": "감전"
              }
            ],
            "summary": "목표를 연속으로 사격하여 소량의 열기 피해를 주고, 마지막 한 발은 열기 부착 상태를 부여합니다."
          },
          {
            "character": {
              "id": "laevatain",
              "name": "레바테인"
            },
            "skill": {
              "name": "불타오르는 화염",
              "type": "배틀 스킬",
              "typeId": "battleSkill",
              "index": 1
            },
            "matchedMechanics": [
              {
                "id": "combustion",
                "label": "연소"
              }
            ],
            "summary": "이미 녹아내린 불꽃 4스택이 쌓였을 경우 마지막에 모든 스택 수치를 소모해 넓은 범위 내의 적에게 추가로 1회 공격하며, 열기 피해를 주고 짧은 강제 연소 상태를 부여합니다."
          },
          {
            "character": {
              "id": "akekuri",
              "name": "아케쿠리"
            },
            "skill": {
              "name": "열정 분출",
              "type": "배틀 스킬",
              "typeId": "battleSkill",
              "index": 1
            },
            "matchedMechanics": [
              {
                "id": "heatInfliction",
                "label": "열기 부착"
              }
            ],
            "summary": "전방으로 검을 휘둘러 열기 피해를 주고 열기 부착 상태를 부여합니다."
          },
          {
            "character": {
              "id": "laevatain",
              "name": "레바테인"
            },
            "skill": {
              "name": "열화",
              "type": "연계 스킬",
              "typeId": "linkSkill",
              "index": 2
            },
            "matchedMechanics": [
              {
                "id": "combustion",
                "label": "연소"
              }
            ],
            "summary": "적이 연소 상태거나 부식 상태일 때 사용할 수 있습니다."
          },
          {
            "character": {
              "id": "laevatain",
              "name": "레바테인"
            },
            "skill": {
              "name": "황혼",
              "type": "궁극기",
              "typeId": "ultimate",
              "index": 3
            },
            "matchedMechanics": [
              {
                "id": "heatInfliction",
                "label": "열기 부착"
              }
            ],
            "summary": "메인 컨트롤 전환 · 지속형 모든 공격이 열기 피해를 주며, 3단계 일반 공격은 열기 부착 상태를 부여합니다. 레바테인의 연계 스킬의 마검을 소환하고 메인 컨트롤 오퍼레이터로 전환합니다."
          },
          {
            "character": {
              "id": "wolfguard",
              "name": "울프가드"
            },
            "skill": {
              "name": "늑대의 분노",
              "type": "궁극기",
              "typeId": "ultimate",
              "index": 3
            },
            "matchedMechanics": [
              {
                "id": "combustion",
                "label": "연소"
              }
            ],
            "summary": "5회에 걸쳐 열기 피해를 주고 강제 연소 상태를 부여합니다."
          }
        ]
      },
      {
        "order": 2,
        "character": {
          "id": "adelia",
          "name": "아델리아"
        },
        "stageIds": [
          "setup"
        ],
        "title": "무상태 대상 포착",
        "detail": "방어 불능과 아츠 부착이 없는 적에게 메인 컨트롤 오퍼레이터가 강력한 일격을 넣어 아델리아의 연계 스킬을 연다.",
        "skill": {
          "name": "화산 분화",
          "type": "연계 스킬",
          "typeId": "linkSkill",
          "index": 2
        },
        "conditions": [
          "메인 컨트롤 오퍼레이터가 방어 불능 혹은 아츠 부착 상태에 처해 있지 않은 적에게 강력한 일격을 준 후 사용할 수 있습니다.",
          "방어 불능·아츠 부착이 없는 적에게 강력한 일격"
        ],
        "timing": "",
        "effects": [
          "화산 구름은 목표를 추적한 뒤 폭발하여 주변의 다른 적에게 절반의 자연 피해를 주고 강제로 7초 동안 부식 상태를 부여합니다."
        ],
        "mechanics": [
          {
            "id": "artsInfliction",
            "label": "아츠 부착"
          },
          {
            "id": "defenseless",
            "label": "방어 불능"
          },
          {
            "id": "powerStrike",
            "label": "강력한 일격"
          },
          {
            "id": "mainControl",
            "label": "메인 컨트롤"
          }
        ],
        "preparationRoutes": []
      },
      {
        "order": 3,
        "character": {
          "id": "laevatain",
          "name": "레바테인"
        },
        "stageIds": [
          "setup",
          "convert"
        ],
        "title": "상태 준비",
        "detail": "열기 부착 또는 연소·부식 상태를 만든다.",
        "skill": {
          "name": "열화",
          "type": "연계 스킬",
          "typeId": "linkSkill",
          "index": 2
        },
        "conditions": [
          "적이 연소 상태거나 부식 상태일 때 사용할 수 있습니다.",
          "모든 연소 상태 혹은 부식 상태의 적의 발밑에서 불꽃이 솟아오르게 만들고 대상에게 열기 피해를 줍니다."
        ],
        "timing": "",
        "effects": [],
        "mechanics": [
          {
            "id": "heatInfliction",
            "label": "열기 부착"
          },
          {
            "id": "combustion",
            "label": "연소"
          },
          {
            "id": "corrosion",
            "label": "부식"
          }
        ],
        "preparationRoutes": [
          {
            "character": {
              "id": "wolfguard",
              "name": "울프가드"
            },
            "skill": {
              "name": "탄흔의 열기",
              "type": "배틀 스킬",
              "typeId": "battleSkill",
              "index": 1
            },
            "matchedMechanics": [
              {
                "id": "heatInfliction",
                "label": "열기 부착"
              },
              {
                "id": "combustion",
                "label": "연소"
              }
            ],
            "summary": "목표를 연속으로 사격하여 소량의 열기 피해를 주고, 마지막 한 발은 열기 부착 상태를 부여합니다."
          },
          {
            "character": {
              "id": "laevatain",
              "name": "레바테인"
            },
            "skill": {
              "name": "불타오르는 화염",
              "type": "배틀 스킬",
              "typeId": "battleSkill",
              "index": 1
            },
            "matchedMechanics": [
              {
                "id": "combustion",
                "label": "연소"
              }
            ],
            "summary": "이미 녹아내린 불꽃 4스택이 쌓였을 경우 마지막에 모든 스택 수치를 소모해 넓은 범위 내의 적에게 추가로 1회 공격하며, 열기 피해를 주고 짧은 강제 연소 상태를 부여합니다."
          },
          {
            "character": {
              "id": "akekuri",
              "name": "아케쿠리"
            },
            "skill": {
              "name": "열정 분출",
              "type": "배틀 스킬",
              "typeId": "battleSkill",
              "index": 1
            },
            "matchedMechanics": [
              {
                "id": "heatInfliction",
                "label": "열기 부착"
              }
            ],
            "summary": "전방으로 검을 휘둘러 열기 피해를 주고 열기 부착 상태를 부여합니다."
          },
          {
            "character": {
              "id": "adelia",
              "name": "아델리아"
            },
            "skill": {
              "name": "질주하는 돌리",
              "type": "배틀 스킬",
              "typeId": "battleSkill",
              "index": 1
            },
            "matchedMechanics": [
              {
                "id": "corrosion",
                "label": "부식"
              }
            ],
            "summary": "목표가 부식 상태라면 부식을 소모하고 대상에게 물리 취약과 아츠 취약 16%를 30초 동안 부여합니다."
          },
          {
            "character": {
              "id": "wolfguard",
              "name": "울프가드"
            },
            "skill": {
              "name": "폭렬 수류탄 · β형",
              "type": "연계 스킬",
              "typeId": "linkSkill",
              "index": 2
            },
            "matchedMechanics": [
              {
                "id": "heatInfliction",
                "label": "열기 부착"
              }
            ],
            "summary": "아츠 부착 상태를 부여한 적이 있을 때 사용할 수 있습니다. 근처 범위 내의 적에게 열기 피해를 주고 열기 부착 상태를 부여합니다."
          },
          {
            "character": {
              "id": "adelia",
              "name": "아델리아"
            },
            "skill": {
              "name": "화산 분화",
              "type": "연계 스킬",
              "typeId": "linkSkill",
              "index": 2
            },
            "matchedMechanics": [
              {
                "id": "corrosion",
                "label": "부식"
              }
            ],
            "summary": "메인 컨트롤 오퍼레이터가 방어 불능 혹은 아츠 부착 상태에 처해 있지 않은 적에게 강력한 일격을 준 후 사용할 수 있습니다. 화산 구름은 목표를 추적한 뒤 폭발하여 주변의 다른 적에게 절반의 자연 피해를 주고 강제로 7초 동안 부식 상태를 부여합니다."
          }
        ]
      },
      {
        "order": 4,
        "character": {
          "id": "akekuri",
          "name": "아케쿠리"
        },
        "stageIds": [
          "setup",
          "trigger",
          "payoff"
        ],
        "title": "불균형 준비",
        "detail": "팀의 공격으로 적을 불균형 상태로 만들거나 강적의 불균형 지점에 도달해 아케쿠리의 연계 스킬 조건을 만든다.",
        "skill": {
          "name": "섬광 돌진",
          "type": "연계 스킬",
          "typeId": "linkSkill",
          "index": 2
        },
        "conditions": [
          "불균형 상태 혹은 불균형 지점에 도달한 적이 있을 때 사용할 수 있습니다.",
          "불균형 상태·불균형 지점 조건"
        ],
        "timing": "",
        "effects": [
          "2번 연속 찌르기를 사용하여 각 공격마다 물리 피해를 주고 스킬 게이지 7.5포인트를 회복합니다."
        ],
        "mechanics": [
          {
            "id": "imbalance",
            "label": "불균형"
          }
        ],
        "preparationRoutes": [
          {
            "character": {
              "id": "laevatain",
              "name": "레바테인"
            },
            "skill": {
              "name": "재",
              "type": "일반 공격",
              "typeId": "generalAttack",
              "index": 0
            },
            "matchedMechanics": [
              {
                "id": "imbalance",
                "label": "불균형"
              }
            ],
            "summary": "처형 공격: 주변에 불균형 상태의 적이 있을 때 일반 공격을 사용하면 해당 적을 처형하여 대량의 열기 피해를 주고 일정량의 스킬 게이지를 회복합니다. 메인 컨트롤 오퍼레이터라면 강력한 일격이 18포인트의 불균형 피해를 줍니다."
          },
          {
            "character": {
              "id": "wolfguard",
              "name": "울프가드"
            },
            "skill": {
              "name": "다중 연사",
              "type": "일반 공격",
              "typeId": "generalAttack",
              "index": 0
            },
            "matchedMechanics": [
              {
                "id": "imbalance",
                "label": "불균형"
              }
            ],
            "summary": "처형 공격: 주변에 불균형 상태의 적이 있을 때, 일반 공격을 사용하면 해당 적을 처형하여 대량의 열기 피해를 주고 일정량의 스킬 게이지를 회복합니다. 메인 컨트롤 오퍼레이터라면 강력한 일격이 18포인트의 불균형 피해를 줍니다."
          },
          {
            "character": {
              "id": "akekuri",
              "name": "아케쿠리"
            },
            "skill": {
              "name": "진취의 검날",
              "type": "일반 공격",
              "typeId": "generalAttack",
              "index": 0
            },
            "matchedMechanics": [
              {
                "id": "imbalance",
                "label": "불균형"
              }
            ],
            "summary": "처형 공격: 주변에 불균형 상태의 적이 있을 때, 일반 공격을 사용하면 해당 적을 처형하여 대량의 물리 피해를 주고 일정량의 스킬 게이지를 회복합니다. 메인 컨트롤 오퍼레이터라면 강력한 일격이 17포인트의 불균형 피해를 줍니다."
          },
          {
            "character": {
              "id": "adelia",
              "name": "아델리아"
            },
            "skill": {
              "name": "바위의 속삭임",
              "type": "일반 공격",
              "typeId": "generalAttack",
              "index": 0
            },
            "matchedMechanics": [
              {
                "id": "imbalance",
                "label": "불균형"
              }
            ],
            "summary": "처형 공격: 주변에 불균형 상태의 적이 있을 때, 일반 공격을 사용하면 해당 적을 처형하여 대량의 자연 피해를 주고 일정량의 스킬 게이지를 회복합니다. 메인 컨트롤 오퍼레이터라면 강력한 일격이 18포인트의 불균형 피해를 줍니다."
          }
        ]
      },
      {
        "order": 5,
        "character": {
          "id": "wolfguard",
          "name": "울프가드"
        },
        "stageIds": [
          "convert"
        ],
        "title": "상태 소모 사격",
        "detail": "울프가드의 배틀 스킬로 연소·감전을 소모해 추가 1회 사격과 대량의 열기 피해를 발생시킨다.",
        "skill": {
          "name": "탄흔의 열기",
          "type": "배틀 스킬",
          "typeId": "battleSkill",
          "index": 1
        },
        "conditions": [],
        "timing": "",
        "effects": [
          "목표를 연속으로 사격하여 소량의 열기 피해를 주고, 마지막 한 발은 열기 부착 상태를 부여합니다.",
          "목표가 연소 또는 감전 상태일 경우 열기 부착 상태를 부여하지 않고, 해당 상태를 소모하여 추가로 1회 사격하며 대량의 열기 피해를 줍니다."
        ],
        "mechanics": [
          {
            "id": "heatDamage",
            "label": "열기 피해"
          },
          {
            "id": "combustion",
            "label": "연소"
          },
          {
            "id": "shock",
            "label": "감전"
          }
        ],
        "preparationRoutes": [
          {
            "character": {
              "id": "laevatain",
              "name": "레바테인"
            },
            "skill": {
              "name": "불타오르는 화염",
              "type": "배틀 스킬",
              "typeId": "battleSkill",
              "index": 1
            },
            "matchedMechanics": [
              {
                "id": "combustion",
                "label": "연소"
              }
            ],
            "summary": "이미 녹아내린 불꽃 4스택이 쌓였을 경우 마지막에 모든 스택 수치를 소모해 넓은 범위 내의 적에게 추가로 1회 공격하며, 열기 피해를 주고 짧은 강제 연소 상태를 부여합니다."
          },
          {
            "character": {
              "id": "laevatain",
              "name": "레바테인"
            },
            "skill": {
              "name": "열화",
              "type": "연계 스킬",
              "typeId": "linkSkill",
              "index": 2
            },
            "matchedMechanics": [
              {
                "id": "combustion",
                "label": "연소"
              }
            ],
            "summary": "적이 연소 상태거나 부식 상태일 때 사용할 수 있습니다."
          },
          {
            "character": {
              "id": "wolfguard",
              "name": "울프가드"
            },
            "skill": {
              "name": "늑대의 분노",
              "type": "궁극기",
              "typeId": "ultimate",
              "index": 3
            },
            "matchedMechanics": [
              {
                "id": "combustion",
                "label": "연소"
              }
            ],
            "summary": "5회에 걸쳐 열기 피해를 주고 강제 연소 상태를 부여합니다."
          }
        ]
      },
      {
        "order": 6,
        "character": {
          "id": "wolfguard",
          "name": "울프가드"
        },
        "stageIds": [
          "setup",
          "trigger",
          "convert",
          "payoff",
          "recycle"
        ],
        "title": "궁극기 재점화",
        "detail": "울프가드의 궁극기로 주변 적에게 5회 열기 피해와 강제 연소를 부여하고, P5에서는 연계 스킬 쿨타임까지 초기화한다.",
        "skill": {
          "name": "늑대의 분노",
          "type": "궁극기",
          "typeId": "ultimate",
          "index": 3
        },
        "conditions": [],
        "timing": "적에게 필요한 부착·이상 상태를 준비하고, 주력 피해를 집중할 수 있을 때 사용합니다.",
        "effects": [
          "5회에 걸쳐 열기 피해를 주고 강제 연소 상태를 부여합니다."
        ],
        "mechanics": [
          {
            "id": "heatDamage",
            "label": "열기 피해"
          },
          {
            "id": "combustion",
            "label": "연소"
          },
          {
            "id": "linkSkill",
            "label": "연계 스킬"
          },
          {
            "id": "ultimate",
            "label": "궁극기"
          }
        ],
        "preparationRoutes": []
      },
      {
        "order": 7,
        "character": {
          "id": "akekuri",
          "name": "아케쿠리"
        },
        "stageIds": [
          "payoff",
          "recycle"
        ],
        "title": "궁극기 대량 회복",
        "detail": "아케쿠리의 궁극기의 신호탄 3발로 스킬 게이지를 총 80포인트 회복하고, 지속 중 연타를 획득한다.",
        "skill": {
          "name": "소대, 집합!",
          "type": "궁극기",
          "typeId": "ultimate",
          "index": 3
        },
        "conditions": [],
        "timing": "적에게 필요한 부착·이상 상태를 준비하고, 주력 피해를 집중할 수 있을 때 사용합니다.",
        "effects": [
          "발사할 때마다 일정량의 스킬 게이지를 회복하며, 3발의 총 회복량은 80포인트입니다."
        ],
        "mechanics": [
          {
            "id": "skillGauge",
            "label": "스킬 게이지"
          },
          {
            "id": "comboHit",
            "label": "연타"
          },
          {
            "id": "ultimate",
            "label": "궁극기"
          }
        ],
        "preparationRoutes": []
      },
      {
        "order": 8,
        "character": {
          "id": "laevatain",
          "name": "레바테인"
        },
        "stageIds": [
          "convert",
          "payoff",
          "recycle"
        ],
        "title": "레바테인의 궁극기 유지",
        "detail": "메인 컨트롤로 전환해 강화 일반 공격을 이어가며 스킬 사용 중 지속시간 감소를 멈춘다.",
        "skill": {
          "name": "황혼",
          "type": "궁극기",
          "typeId": "ultimate",
          "index": 3
        },
        "conditions": [
          "메인 컨트롤 전환 · 지속형"
        ],
        "timing": "적에게 필요한 부착·이상 상태를 준비하고, 주력 피해를 집중할 수 있을 때 사용합니다.",
        "effects": [
          "레바테인의 연계 스킬의 마검을 소환하고 메인 컨트롤 오퍼레이터로 전환합니다.",
          "모든 공격이 열기 피해를 주며, 3단계 일반 공격은 열기 부착 상태를 부여합니다."
        ],
        "mechanics": [
          {
            "id": "mainControl",
            "label": "메인 컨트롤"
          },
          {
            "id": "generalAttack",
            "label": "일반 공격"
          }
        ],
        "preparationRoutes": []
      }
    ],
    "supportFlow": [],
    "basicOperation": [
      {
        "order": 1,
        "title": "울프가드 · 연계 스킬",
        "detail": "연소 또는 감전 상태를 준비하거나, 연계 스킬로 열기 부착을 부여해 스킬 조건을 만든다."
      },
      {
        "order": 2,
        "title": "아델리아 · 연계 스킬",
        "detail": "방어 불능과 아츠 부착이 없는 적에게 메인 컨트롤 오퍼레이터가 강력한 일격을 넣어 아델리아의 연계 스킬을 연다."
      },
      {
        "order": 3,
        "title": "레바테인 · 연계 스킬",
        "detail": "열기 부착 또는 연소·부식 상태를 만든다."
      },
      {
        "order": 4,
        "title": "아케쿠리 · 연계 스킬",
        "detail": "팀의 공격으로 적을 불균형 상태로 만들거나 강적의 불균형 지점에 도달해 아케쿠리의 연계 스킬 조건을 만든다."
      },
      {
        "order": 5,
        "title": "울프가드 · 배틀 스킬",
        "detail": "울프가드의 배틀 스킬로 연소·감전을 소모해 추가 1회 사격과 대량의 열기 피해를 발생시킨다."
      },
      {
        "order": 6,
        "title": "울프가드 · 궁극기",
        "detail": "울프가드의 궁극기로 주변 적에게 5회 열기 피해와 강제 연소를 부여하고, P5에서는 연계 스킬 쿨타임까지 초기화한다."
      },
      {
        "order": 7,
        "title": "아케쿠리 · 궁극기",
        "detail": "아케쿠리의 궁극기의 신호탄 3발로 스킬 게이지를 총 80포인트 회복하고, 지속 중 연타를 획득한다."
      },
      {
        "order": 8,
        "title": "레바테인 · 궁극기",
        "detail": "메인 컨트롤로 전환해 강화 일반 공격을 이어가며 스킬 사용 중 지속시간 감소를 멈춘다."
      }
    ],
    "roles": [
      {
        "character": {
          "id": "laevatain",
          "name": "레바테인"
        },
        "labels": [
          "열기 부착 생성",
          "열기 피해·연소 소모",
          "연소·부식 활용",
          "전투 자원 순환"
        ],
        "relation": "울프가드의 열기 피해 조건과 직접 이어집니다."
      },
      {
        "character": {
          "id": "wolfguard",
          "name": "울프가드"
        },
        "labels": [
          "열기 부착 생성",
          "열기 피해·열기 부착 소모",
          "연소·감전 활용",
          "전투 자원 순환"
        ],
        "relation": "레바테인의 열기 피해 조건과 직접 이어집니다."
      },
      {
        "character": {
          "id": "akekuri",
          "name": "아케쿠리"
        },
        "labels": [
          "열기 부착 생성",
          "전투 자원 순환",
          "메인 컨트롤 후보"
        ],
        "relation": "레바테인의 불균형 조건과 직접 이어집니다."
      },
      {
        "character": {
          "id": "adelia",
          "name": "아델리아"
        },
        "labels": [
          "부식·아츠 취약 소모",
          "부식 활용",
          "아츠 취약·물리 취약 지원",
          "전투 자원 순환"
        ],
        "relation": "레바테인의 불균형 조건과 직접 이어집니다."
      }
    ],
    "weaknesses": [
      {
        "title": "예열·상태 준비",
        "entries": [
          {
            "character": {
              "id": "laevatain",
              "name": "레바테인"
            },
            "axis": "메인 컨트롤 점유",
            "evidence": "강력한 일격·처형·궁극기 전환과 강화 일반 공격이 메인 컨트롤 상태에 연결됩니다.",
            "affected": "재 · 불꽃의 심장 · 황혼",
            "implication": "메인 컨트롤 유지가 제한되거나 교대가 강제되면 핵심 발동 기회가 줄어듭니다."
          },
          {
            "character": {
              "id": "laevatain",
              "name": "레바테인"
            },
            "axis": "4스택 예열",
            "evidence": "불타오르는 화염의 추가 공격은 녹아내린 불꽃 4스택을 이미 보유한 상태에서 사용해야 발동합니다.",
            "affected": "불타오르는 화염 · 열화 · 불꽃의 심장",
            "implication": "중첩 획득 빈도·유지 시간·소모 조건의 변화에 순환 속도가 직접 영향을 받습니다."
          },
          {
            "character": {
              "id": "laevatain",
              "name": "레바테인"
            },
            "axis": "상태 이상 조건",
            "evidence": "열화는 적이 연소 또는 부식 상태일 때만 사용할 수 있고, 불꽃의 심장은 주변 적의 열기 부착을 흡수합니다.",
            "affected": "열화 · 불꽃의 심장",
            "implication": "아츠 부착과 연소·부식의 부여·유지·갱신이 방해되면 연계 스킬과 중첩 수급이 함께 약해집니다."
          },
          {
            "character": {
              "id": "laevatain",
              "name": "레바테인"
            },
            "axis": "열기 피해 편중",
            "evidence": "일반 공격부터 궁극기까지 주요 공격이 열기 피해이며, 저항 무시는 불꽃의 심장 4스택 후 20포인트입니다.",
            "affected": "전투 스킬 전반",
            "implication": "열기 저항이 높은 대상에게 피해 효율이 낮아질 수 있으며, 저항 무시 효과의 가동 여부가 중요합니다."
          },
          {
            "character": {
              "id": "laevatain",
              "name": "레바테인"
            },
            "axis": "대상 수·처치 수 효율",
            "evidence": "열화는 상태 이상 대상마다 공격하고 궁극기 에너지를 획득하며, P5는 처치 수에 따라 황혼을 최대 7초 연장합니다.",
            "affected": "열화 · P5",
            "implication": "적 수가 적거나 처치가 어려운 전투에서는 대상별 에너지 수급과 지속시간 연장의 이득이 감소합니다."
          },
          {
            "character": {
              "id": "wolfguard",
              "name": "울프가드"
            },
            "axis": "연소·감전 소모 의존",
            "evidence": "탄흔의 열기는 목표가 연소 또는 감전 상태일 때만 해당 상태를 소모해 추가 사격과 대량의 열기 피해를 발동합니다.",
            "affected": "탄흔의 열기 · 절제의 원칙",
            "implication": "대상에게 소모할 아츠 이상이 없으면 추가 사격과 스킬 게이지 반환을 함께 얻지 못해 배틀 스킬의 효율이 낮아집니다."
          },
          {
            "character": {
              "id": "wolfguard",
              "name": "울프가드"
            },
            "axis": "파티 상태 공급 의존",
            "evidence": "울프가드가 직접 확정적으로 제공하는 소모 대상은 궁극기의 강제 연소이며, 감전은 별도의 전기 부착 조건이 필요합니다.",
            "affected": "탄흔의 열기 · 늑대의 분노",
            "implication": "궁극기 사이에도 추가 효과를 반복하려면 연소 또는 감전을 안정적으로 공급하는 팀 구성이 유리합니다."
          },
          {
            "character": {
              "id": "wolfguard",
              "name": "울프가드"
            },
            "axis": "스킬 게이지와 쿨타임",
            "evidence": "탄흔의 열기는 스킬 게이지 100포인트를 소모하고, 폭렬 수류탄 · β형은 쿨타임 19초입니다. 스킬 게이지 100포인트의 자연 회복에는 12.5초가 걸립니다.",
            "affected": "탄흔의 열기 · 폭렬 수류탄 · β형",
            "implication": "스킬 게이지 회복 감소, 배틀 스킬 비용 증가, 연계 스킬 쿨타임 증가 방향의 제약에서 상태 소모와 재부착의 순환이 느려질 수 있습니다."
          },
          {
            "character": {
              "id": "wolfguard",
              "name": "울프가드"
            },
            "axis": "상태 소모에 따른 충돌",
            "evidence": "탄흔의 열기는 연소 또는 감전 상태를 소모하며, 그 경우 마지막 탄의 열기 부착을 부여하지 않습니다.",
            "affected": "탄흔의 열기",
            "implication": "다른 오퍼레이터가 유지 중인 연소·감전을 활용해야 하는 조합에서는 울프가드의 소모 시점과 팀의 상태 활용 순서를 맞춰야 합니다."
          },
          {
            "character": {
              "id": "wolfguard",
              "name": "울프가드"
            },
            "axis": "대상 수에 따른 역할 차이",
            "evidence": "탄흔의 열기의 추가 효과는 목표의 상태를 확인하는 단일 대상 중심 구조인 반면, 폭렬 수류탄 · β형과 늑대의 분노는 주변 또는 근처 범위를 공격합니다.",
            "affected": "탄흔의 열기 · 폭렬 수류탄 · β형 · 늑대의 분노",
            "implication": "단일 대상에서는 상태 소모 화력을 집중하기 쉽지만, 다수 대상에서는 각 적에게 소모 가능한 상태를 준비하지 않으면 배틀 스킬의 추가 효과를 넓게 활용하기 어렵습니다."
          },
          {
            "character": {
              "id": "wolfguard",
              "name": "울프가드"
            },
            "axis": "잠재력에 따른 순환 확장",
            "evidence": "P2는 게이지 반환을 추가하고, P3은 불타는 송곳니 유지와 팀 공유를 제공하며, P5는 궁극기 후 연계 스킬 쿨타임을 초기화합니다.",
            "affected": "P2 · P3 · P5",
            "implication": "기본 상태에서도 상태 소모 순환은 가능하지만, 게이지 회수·팀 열기 강화·연계 재사용의 완성도는 관련 잠재력에 크게 좌우됩니다."
          },
          {
            "character": {
              "id": "akekuri",
              "name": "아케쿠리"
            },
            "axis": "불균형 조건 의존",
            "evidence": "섬광 돌진은 불균형 상태이거나 불균형 지점에 도달한 적이 있을 때만 사용할 수 있습니다.",
            "affected": "섬광 돌진 · 승리의 함성",
            "implication": "불균형 누적이 느리거나 불균형 지점이 없는 대상에서는 연계 스킬을 통한 게이지 회복과 재능 효과를 자주 활용하기 어렵습니다."
          },
          {
            "character": {
              "id": "adelia",
              "name": "아델리아"
            },
            "axis": "상반된 연계 조건과 부식 순환",
            "evidence": "화산 분화는 방어 불능과 아츠 부착이 없는 적에게 강력한 일격을 줘야 발동하고, 질주하는 돌리의 추가 효과는 부식 상태를 요구합니다.",
            "affected": "화산 분화 · 질주하는 돌리",
            "implication": "먼저 상태가 없는 목표를 골라 연계로 부식을 만든 뒤 즉시 배틀 스킬로 소모해야 합니다. 다른 파티원이 아츠 부착이나 방어 불능을 먼저 걸면 연계 조건을 놓칠 수 있어 행동 순서 의존도가 높습니다."
          },
          {
            "character": {
              "id": "adelia",
              "name": "아델리아"
            },
            "axis": "부식 소모 의존",
            "evidence": "질주하는 돌리는 부식 상태를 소모해야 물리 취약과 아츠 취약을 부여합니다.",
            "affected": "질주하는 돌리 · 마운틴 서퍼",
            "implication": "부식을 준비하지 못하면 배틀 스킬은 자연 피해만 주고 핵심 지원 효과와 추가 돌진을 얻지 못합니다. 상태 면역·상태 제거·부식 준비 지연 방향의 제약에서 성능이 크게 떨어집니다."
          },
          {
            "character": {
              "id": "adelia",
              "name": "아델리아"
            },
            "axis": "다수 대상 위치 의존",
            "evidence": "마운틴 서퍼는 부식 상태의 다른 적이 근처에 있을 때만 추가 배틀 스킬을 발동합니다.",
            "affected": "마운틴 서퍼",
            "implication": "단일 대상전에서는 재능 2가 발동하지 않으며, 적이 흩어지면 취약 확장이 끊깁니다. 다수전에서도 부식 대상의 거리와 배치에 따라 실제 이득이 달라집니다."
          }
        ]
      },
      {
        "title": "스킬 게이지·궁극기 순환",
        "entries": [
          {
            "character": {
              "id": "laevatain",
              "name": "레바테인"
            },
            "axis": "대상 수·처치 수 효율",
            "evidence": "열화는 상태 이상 대상마다 공격하고 궁극기 에너지를 획득하며, P5는 처치 수에 따라 황혼을 최대 7초 연장합니다.",
            "affected": "열화 · P5",
            "implication": "적 수가 적거나 처치가 어려운 전투에서는 대상별 에너지 수급과 지속시간 연장의 이득이 감소합니다."
          },
          {
            "character": {
              "id": "laevatain",
              "name": "레바테인"
            },
            "axis": "긴 생존 재발동 간격",
            "evidence": "부활의 불씨는 강한 비호와 회복을 제공하지만 120초마다 최대 1회 발동합니다.",
            "affected": "부활의 불씨",
            "implication": "짧은 시간 안에 반복되는 치명적 피해에는 두 번째 대응 수단으로 사용할 수 없습니다."
          },
          {
            "character": {
              "id": "wolfguard",
              "name": "울프가드"
            },
            "axis": "연소·감전 소모 의존",
            "evidence": "탄흔의 열기는 목표가 연소 또는 감전 상태일 때만 해당 상태를 소모해 추가 사격과 대량의 열기 피해를 발동합니다.",
            "affected": "탄흔의 열기 · 절제의 원칙",
            "implication": "대상에게 소모할 아츠 이상이 없으면 추가 사격과 스킬 게이지 반환을 함께 얻지 못해 배틀 스킬의 효율이 낮아집니다."
          },
          {
            "character": {
              "id": "wolfguard",
              "name": "울프가드"
            },
            "axis": "스킬 게이지와 쿨타임",
            "evidence": "탄흔의 열기는 스킬 게이지 100포인트를 소모하고, 폭렬 수류탄 · β형은 쿨타임 19초입니다. 스킬 게이지 100포인트의 자연 회복에는 12.5초가 걸립니다.",
            "affected": "탄흔의 열기 · 폭렬 수류탄 · β형",
            "implication": "스킬 게이지 회복 감소, 배틀 스킬 비용 증가, 연계 스킬 쿨타임 증가 방향의 제약에서 상태 소모와 재부착의 순환이 느려질 수 있습니다."
          },
          {
            "character": {
              "id": "wolfguard",
              "name": "울프가드"
            },
            "axis": "잠재력에 따른 순환 확장",
            "evidence": "P2는 게이지 반환을 추가하고, P3은 불타는 송곳니 유지와 팀 공유를 제공하며, P5는 궁극기 후 연계 스킬 쿨타임을 초기화합니다.",
            "affected": "P2 · P3 · P5",
            "implication": "기본 상태에서도 상태 소모 순환은 가능하지만, 게이지 회수·팀 열기 강화·연계 재사용의 완성도는 관련 잠재력에 크게 좌우됩니다."
          },
          {
            "character": {
              "id": "akekuri",
              "name": "아케쿠리"
            },
            "axis": "불균형 조건 의존",
            "evidence": "섬광 돌진은 불균형 상태이거나 불균형 지점에 도달한 적이 있을 때만 사용할 수 있습니다.",
            "affected": "섬광 돌진 · 승리의 함성",
            "implication": "불균형 누적이 느리거나 불균형 지점이 없는 대상에서는 연계 스킬을 통한 게이지 회복과 재능 효과를 자주 활용하기 어렵습니다."
          },
          {
            "character": {
              "id": "akekuri",
              "name": "아케쿠리"
            },
            "axis": "스킬 게이지 수급 시점",
            "evidence": "열정 분출은 스킬 게이지 100포인트를 소모하지만, 섬광 돌진의 기본 회복량은 2회 합계 15포인트이며 궁극기는 총 80포인트를 회복합니다.",
            "affected": "열정 분출 · 섬광 돌진 · 소대, 집합!",
            "implication": "궁극기를 사용하지 못하는 구간에는 연계 스킬만으로 배틀 스킬 1회분을 빠르게 충당하기 어렵고, 자연 회복과 추가 게이지 수급이 필요합니다."
          },
          {
            "character": {
              "id": "akekuri",
              "name": "아케쿠리"
            },
            "axis": "궁극기 에너지와 쿨타임",
            "evidence": "소대, 집합!은 궁극기 에너지 120이 필요하고 쿨타임은 20초입니다.",
            "affected": "소대, 집합! · 몰입의 시간",
            "implication": "궁극기 에너지 획득 감소나 궁극기 쿨타임 증가 방향의 제약에서는 대량 게이지 회복과 연타 지원의 공백이 길어집니다."
          },
          {
            "character": {
              "id": "akekuri",
              "name": "아케쿠리"
            },
            "axis": "지능 기반 연계 회복",
            "evidence": "승리의 함성은 지능 10포인트마다 섬광 돌진의 스킬 게이지 회복량을 증가시킵니다.",
            "affected": "승리의 함성 · 섬광 돌진",
            "implication": "지능이 낮으면 연계 스킬의 자원 회복 강화 폭이 작아져 아케쿠리의 게이지 지원 성능이 제한됩니다."
          },
          {
            "character": {
              "id": "adelia",
              "name": "아델리아"
            },
            "axis": "잠재력에 따른 지원 격차",
            "evidence": "P1은 취약을 추가 8% 강화하고 P2는 추가 아군 치유, P5는 부식 지속과 연계 회전을 강화합니다.",
            "affected": "P1 · P2 · P5",
            "implication": "기본 단계에서는 취약 수치, 팀 치유 범위, 부식 유지 시간이 제한됩니다. 취약 강화와 다인 회복을 기대하는 운용은 잠재력 의존도가 높습니다."
          }
        ]
      },
      {
        "title": "위치·대상 수",
        "entries": [
          {
            "character": {
              "id": "laevatain",
              "name": "레바테인"
            },
            "axis": "대상 수·처치 수 효율",
            "evidence": "열화는 상태 이상 대상마다 공격하고 궁극기 에너지를 획득하며, P5는 처치 수에 따라 황혼을 최대 7초 연장합니다.",
            "affected": "열화 · P5",
            "implication": "적 수가 적거나 처치가 어려운 전투에서는 대상별 에너지 수급과 지속시간 연장의 이득이 감소합니다."
          },
          {
            "character": {
              "id": "wolfguard",
              "name": "울프가드"
            },
            "axis": "대상 수에 따른 역할 차이",
            "evidence": "탄흔의 열기의 추가 효과는 목표의 상태를 확인하는 단일 대상 중심 구조인 반면, 폭렬 수류탄 · β형과 늑대의 분노는 주변 또는 근처 범위를 공격합니다.",
            "affected": "탄흔의 열기 · 폭렬 수류탄 · β형 · 늑대의 분노",
            "implication": "단일 대상에서는 상태 소모 화력을 집중하기 쉽지만, 다수 대상에서는 각 적에게 소모 가능한 상태를 준비하지 않으면 배틀 스킬의 추가 효과를 넓게 활용하기 어렵습니다."
          },
          {
            "character": {
              "id": "adelia",
              "name": "아델리아"
            },
            "axis": "부식 소모 의존",
            "evidence": "질주하는 돌리는 부식 상태를 소모해야 물리 취약과 아츠 취약을 부여합니다.",
            "affected": "질주하는 돌리 · 마운틴 서퍼",
            "implication": "부식을 준비하지 못하면 배틀 스킬은 자연 피해만 주고 핵심 지원 효과와 추가 돌진을 얻지 못합니다. 상태 면역·상태 제거·부식 준비 지연 방향의 제약에서 성능이 크게 떨어집니다."
          },
          {
            "character": {
              "id": "adelia",
              "name": "아델리아"
            },
            "axis": "다수 대상 위치 의존",
            "evidence": "마운틴 서퍼는 부식 상태의 다른 적이 근처에 있을 때만 추가 배틀 스킬을 발동합니다.",
            "affected": "마운틴 서퍼",
            "implication": "단일 대상전에서는 재능 2가 발동하지 않으며, 적이 흩어지면 취약 확장이 끊깁니다. 다수전에서도 부식 대상의 거리와 배치에 따라 실제 이득이 달라집니다."
          },
          {
            "character": {
              "id": "adelia",
              "name": "아델리아"
            },
            "axis": "그림자 접촉형 치유",
            "evidence": "친구의 그림자는 메인 컨트롤 오퍼레이터가 지면의 그림자와 접촉해야 치유합니다.",
            "affected": "친구의 그림자",
            "implication": "치유를 받으려면 메인 컨트롤의 이동 경로를 그림자 위치에 맞춰야 합니다. 그림자는 10초만 유지되고 궁극기 생성은 10% 확률이므로 급한 피해 대응과 원거리 전투에서 안정성이 낮습니다."
          },
          {
            "character": {
              "id": "adelia",
              "name": "아델리아"
            },
            "axis": "지속 시전과 무작위 궁극기",
            "evidence": "복슬복슬 파티는 이동 가능한 지속 시전이며 분신을 무작위로 사방에 던집니다.",
            "affected": "복슬복슬 파티",
            "implication": "궁극기 동안 다른 행동이 제한되고 분신의 분포에 따라 단일 대상 명중과 그림자 생성 위치가 흔들릴 수 있습니다. 메인 컨트롤 점유와 목표 배치 변화에 영향을 받습니다."
          },
          {
            "character": {
              "id": "adelia",
              "name": "아델리아"
            },
            "axis": "잠재력에 따른 지원 격차",
            "evidence": "P1은 취약을 추가 8% 강화하고 P2는 추가 아군 치유, P5는 부식 지속과 연계 회전을 강화합니다.",
            "affected": "P1 · P2 · P5",
            "implication": "기본 단계에서는 취약 수치, 팀 치유 범위, 부식 유지 시간이 제한됩니다. 취약 강화와 다인 회복을 기대하는 운용은 잠재력 의존도가 높습니다."
          }
        ]
      },
      {
        "title": "잠재력 의존",
        "entries": [
          {
            "character": {
              "id": "laevatain",
              "name": "레바테인"
            },
            "axis": "대상 수·처치 수 효율",
            "evidence": "열화는 상태 이상 대상마다 공격하고 궁극기 에너지를 획득하며, P5는 처치 수에 따라 황혼을 최대 7초 연장합니다.",
            "affected": "열화 · P5",
            "implication": "적 수가 적거나 처치가 어려운 전투에서는 대상별 에너지 수급과 지속시간 연장의 이득이 감소합니다."
          },
          {
            "character": {
              "id": "wolfguard",
              "name": "울프가드"
            },
            "axis": "잠재력에 따른 순환 확장",
            "evidence": "P2는 게이지 반환을 추가하고, P3은 불타는 송곳니 유지와 팀 공유를 제공하며, P5는 궁극기 후 연계 스킬 쿨타임을 초기화합니다.",
            "affected": "P2 · P3 · P5",
            "implication": "기본 상태에서도 상태 소모 순환은 가능하지만, 게이지 회수·팀 열기 강화·연계 재사용의 완성도는 관련 잠재력에 크게 좌우됩니다."
          },
          {
            "character": {
              "id": "akekuri",
              "name": "아케쿠리"
            },
            "axis": "궁극기 지속 구간 의존",
            "evidence": "몰입의 시간의 연타와 P3의 팀 전체 공격력 증가는 소대, 집합!이 지속되는 동안에만 적용되며, P5가 있어야 연타가 종료 후 5초 더 지속됩니다.",
            "affected": "몰입의 시간 · P3 · P5",
            "implication": "궁극기 지속 구간에 팀의 배틀 스킬과 궁극기를 맞추지 못하면 지원 효과를 충분히 활용하기 어렵고, 종료 후 연타 유지에는 P5가 필요합니다."
          },
          {
            "character": {
              "id": "adelia",
              "name": "아델리아"
            },
            "axis": "잠재력에 따른 지원 격차",
            "evidence": "P1은 취약을 추가 8% 강화하고 P2는 추가 아군 치유, P5는 부식 지속과 연계 회전을 강화합니다.",
            "affected": "P1 · P2 · P5",
            "implication": "기본 단계에서는 취약 수치, 팀 치유 범위, 부식 유지 시간이 제한됩니다. 취약 강화와 다인 회복을 기대하는 운용은 잠재력 의존도가 높습니다."
          }
        ]
      },
      {
        "title": "메인 컨트롤·조작 집중",
        "entries": [
          {
            "character": {
              "id": "laevatain",
              "name": "레바테인"
            },
            "axis": "메인 컨트롤 점유",
            "evidence": "강력한 일격·처형·궁극기 전환과 강화 일반 공격이 메인 컨트롤 상태에 연결됩니다.",
            "affected": "재 · 불꽃의 심장 · 황혼",
            "implication": "메인 컨트롤 유지가 제한되거나 교대가 강제되면 핵심 발동 기회가 줄어듭니다."
          },
          {
            "character": {
              "id": "adelia",
              "name": "아델리아"
            },
            "axis": "그림자 접촉형 치유",
            "evidence": "친구의 그림자는 메인 컨트롤 오퍼레이터가 지면의 그림자와 접촉해야 치유합니다.",
            "affected": "친구의 그림자",
            "implication": "치유를 받으려면 메인 컨트롤의 이동 경로를 그림자 위치에 맞춰야 합니다. 그림자는 10초만 유지되고 궁극기 생성은 10% 확률이므로 급한 피해 대응과 원거리 전투에서 안정성이 낮습니다."
          },
          {
            "character": {
              "id": "adelia",
              "name": "아델리아"
            },
            "axis": "지속 시전과 무작위 궁극기",
            "evidence": "복슬복슬 파티는 이동 가능한 지속 시전이며 분신을 무작위로 사방에 던집니다.",
            "affected": "복슬복슬 파티",
            "implication": "궁극기 동안 다른 행동이 제한되고 분신의 분포에 따라 단일 대상 명중과 그림자 생성 위치가 흔들릴 수 있습니다. 메인 컨트롤 점유와 목표 배치 변화에 영향을 받습니다."
          }
        ]
      }
    ],
    "discoveries": [
      {
        "character": {
          "id": "laevatain",
          "name": "레바테인"
        },
        "title": "연소를 유지한 연계 스킬 화력 축",
        "description": "주력 순환은 궁극기 이후 강화 일반 공격에 무게가 실리지만, 연소 또는 부식 상태의 적에게 연계 스킬을 발동해 별도의 열기 피해와 궁극기 에너지 수급을 만들 수 있습니다.",
        "opportunity": "일반 공격이나 궁극기의 비중을 낮추는 전투 설계에서는 연소를 곧바로 흡수하지 않고 유지하며 연계 스킬을 반복하는 운용이 새롭게 부각될 수 있습니다.",
        "skillName": "연계 스킬"
      },
      {
        "character": {
          "id": "wolfguard",
          "name": "울프가드"
        },
        "title": "연계 스킬 재평가",
        "description": "현재 순환은 연계 스킬 비중이 높지만, 연계 스킬은 아츠 부착 조건을 이용하는 별도 기능을 갖고 있습니다.",
        "opportunity": "주력 피해원을 약화시키되 이 효과까지 함께 막지 않는 설계라면 보조 루트가 새로운 선택지로 떠오를 수 있습니다.",
        "skillName": "연계 스킬"
      },
      {
        "character": {
          "id": "akekuri",
          "name": "아케쿠리"
        },
        "title": "연계 스킬 재평가",
        "description": "현재 순환은 연계 스킬 비중이 높지만, 연계 스킬은 불균형 조건을 이용하는 별도 기능을 갖고 있습니다.",
        "opportunity": "주력 피해원을 약화시키되 이 효과까지 함께 막지 않는 설계라면 보조 루트가 새로운 선택지로 떠오를 수 있습니다.",
        "skillName": "연계 스킬"
      },
      {
        "character": {
          "id": "adelia",
          "name": "아델리아"
        },
        "title": "연계 스킬 재평가",
        "description": "현재 순환은 배틀 스킬 비중이 높지만, 연계 스킬은 아츠 부착·방어 불능 조건을 이용하는 별도 기능을 갖고 있습니다.",
        "opportunity": "주력 피해원을 약화시키되 이 효과까지 함께 막지 않는 설계라면 보조 루트가 새로운 선택지로 떠오를 수 있습니다.",
        "skillName": "연계 스킬"
      }
    ],
    "designHints": [
      {
        "id": "normal",
        "title": "일반 공격 의존도",
        "pressure": "일반 공격 피해 비중을 낮추는 방향",
        "impact": "강화 상태나 메인 컨트롤 중 일반 공격에 몰린 화력 구간이 짧아집니다.",
        "opportunity": "레바테인의 연계 스킬, 울프가드의 연계 스킬처럼 연계·배틀 스킬 중심의 보조 축이 상대적으로 중요해질 수 있습니다.",
        "caution": "일반 공격과 강력한 일격을 동시에 완전히 막으면 스킬 게이지 회복과 불균형 순환까지 함께 끊길 수 있습니다.",
        "characters": [
          {
            "id": "laevatain",
            "name": "레바테인"
          }
        ]
      },
      {
        "id": "ultimate",
        "title": "궁극기 반복 의존도",
        "pressure": "궁극기 반복 사용의 효율이 점차 낮아지는 방향",
        "impact": "궁극기를 중심으로 한 강화 구간과 마무리 빈도가 줄어듭니다.",
        "opportunity": "궁극기 에너지를 다른 가치로 돌리거나 배틀·연계 스킬을 주력화하는 운용을 찾게 됩니다.",
        "caution": "첫 궁극기까지 무력화하면 준비 과정의 의미도 사라질 수 있으므로 반복 효율을 조절하는 편이 발견을 만들기 쉽습니다.",
        "characters": [
          {
            "id": "laevatain",
            "name": "레바테인"
          },
          {
            "id": "wolfguard",
            "name": "울프가드"
          },
          {
            "id": "akekuri",
            "name": "아케쿠리"
          },
          {
            "id": "adelia",
            "name": "아델리아"
          }
        ]
      },
      {
        "id": "battle",
        "title": "배틀 스킬 피해 비중",
        "pressure": "배틀 스킬의 직접 피해를 줄이되 연계 스킬 순환은 열어주는 방향",
        "impact": "스킬 게이지를 사용해 즉시 내는 화력이 줄어듭니다.",
        "opportunity": "배틀 스킬을 상태 생성·변환 용도로만 쓰고, 연계 스킬이나 궁극기 외 추가 피해를 주력으로 삼는 구조가 떠오를 수 있습니다.",
        "caution": "배틀 스킬의 상태 부여까지 막으면 후속 연계 조건 자체가 사라질 수 있습니다.",
        "characters": [
          {
            "id": "laevatain",
            "name": "레바테인"
          },
          {
            "id": "wolfguard",
            "name": "울프가드"
          },
          {
            "id": "akekuri",
            "name": "아케쿠리"
          },
          {
            "id": "adelia",
            "name": "아델리아"
          }
        ]
      },
      {
        "id": "link",
        "title": "연계 스킬 빈도",
        "pressure": "연계 스킬 사용 빈도와 쿨타임을 크게 흔드는 방향",
        "impact": "조건을 자주 열 수 있는 파티일수록 순환 속도가 크게 달라집니다.",
        "opportunity": "연계 횟수가 늘어날 때 생기는 자원 수급과 보조 피해, 반대로 연계에 대가가 생길 때의 대체 순서를 비교할 수 있습니다.",
        "caution": "연계 조건과 쿨타임을 동시에 막으면 조합의 상호작용이 사라질 수 있습니다.",
        "characters": [
          {
            "id": "laevatain",
            "name": "레바테인"
          },
          {
            "id": "wolfguard",
            "name": "울프가드"
          },
          {
            "id": "akekuri",
            "name": "아케쿠리"
          },
          {
            "id": "adelia",
            "name": "아델리아"
          }
        ]
      },
      {
        "id": "stack",
        "title": "부착·방어 불능 축적 속도",
        "pressure": "같은 대상에게 스택을 연속으로 쌓는 속도를 제한하는 방향",
        "impact": "최대 스택을 전제로 하는 동결·강타·갑옷 파괴·취약 발동 시점이 늦어집니다.",
        "opportunity": "낮은 스택에서 바로 작동하는 스킬, 강제 이상, 직접 부여 효과의 가치가 올라갈 수 있습니다.",
        "caution": "부착 자체를 금지하면 대체 운용이 아니라 파티의 핵심 문법을 삭제하게 됩니다.",
        "characters": [
          {
            "id": "laevatain",
            "name": "레바테인"
          },
          {
            "id": "wolfguard",
            "name": "울프가드"
          },
          {
            "id": "akekuri",
            "name": "아케쿠리"
          },
          {
            "id": "adelia",
            "name": "아델리아"
          }
        ]
      }
    ],
    "mechanicProfile": {
      "mechanicIds": [
        "combustion",
        "ultimate",
        "heatInfliction",
        "skillGauge",
        "heatDamage",
        "corrosion",
        "artsInfliction",
        "shock",
        "battleSkill",
        "mainControl",
        "linkSkill",
        "artsAbnormality",
        "imbalance",
        "artsVulnerability",
        "physicalVulnerability",
        "physicalDamage",
        "natureDamage",
        "ultimateEnergy",
        "healing",
        "comboHit",
        "defenseless",
        "powerStrike",
        "skillGaugeReturn",
        "generalAttack"
      ],
      "mechanicScores": {
        "combustion": 19,
        "ultimate": 15,
        "heatInfliction": 14.5,
        "skillGauge": 13.5,
        "heatDamage": 13,
        "corrosion": 11.5,
        "artsInfliction": 9,
        "shock": 9,
        "battleSkill": 9,
        "mainControl": 8.5,
        "linkSkill": 8.5,
        "artsAbnormality": 6.5,
        "imbalance": 6,
        "artsVulnerability": 5,
        "physicalVulnerability": 5,
        "physicalDamage": 4.5,
        "natureDamage": 4.5,
        "ultimateEnergy": 4.5,
        "healing": 4.5,
        "comboHit": 4.5,
        "defenseless": 3,
        "powerStrike": 3,
        "skillGaugeReturn": 3,
        "generalAttack": 3,
        "electricDamage": 0,
        "frostDamage": 0,
        "artsDamage": 0,
        "electricInfliction": 0,
        "frostInfliction": 0,
        "natureInfliction": 0,
        "freeze": 0,
        "launch": 0,
        "knockdown": 0,
        "smash": 0,
        "armorBreak": 0,
        "execution": 0,
        "heatVulnerability": 0,
        "electricVulnerability": 0,
        "frostVulnerability": 0,
        "natureVulnerability": 0,
        "artsAmplification": 0,
        "physicalAmplification": 0,
        "heatAmplification": 0,
        "electricAmplification": 0,
        "frostAmplification": 0,
        "natureAmplification": 0,
        "protection": 0,
        "fortification": 0,
        "weakness": 0,
        "cleanse": 0,
        "slow": 0,
        "haste": 0,
        "originiumCrystal": 0
      },
      "dominantAction": "linkSkill",
      "actionTotals": {
        "generalAttack": 6,
        "battleSkill": 26,
        "linkSkill": 29,
        "ultimate": 24
      },
      "hintIds": [
        "normal",
        "ultimate",
        "battle",
        "link",
        "stack"
      ],
      "hintTitles": [
        "일반 공격 의존도",
        "궁극기 반복 의존도",
        "배틀 스킬 피해 비중",
        "연계 스킬 빈도",
        "부착·방어 불능 축적 속도"
      ],
      "weaknessAxes": [
        "메인 컨트롤 점유",
        "4스택 예열",
        "상태 이상 조건",
        "열기 피해 편중",
        "대상 수·처치 수 효율",
        "연소·감전 소모 의존",
        "파티 상태 공급 의존",
        "스킬 게이지와 쿨타임",
        "상태 소모에 따른 충돌",
        "대상 수에 따른 역할 차이",
        "잠재력에 따른 순환 확장",
        "불균형 조건 의존",
        "상반된 연계 조건과 부식 순환",
        "부식 소모 의존",
        "다수 대상 위치 의존",
        "대상 수·처치 수 효율",
        "긴 생존 재발동 간격",
        "연소·감전 소모 의존",
        "스킬 게이지와 쿨타임",
        "잠재력에 따른 순환 확장",
        "불균형 조건 의존",
        "스킬 게이지 수급 시점",
        "궁극기 에너지와 쿨타임",
        "지능 기반 연계 회복",
        "잠재력에 따른 지원 격차",
        "대상 수·처치 수 효율",
        "대상 수에 따른 역할 차이",
        "부식 소모 의존",
        "다수 대상 위치 의존",
        "그림자 접촉형 치유",
        "지속 시전과 무작위 궁극기",
        "잠재력에 따른 지원 격차",
        "대상 수·처치 수 효율",
        "잠재력에 따른 순환 확장",
        "궁극기 지속 구간 의존",
        "잠재력에 따른 지원 격차",
        "메인 컨트롤 점유",
        "그림자 접촉형 치유",
        "지속 시전과 무작위 궁극기"
      ],
      "dependencyLabels": [
        "연소",
        "열기 부착",
        "스킬 게이지",
        "부식",
        "연계 스킬"
      ]
    }
  },
  {
    "schemaVersion": 1,
    "id": "party-jangbangyi-perlica-arclight-antal",
    "exportedAt": "2026-07-22T15:44:15.456Z",
    "title": "장방이 · 펠리카 · 아크라이트 · 안탈 파티 분석",
    "party": [
      {
        "id": "jangbangyi",
        "name": "장방이",
        "order": 1
      },
      {
        "id": "perlica",
        "name": "펠리카",
        "order": 2
      },
      {
        "id": "arclight",
        "name": "아크라이트",
        "order": 3
      },
      {
        "id": "antal",
        "name": "안탈",
        "order": 4
      }
    ],
    "summary": {
      "title": "파티 전투 구조 분석",
      "sentence": "전기 부착을 준비해 감전 조건으로 전환하고, 배틀 스킬·연계 스킬에 화력을 모으는 파티입니다.",
      "dominantAction": "battleSkill",
      "actionTotals": {
        "generalAttack": 6,
        "battleSkill": 29,
        "linkSkill": 24,
        "ultimate": 22
      },
      "dependencies": [
        {
          "id": "shock",
          "label": "감전",
          "color": "electric",
          "level": "매우 높음",
          "score": 37.5
        },
        {
          "id": "electricInfliction",
          "label": "전기 부착",
          "color": "electric",
          "level": "매우 높음",
          "score": 18.5
        },
        {
          "id": "artsInfliction",
          "label": "아츠 부착",
          "color": "cyan",
          "level": "매우 높음",
          "score": 11.5
        },
        {
          "id": "ultimateEnergy",
          "label": "궁극기 에너지",
          "color": "orange",
          "level": "매우 높음",
          "score": 10.5
        },
        {
          "id": "battleSkill",
          "label": "배틀 스킬",
          "color": "blue",
          "level": "주력 행동",
          "score": 29
        }
      ]
    },
    "diagram": {
      "nodes": [
        {
          "order": 1,
          "character": {
            "id": "jangbangyi",
            "name": "장방이"
          },
          "skill": {
            "name": "변화의 숨결",
            "type": "연계 스킬",
            "typeId": "linkSkill",
            "index": 2
          },
          "title": "전기 부착 준비"
        },
        {
          "order": 2,
          "character": {
            "id": "arclight",
            "name": "아크라이트"
          },
          "skill": {
            "name": "질풍 섬광",
            "type": "배틀 스킬",
            "typeId": "battleSkill",
            "index": 1
          },
          "title": "아크라이트의 배틀 스킬 소모"
        },
        {
          "order": 3,
          "character": {
            "id": "antal",
            "name": "안탈"
          },
          "skill": {
            "name": "자기 폭풍 실험장",
            "type": "연계 스킬",
            "typeId": "linkSkill",
            "index": 2
          },
          "title": "상태 효과 준비"
        },
        {
          "order": 4,
          "character": {
            "id": "arclight",
            "name": "아크라이트"
          },
          "skill": {
            "name": "천둥의 울림",
            "type": "연계 스킬",
            "typeId": "linkSkill",
            "index": 2
          },
          "title": "아크라이트의 연계 스킬 연결"
        },
        {
          "order": 5,
          "character": {
            "id": "antal",
            "name": "안탈"
          },
          "skill": {
            "name": "오버클록 타임",
            "type": "궁극기",
            "typeId": "ultimate",
            "index": 3
          },
          "title": "팀 증폭 개시"
        },
        {
          "order": 6,
          "character": {
            "id": "arclight",
            "name": "아크라이트"
          },
          "skill": {
            "name": "천둥번개",
            "type": "궁극기",
            "typeId": "ultimate",
            "index": 3
          },
          "title": "감전 준비"
        },
        {
          "order": 7,
          "character": {
            "id": "perlica",
            "name": "펠리카"
          },
          "skill": {
            "name": "프로토콜ε · 70.41κ",
            "type": "궁극기",
            "typeId": "ultimate",
            "index": 3
          },
          "title": "저비용 궁극기 마무리"
        },
        {
          "order": 8,
          "character": {
            "id": "jangbangyi",
            "name": "장방이"
          },
          "skill": {
            "name": "심판의 폭풍",
            "type": "궁극기",
            "typeId": "ultimate",
            "index": 3
          },
          "title": "주력 화력 집중"
        }
      ],
      "connections": [
        {
          "fromOrder": 1,
          "toOrder": 2,
          "label": "다음 조건 연결",
          "preparationRoutes": []
        },
        {
          "fromOrder": 2,
          "toOrder": 3,
          "label": "스킬 게이지 재투자",
          "preparationRoutes": [
            {
              "character": {
                "id": "perlica",
                "name": "펠리카"
              },
              "skill": {
                "name": "프로토콜ω · 뇌격",
                "type": "배틀 스킬",
                "typeId": "battleSkill",
                "index": 1
              },
              "matchedMechanics": [
                {
                  "id": "artsInfliction",
                  "label": "아츠 부착"
                }
              ],
              "summary": "하늘에서 전기 에너지를 떨어뜨려 좁은 범위 내의 적에게 전기 피해를 주고 전기 부착 상태를 부여합니다."
            },
            {
              "character": {
                "id": "jangbangyi",
                "name": "장방이"
              },
              "skill": {
                "name": "변화의 숨결",
                "type": "연계 스킬",
                "typeId": "linkSkill",
                "index": 2
              },
              "matchedMechanics": [
                {
                  "id": "artsInfliction",
                  "label": "아츠 부착"
                }
              ],
              "summary": "메인 컨트롤 오퍼레이터의 강력한 일격 또는 처형으로 전기 부착 상태의 적을 명중한 후 사용할 수 있습니다."
            },
            {
              "character": {
                "id": "jangbangyi",
                "name": "장방이"
              },
              "skill": {
                "name": "심판의 폭풍",
                "type": "궁극기",
                "typeId": "ultimate",
                "index": 3
              },
              "matchedMechanics": [
                {
                  "id": "artsInfliction",
                  "label": "아츠 부착"
                }
              ],
              "summary": "배틀 스킬 장방이의 배틀 스킬의 피해 배율과 공격 범위가 증가하며, 마지막 펠리카의 배틀 스킬이 적을 명중할 때 전기 부착을 부여합니다."
            },
            {
              "character": {
                "id": "arclight",
                "name": "아크라이트"
              },
              "skill": {
                "name": "천둥번개",
                "type": "궁극기",
                "typeId": "ultimate",
                "index": 3
              },
              "matchedMechanics": [
                {
                  "id": "artsInfliction",
                  "label": "아츠 부착"
                }
              ],
              "summary": "전기 아크로 자신을 둘러싼 다음 전방 일정 거리를 돌진하며 경로상의 적에게 전기 피해를 주고 전기 부착 상태를 부여합니다."
            }
          ]
        },
        {
          "fromOrder": 3,
          "toOrder": 4,
          "label": "다음 조건 연결",
          "preparationRoutes": [
            {
              "character": {
                "id": "jangbangyi",
                "name": "장방이"
              },
              "skill": {
                "name": "뇌정의 부름",
                "type": "배틀 스킬",
                "typeId": "battleSkill",
                "index": 1
              },
              "matchedMechanics": [
                {
                  "id": "shock",
                  "label": "감전"
                }
              ],
              "summary": "목표의 감전 상태를 소모하여 이번 배틀 스킬의 피해 배율을 증가시키고, 소모한 감전 상태의 이상 레벨 +1자루의 청뢰검을 생성합니다."
            },
            {
              "character": {
                "id": "arclight",
                "name": "아크라이트"
              },
              "skill": {
                "name": "질풍 섬광",
                "type": "배틀 스킬",
                "typeId": "battleSkill",
                "index": 1
              },
              "matchedMechanics": [
                {
                  "id": "shock",
                  "label": "감전"
                }
              ],
              "summary": "적이 감전 상태일 경우 감전을 소모하여 추가로 1회 공격하고 전기 피해를 주며 스킬 게이지 35포인트를 회복합니다."
            },
            {
              "character": {
                "id": "jangbangyi",
                "name": "장방이"
              },
              "skill": {
                "name": "변화의 숨결",
                "type": "연계 스킬",
                "typeId": "linkSkill",
                "index": 2
              },
              "matchedMechanics": [
                {
                  "id": "shock",
                  "label": "감전"
                }
              ],
              "summary": "메인 컨트롤 오퍼레이터의 강력한 일격 또는 처형으로 전기 부착 상태의 적을 명중한 후 사용할 수 있습니다. 전기 부착 상태의 적을 명중하면 그 전기 부착을 소모하고 강제로 감전 상태를 부여합니다."
            },
            {
              "character": {
                "id": "perlica",
                "name": "펠리카"
              },
              "skill": {
                "name": "실시간 프로토콜 · 연쇄 섬광",
                "type": "연계 스킬",
                "typeId": "linkSkill",
                "index": 2
              },
              "matchedMechanics": [
                {
                  "id": "shock",
                  "label": "감전"
                }
              ],
              "summary": "메인 컨트롤 오퍼레이터가 적에게 강력한 일격 피해를 준 다음 사용할 수 있습니다. 누적된 전기 에너지를 방출해 목표를 강타하며 전기 피해를 주고, 5초 동안 짧은 강제 감전 상태를 부여합니다."
            },
            {
              "character": {
                "id": "jangbangyi",
                "name": "장방이"
              },
              "skill": {
                "name": "심판의 폭풍",
                "type": "궁극기",
                "typeId": "ultimate",
                "index": 3
              },
              "matchedMechanics": [
                {
                  "id": "shock",
                  "label": "감전"
                }
              ],
              "summary": "목표가 존재하면 감전 여부와 무관하게 청뢰검 3자루를 생성합니다. 배틀 스킬 장방이의 배틀 스킬의 피해 배율과 공격 범위가 증가하며, 마지막 펠리카의 배틀 스킬이 적을 명중할 때 전기 부착을 부여합니다."
            },
            {
              "character": {
                "id": "arclight",
                "name": "아크라이트"
              },
              "skill": {
                "name": "천둥번개",
                "type": "궁극기",
                "typeId": "ultimate",
                "index": 3
              },
              "matchedMechanics": [
                {
                  "id": "shock",
                  "label": "감전"
                }
              ],
              "summary": "적이 전기 부착 상태일 경우 전기 부착을 소모하여 감전 상태를 부여합니다. 전기 아크로 자신을 둘러싼 다음 전방 일정 거리를 돌진하며 경로상의 적에게 전기 피해를 주고 전기 부착 상태를 부여합니다."
            }
          ]
        },
        {
          "fromOrder": 4,
          "toOrder": 5,
          "label": "다음 조건 연결",
          "preparationRoutes": []
        },
        {
          "fromOrder": 5,
          "toOrder": 6,
          "label": "다음 조건 연결",
          "preparationRoutes": [
            {
              "character": {
                "id": "jangbangyi",
                "name": "장방이"
              },
              "skill": {
                "name": "변화의 숨결",
                "type": "연계 스킬",
                "typeId": "linkSkill",
                "index": 2
              },
              "matchedMechanics": [
                {
                  "id": "electricInfliction",
                  "label": "전기 부착"
                },
                {
                  "id": "shock",
                  "label": "감전"
                }
              ],
              "summary": "메인 컨트롤 오퍼레이터의 강력한 일격 또는 처형으로 전기 부착 상태의 적을 명중한 후 사용할 수 있습니다. 전기 부착 상태의 적을 명중하면 그 전기 부착을 소모하고 강제로 감전 상태를 부여합니다."
            },
            {
              "character": {
                "id": "jangbangyi",
                "name": "장방이"
              },
              "skill": {
                "name": "심판의 폭풍",
                "type": "궁극기",
                "typeId": "ultimate",
                "index": 3
              },
              "matchedMechanics": [
                {
                  "id": "electricInfliction",
                  "label": "전기 부착"
                },
                {
                  "id": "shock",
                  "label": "감전"
                }
              ],
              "summary": "배틀 스킬 장방이의 배틀 스킬의 피해 배율과 공격 범위가 증가하며, 마지막 펠리카의 배틀 스킬이 적을 명중할 때 전기 부착을 부여합니다. 배틀 스킬 장방이의 배틀 스킬의 피해 배율과 공격 범위가 증가하며, 마지막 펠리카의 배틀 스킬이 적을 명중할 때 전기 부착을 부여합니다."
            },
            {
              "character": {
                "id": "jangbangyi",
                "name": "장방이"
              },
              "skill": {
                "name": "뇌정의 부름",
                "type": "배틀 스킬",
                "typeId": "battleSkill",
                "index": 1
              },
              "matchedMechanics": [
                {
                  "id": "shock",
                  "label": "감전"
                }
              ],
              "summary": "목표의 감전 상태를 소모하여 이번 배틀 스킬의 피해 배율을 증가시키고, 소모한 감전 상태의 이상 레벨 +1자루의 청뢰검을 생성합니다."
            },
            {
              "character": {
                "id": "perlica",
                "name": "펠리카"
              },
              "skill": {
                "name": "프로토콜ω · 뇌격",
                "type": "배틀 스킬",
                "typeId": "battleSkill",
                "index": 1
              },
              "matchedMechanics": [
                {
                  "id": "electricInfliction",
                  "label": "전기 부착"
                }
              ],
              "summary": "하늘에서 전기 에너지를 떨어뜨려 좁은 범위 내의 적에게 전기 피해를 주고 전기 부착 상태를 부여합니다."
            },
            {
              "character": {
                "id": "arclight",
                "name": "아크라이트"
              },
              "skill": {
                "name": "질풍 섬광",
                "type": "배틀 스킬",
                "typeId": "battleSkill",
                "index": 1
              },
              "matchedMechanics": [
                {
                  "id": "shock",
                  "label": "감전"
                }
              ],
              "summary": "적이 감전 상태일 경우 감전을 소모하여 추가로 1회 공격하고 전기 피해를 주며 스킬 게이지 35포인트를 회복합니다."
            },
            {
              "character": {
                "id": "perlica",
                "name": "펠리카"
              },
              "skill": {
                "name": "실시간 프로토콜 · 연쇄 섬광",
                "type": "연계 스킬",
                "typeId": "linkSkill",
                "index": 2
              },
              "matchedMechanics": [
                {
                  "id": "shock",
                  "label": "감전"
                }
              ],
              "summary": "메인 컨트롤 오퍼레이터가 적에게 강력한 일격 피해를 준 다음 사용할 수 있습니다. 누적된 전기 에너지를 방출해 목표를 강타하며 전기 피해를 주고, 5초 동안 짧은 강제 감전 상태를 부여합니다."
            }
          ]
        },
        {
          "fromOrder": 6,
          "toOrder": 7,
          "label": "다음 조건 연결",
          "preparationRoutes": []
        },
        {
          "fromOrder": 7,
          "toOrder": 8,
          "label": "궁극기 준비",
          "preparationRoutes": [
            {
              "character": {
                "id": "jangbangyi",
                "name": "장방이"
              },
              "skill": {
                "name": "뇌정의 부름",
                "type": "배틀 스킬",
                "typeId": "battleSkill",
                "index": 1
              },
              "matchedMechanics": [
                {
                  "id": "shock",
                  "label": "감전"
                }
              ],
              "summary": "목표의 감전 상태를 소모하여 이번 배틀 스킬의 피해 배율을 증가시키고, 소모한 감전 상태의 이상 레벨 +1자루의 청뢰검을 생성합니다."
            },
            {
              "character": {
                "id": "arclight",
                "name": "아크라이트"
              },
              "skill": {
                "name": "질풍 섬광",
                "type": "배틀 스킬",
                "typeId": "battleSkill",
                "index": 1
              },
              "matchedMechanics": [
                {
                  "id": "shock",
                  "label": "감전"
                }
              ],
              "summary": "적이 감전 상태일 경우 감전을 소모하여 추가로 1회 공격하고 전기 피해를 주며 스킬 게이지 35포인트를 회복합니다."
            },
            {
              "character": {
                "id": "jangbangyi",
                "name": "장방이"
              },
              "skill": {
                "name": "변화의 숨결",
                "type": "연계 스킬",
                "typeId": "linkSkill",
                "index": 2
              },
              "matchedMechanics": [
                {
                  "id": "shock",
                  "label": "감전"
                }
              ],
              "summary": "메인 컨트롤 오퍼레이터의 강력한 일격 또는 처형으로 전기 부착 상태의 적을 명중한 후 사용할 수 있습니다. 전기 부착 상태의 적을 명중하면 그 전기 부착을 소모하고 강제로 감전 상태를 부여합니다."
            },
            {
              "character": {
                "id": "perlica",
                "name": "펠리카"
              },
              "skill": {
                "name": "실시간 프로토콜 · 연쇄 섬광",
                "type": "연계 스킬",
                "typeId": "linkSkill",
                "index": 2
              },
              "matchedMechanics": [
                {
                  "id": "shock",
                  "label": "감전"
                }
              ],
              "summary": "메인 컨트롤 오퍼레이터가 적에게 강력한 일격 피해를 준 다음 사용할 수 있습니다. 누적된 전기 에너지를 방출해 목표를 강타하며 전기 피해를 주고, 5초 동안 짧은 강제 감전 상태를 부여합니다."
            },
            {
              "character": {
                "id": "arclight",
                "name": "아크라이트"
              },
              "skill": {
                "name": "천둥번개",
                "type": "궁극기",
                "typeId": "ultimate",
                "index": 3
              },
              "matchedMechanics": [
                {
                  "id": "shock",
                  "label": "감전"
                }
              ],
              "summary": "적이 전기 부착 상태일 경우 전기 부착을 소모하여 감전 상태를 부여합니다. 전기 아크로 자신을 둘러싼 다음 전방 일정 거리를 돌진하며 경로상의 적에게 전기 피해를 주고 전기 부착 상태를 부여합니다."
            }
          ]
        }
      ]
    },
    "combatFlow": [
      {
        "order": 1,
        "character": {
          "id": "jangbangyi",
          "name": "장방이"
        },
        "stageIds": [
          "setup",
          "trigger"
        ],
        "title": "전기 부착 준비",
        "detail": "파티의 전기 부착 공급과 메인 컨트롤 오퍼레이터의 강력한 일격 또는 처형으로 장방이의 연계 스킬 발동 조건을 만든다.",
        "skill": {
          "name": "변화의 숨결",
          "type": "연계 스킬",
          "typeId": "linkSkill",
          "index": 2
        },
        "conditions": [
          "메인 컨트롤 오퍼레이터의 강력한 일격 또는 처형으로 전기 부착 상태의 적을 명중한 후 사용할 수 있습니다.",
          "전기 부착 상태의 적을 명중하면 그 전기 부착을 소모하고 강제로 감전 상태를 부여합니다."
        ],
        "timing": "",
        "effects": [
          "소모한 전기 부착 스택마다 궁극기 에너지 10을 추가로 획득합니다."
        ],
        "mechanics": [
          {
            "id": "electricInfliction",
            "label": "전기 부착"
          },
          {
            "id": "powerStrike",
            "label": "강력한 일격"
          },
          {
            "id": "execution",
            "label": "처형"
          },
          {
            "id": "mainControl",
            "label": "메인 컨트롤"
          }
        ],
        "preparationRoutes": [
          {
            "character": {
              "id": "perlica",
              "name": "펠리카"
            },
            "skill": {
              "name": "프로토콜ω · 뇌격",
              "type": "배틀 스킬",
              "typeId": "battleSkill",
              "index": 1
            },
            "matchedMechanics": [
              {
                "id": "electricInfliction",
                "label": "전기 부착"
              }
            ],
            "summary": "하늘에서 전기 에너지를 떨어뜨려 좁은 범위 내의 적에게 전기 피해를 주고 전기 부착 상태를 부여합니다."
          },
          {
            "character": {
              "id": "jangbangyi",
              "name": "장방이"
            },
            "skill": {
              "name": "심판의 폭풍",
              "type": "궁극기",
              "typeId": "ultimate",
              "index": 3
            },
            "matchedMechanics": [
              {
                "id": "electricInfliction",
                "label": "전기 부착"
              }
            ],
            "summary": "배틀 스킬 장방이의 배틀 스킬의 피해 배율과 공격 범위가 증가하며, 마지막 펠리카의 배틀 스킬이 적을 명중할 때 전기 부착을 부여합니다. 배틀 스킬 장방이의 배틀 스킬의 피해 배율과 공격 범위가 증가하며, 마지막 펠리카의 배틀 스킬이 적을 명중할 때 전기 부착을 부여합니다."
          },
          {
            "character": {
              "id": "arclight",
              "name": "아크라이트"
            },
            "skill": {
              "name": "천둥번개",
              "type": "궁극기",
              "typeId": "ultimate",
              "index": 3
            },
            "matchedMechanics": [
              {
                "id": "electricInfliction",
                "label": "전기 부착"
              }
            ],
            "summary": "전기 아크로 자신을 둘러싼 다음 전방 일정 거리를 돌진하며 경로상의 적에게 전기 피해를 주고 전기 부착 상태를 부여합니다."
          }
        ]
      },
      {
        "order": 2,
        "character": {
          "id": "arclight",
          "name": "아크라이트"
        },
        "stageIds": [
          "setup",
          "convert",
          "payoff",
          "recycle"
        ],
        "title": "아크라이트의 배틀 스킬 소모",
        "detail": "감전 대상에게 아크라이트의 배틀 스킬을 사용해 추가 전기 공격과 스킬 게이지 35 회복을 확보한다.",
        "skill": {
          "name": "질풍 섬광",
          "type": "배틀 스킬",
          "typeId": "battleSkill",
          "index": 1
        },
        "conditions": [],
        "timing": "",
        "effects": [
          "적이 감전 상태일 경우 감전을 소모하여 추가로 1회 공격하고 전기 피해를 주며 스킬 게이지 35포인트를 회복합니다."
        ],
        "mechanics": [
          {
            "id": "shock",
            "label": "감전"
          },
          {
            "id": "skillGauge",
            "label": "스킬 게이지"
          }
        ],
        "preparationRoutes": []
      },
      {
        "order": 3,
        "character": {
          "id": "antal",
          "name": "안탈"
        },
        "stageIds": [
          "setup",
          "trigger"
        ],
        "title": "상태 효과 준비",
        "detail": "파티원이 포커싱 대상에게 물리 이상 또는 아츠 부착을 부여해 안탈의 연계 스킬의 조건을 만든다.",
        "skill": {
          "name": "자기 폭풍 실험장",
          "type": "연계 스킬",
          "typeId": "linkSkill",
          "index": 2
        },
        "conditions": [
          "포커싱 당한 적이 물리 이상 효과 혹은 아츠 부착 상태일 때 사용할 수 있습니다.",
          "포커싱 대상의 물리 이상·아츠 부착"
        ],
        "timing": "",
        "effects": [
          "해당 적에게 에너지 폭발 1회를 일으켜 전기 피해를 주고, 대상에게 해당 물리 이상 효과 혹은 아츠 부착 상태를 다시 부여합니다."
        ],
        "mechanics": [
          {
            "id": "artsInfliction",
            "label": "아츠 부착"
          }
        ],
        "preparationRoutes": [
          {
            "character": {
              "id": "perlica",
              "name": "펠리카"
            },
            "skill": {
              "name": "프로토콜ω · 뇌격",
              "type": "배틀 스킬",
              "typeId": "battleSkill",
              "index": 1
            },
            "matchedMechanics": [
              {
                "id": "artsInfliction",
                "label": "아츠 부착"
              }
            ],
            "summary": "하늘에서 전기 에너지를 떨어뜨려 좁은 범위 내의 적에게 전기 피해를 주고 전기 부착 상태를 부여합니다."
          },
          {
            "character": {
              "id": "jangbangyi",
              "name": "장방이"
            },
            "skill": {
              "name": "변화의 숨결",
              "type": "연계 스킬",
              "typeId": "linkSkill",
              "index": 2
            },
            "matchedMechanics": [
              {
                "id": "artsInfliction",
                "label": "아츠 부착"
              }
            ],
            "summary": "메인 컨트롤 오퍼레이터의 강력한 일격 또는 처형으로 전기 부착 상태의 적을 명중한 후 사용할 수 있습니다."
          },
          {
            "character": {
              "id": "jangbangyi",
              "name": "장방이"
            },
            "skill": {
              "name": "심판의 폭풍",
              "type": "궁극기",
              "typeId": "ultimate",
              "index": 3
            },
            "matchedMechanics": [
              {
                "id": "artsInfliction",
                "label": "아츠 부착"
              }
            ],
            "summary": "배틀 스킬 장방이의 배틀 스킬의 피해 배율과 공격 범위가 증가하며, 마지막 펠리카의 배틀 스킬이 적을 명중할 때 전기 부착을 부여합니다."
          },
          {
            "character": {
              "id": "arclight",
              "name": "아크라이트"
            },
            "skill": {
              "name": "천둥번개",
              "type": "궁극기",
              "typeId": "ultimate",
              "index": 3
            },
            "matchedMechanics": [
              {
                "id": "artsInfliction",
                "label": "아츠 부착"
              }
            ],
            "summary": "전기 아크로 자신을 둘러싼 다음 전방 일정 거리를 돌진하며 경로상의 적에게 전기 피해를 주고 전기 부착 상태를 부여합니다."
          }
        ]
      },
      {
        "order": 4,
        "character": {
          "id": "arclight",
          "name": "아크라이트"
        },
        "stageIds": [
          "convert",
          "recycle"
        ],
        "title": "아크라이트의 연계 스킬 연결",
        "detail": "감전이 유지되거나 방금 소모된 직후 3초 쿨타임의 아크라이트의 연계 스킬을 사용해 물리 피해와 게이지 9 회복을 더한다.",
        "skill": {
          "name": "천둥의 울림",
          "type": "연계 스킬",
          "typeId": "linkSkill",
          "index": 2
        },
        "conditions": [
          "적이 감전 상태이거나 감전 상태를 소모한 후 사용할 수 있습니다.",
          "감전 상태 또는 감전 소모 후"
        ],
        "timing": "",
        "effects": [
          "적의 옆으로 순간 이동해 연속으로 베기 공격을 하여 물리 피해를 주고 스킬 게이지 9포인트를 회복합니다."
        ],
        "mechanics": [
          {
            "id": "physicalDamage",
            "label": "물리 피해"
          },
          {
            "id": "shock",
            "label": "감전"
          }
        ],
        "preparationRoutes": [
          {
            "character": {
              "id": "jangbangyi",
              "name": "장방이"
            },
            "skill": {
              "name": "뇌정의 부름",
              "type": "배틀 스킬",
              "typeId": "battleSkill",
              "index": 1
            },
            "matchedMechanics": [
              {
                "id": "shock",
                "label": "감전"
              }
            ],
            "summary": "목표의 감전 상태를 소모하여 이번 배틀 스킬의 피해 배율을 증가시키고, 소모한 감전 상태의 이상 레벨 +1자루의 청뢰검을 생성합니다."
          },
          {
            "character": {
              "id": "arclight",
              "name": "아크라이트"
            },
            "skill": {
              "name": "질풍 섬광",
              "type": "배틀 스킬",
              "typeId": "battleSkill",
              "index": 1
            },
            "matchedMechanics": [
              {
                "id": "shock",
                "label": "감전"
              }
            ],
            "summary": "적이 감전 상태일 경우 감전을 소모하여 추가로 1회 공격하고 전기 피해를 주며 스킬 게이지 35포인트를 회복합니다."
          },
          {
            "character": {
              "id": "jangbangyi",
              "name": "장방이"
            },
            "skill": {
              "name": "변화의 숨결",
              "type": "연계 스킬",
              "typeId": "linkSkill",
              "index": 2
            },
            "matchedMechanics": [
              {
                "id": "shock",
                "label": "감전"
              }
            ],
            "summary": "메인 컨트롤 오퍼레이터의 강력한 일격 또는 처형으로 전기 부착 상태의 적을 명중한 후 사용할 수 있습니다. 전기 부착 상태의 적을 명중하면 그 전기 부착을 소모하고 강제로 감전 상태를 부여합니다."
          },
          {
            "character": {
              "id": "perlica",
              "name": "펠리카"
            },
            "skill": {
              "name": "실시간 프로토콜 · 연쇄 섬광",
              "type": "연계 스킬",
              "typeId": "linkSkill",
              "index": 2
            },
            "matchedMechanics": [
              {
                "id": "shock",
                "label": "감전"
              }
            ],
            "summary": "메인 컨트롤 오퍼레이터가 적에게 강력한 일격 피해를 준 다음 사용할 수 있습니다. 누적된 전기 에너지를 방출해 목표를 강타하며 전기 피해를 주고, 5초 동안 짧은 강제 감전 상태를 부여합니다."
          },
          {
            "character": {
              "id": "jangbangyi",
              "name": "장방이"
            },
            "skill": {
              "name": "심판의 폭풍",
              "type": "궁극기",
              "typeId": "ultimate",
              "index": 3
            },
            "matchedMechanics": [
              {
                "id": "shock",
                "label": "감전"
              }
            ],
            "summary": "목표가 존재하면 감전 여부와 무관하게 청뢰검 3자루를 생성합니다. 배틀 스킬 장방이의 배틀 스킬의 피해 배율과 공격 범위가 증가하며, 마지막 펠리카의 배틀 스킬이 적을 명중할 때 전기 부착을 부여합니다."
          },
          {
            "character": {
              "id": "arclight",
              "name": "아크라이트"
            },
            "skill": {
              "name": "천둥번개",
              "type": "궁극기",
              "typeId": "ultimate",
              "index": 3
            },
            "matchedMechanics": [
              {
                "id": "shock",
                "label": "감전"
              }
            ],
            "summary": "적이 전기 부착 상태일 경우 전기 부착을 소모하여 감전 상태를 부여합니다. 전기 아크로 자신을 둘러싼 다음 전방 일정 거리를 돌진하며 경로상의 적에게 전기 피해를 주고 전기 부착 상태를 부여합니다."
          }
        ]
      },
      {
        "order": 5,
        "character": {
          "id": "antal",
          "name": "안탈"
        },
        "stageIds": [
          "payoff"
        ],
        "title": "팀 증폭 개시",
        "detail": "안탈의 궁극기으로 12초 동안 팀 전체에 전기·열기 증폭 8%를 제공한다.",
        "skill": {
          "name": "오버클록 타임",
          "type": "궁극기",
          "typeId": "ultimate",
          "index": 3
        },
        "conditions": [],
        "timing": "열기 증폭·전기 증폭 효과를 먼저 적용한 뒤 장방이의 궁극기를 이어갑니다.",
        "effects": [
          "팀 전체에게 12초 동안 전기 증폭 8%와 열기 증폭 8%를 부여합니다."
        ],
        "mechanics": [
          {
            "id": "heatAmplification",
            "label": "열기 증폭"
          }
        ],
        "preparationRoutes": []
      },
      {
        "order": 6,
        "character": {
          "id": "arclight",
          "name": "아크라이트"
        },
        "stageIds": [
          "setup",
          "convert"
        ],
        "title": "감전 준비",
        "detail": "아크라이트의 궁극기로 전기 부착을 부여하고 지연 폭발에서 이를 소모해 감전을 만든다. 파티의 외부 감전 공급도 활용할 수 있다.",
        "skill": {
          "name": "천둥번개",
          "type": "궁극기",
          "typeId": "ultimate",
          "index": 3
        },
        "conditions": [],
        "timing": "안탈의 궁극기로 전기 증폭 효과가 적용된 동안 사용해 주력 피해를 집중합니다.",
        "effects": [
          "전기 아크로 자신을 둘러싼 다음 전방 일정 거리를 돌진하며 경로상의 적에게 전기 피해를 주고 전기 부착 상태를 부여합니다.",
          "적이 전기 부착 상태일 경우 전기 부착을 소모하여 감전 상태를 부여합니다."
        ],
        "mechanics": [
          {
            "id": "electricInfliction",
            "label": "전기 부착"
          },
          {
            "id": "shock",
            "label": "감전"
          }
        ],
        "preparationRoutes": [
          {
            "character": {
              "id": "jangbangyi",
              "name": "장방이"
            },
            "skill": {
              "name": "변화의 숨결",
              "type": "연계 스킬",
              "typeId": "linkSkill",
              "index": 2
            },
            "matchedMechanics": [
              {
                "id": "electricInfliction",
                "label": "전기 부착"
              },
              {
                "id": "shock",
                "label": "감전"
              }
            ],
            "summary": "메인 컨트롤 오퍼레이터의 강력한 일격 또는 처형으로 전기 부착 상태의 적을 명중한 후 사용할 수 있습니다. 전기 부착 상태의 적을 명중하면 그 전기 부착을 소모하고 강제로 감전 상태를 부여합니다."
          },
          {
            "character": {
              "id": "jangbangyi",
              "name": "장방이"
            },
            "skill": {
              "name": "심판의 폭풍",
              "type": "궁극기",
              "typeId": "ultimate",
              "index": 3
            },
            "matchedMechanics": [
              {
                "id": "electricInfliction",
                "label": "전기 부착"
              },
              {
                "id": "shock",
                "label": "감전"
              }
            ],
            "summary": "배틀 스킬 장방이의 배틀 스킬의 피해 배율과 공격 범위가 증가하며, 마지막 펠리카의 배틀 스킬이 적을 명중할 때 전기 부착을 부여합니다. 배틀 스킬 장방이의 배틀 스킬의 피해 배율과 공격 범위가 증가하며, 마지막 펠리카의 배틀 스킬이 적을 명중할 때 전기 부착을 부여합니다."
          },
          {
            "character": {
              "id": "jangbangyi",
              "name": "장방이"
            },
            "skill": {
              "name": "뇌정의 부름",
              "type": "배틀 스킬",
              "typeId": "battleSkill",
              "index": 1
            },
            "matchedMechanics": [
              {
                "id": "shock",
                "label": "감전"
              }
            ],
            "summary": "목표의 감전 상태를 소모하여 이번 배틀 스킬의 피해 배율을 증가시키고, 소모한 감전 상태의 이상 레벨 +1자루의 청뢰검을 생성합니다."
          },
          {
            "character": {
              "id": "perlica",
              "name": "펠리카"
            },
            "skill": {
              "name": "프로토콜ω · 뇌격",
              "type": "배틀 스킬",
              "typeId": "battleSkill",
              "index": 1
            },
            "matchedMechanics": [
              {
                "id": "electricInfliction",
                "label": "전기 부착"
              }
            ],
            "summary": "하늘에서 전기 에너지를 떨어뜨려 좁은 범위 내의 적에게 전기 피해를 주고 전기 부착 상태를 부여합니다."
          },
          {
            "character": {
              "id": "arclight",
              "name": "아크라이트"
            },
            "skill": {
              "name": "질풍 섬광",
              "type": "배틀 스킬",
              "typeId": "battleSkill",
              "index": 1
            },
            "matchedMechanics": [
              {
                "id": "shock",
                "label": "감전"
              }
            ],
            "summary": "적이 감전 상태일 경우 감전을 소모하여 추가로 1회 공격하고 전기 피해를 주며 스킬 게이지 35포인트를 회복합니다."
          },
          {
            "character": {
              "id": "perlica",
              "name": "펠리카"
            },
            "skill": {
              "name": "실시간 프로토콜 · 연쇄 섬광",
              "type": "연계 스킬",
              "typeId": "linkSkill",
              "index": 2
            },
            "matchedMechanics": [
              {
                "id": "shock",
                "label": "감전"
              }
            ],
            "summary": "메인 컨트롤 오퍼레이터가 적에게 강력한 일격 피해를 준 다음 사용할 수 있습니다. 누적된 전기 에너지를 방출해 목표를 강타하며 전기 피해를 주고, 5초 동안 짧은 강제 감전 상태를 부여합니다."
          }
        ]
      },
      {
        "order": 7,
        "character": {
          "id": "perlica",
          "name": "펠리카"
        },
        "stageIds": [
          "payoff"
        ],
        "title": "저비용 궁극기 마무리",
        "detail": "궁극기 에너지 80을 채워 목표 구역에 대량 전기 피해를 가한다.",
        "skill": {
          "name": "프로토콜ε · 70.41κ",
          "type": "궁극기",
          "typeId": "ultimate",
          "index": 3
        },
        "conditions": [],
        "timing": "안탈의 궁극기로 전기 증폭 효과가 적용된 동안 사용해 주력 피해를 집중합니다.",
        "effects": [],
        "mechanics": [
          {
            "id": "electricDamage",
            "label": "전기 피해"
          },
          {
            "id": "ultimateEnergy",
            "label": "궁극기 에너지"
          },
          {
            "id": "ultimate",
            "label": "궁극기"
          }
        ],
        "preparationRoutes": []
      },
      {
        "order": 8,
        "character": {
          "id": "jangbangyi",
          "name": "장방이"
        },
        "stageIds": [
          "payoff"
        ],
        "title": "주력 화력 집중",
        "detail": "배틀 스킬 장방이의 배틀 스킬의 피해 배율과 공격 범위가 증가하며, 마지막 펠리카의 배틀 스킬이 적을 명중할 때 전기 부착을 부여합니다. 천리의 경지에서 처음 사용하는 장방이의 배틀 스킬은 스킬 게이지와 감전 상태를 소모하지 않습니다.",
        "skill": {
          "name": "심판의 폭풍",
          "type": "궁극기",
          "typeId": "ultimate",
          "index": 3
        },
        "conditions": [],
        "timing": "적에게 필요한 부착·이상 상태를 준비하고, 주력 피해를 집중할 수 있을 때 사용합니다.",
        "effects": [
          "배틀 스킬 장방이의 배틀 스킬의 피해 배율과 공격 범위가 증가하며, 마지막 펠리카의 배틀 스킬이 적을 명중할 때 전기 부착을 부여합니다.",
          "천리의 경지에서 처음 사용하는 장방이의 배틀 스킬은 스킬 게이지와 감전 상태를 소모하지 않습니다."
        ],
        "mechanics": [
          {
            "id": "electricInfliction",
            "label": "전기 부착"
          },
          {
            "id": "shock",
            "label": "감전"
          },
          {
            "id": "skillGauge",
            "label": "스킬 게이지"
          },
          {
            "id": "generalAttack",
            "label": "일반 공격"
          },
          {
            "id": "battleSkill",
            "label": "배틀 스킬"
          },
          {
            "id": "linkSkill",
            "label": "연계 스킬"
          }
        ],
        "preparationRoutes": [
          {
            "character": {
              "id": "jangbangyi",
              "name": "장방이"
            },
            "skill": {
              "name": "뇌정의 부름",
              "type": "배틀 스킬",
              "typeId": "battleSkill",
              "index": 1
            },
            "matchedMechanics": [
              {
                "id": "shock",
                "label": "감전"
              }
            ],
            "summary": "목표의 감전 상태를 소모하여 이번 배틀 스킬의 피해 배율을 증가시키고, 소모한 감전 상태의 이상 레벨 +1자루의 청뢰검을 생성합니다."
          },
          {
            "character": {
              "id": "arclight",
              "name": "아크라이트"
            },
            "skill": {
              "name": "질풍 섬광",
              "type": "배틀 스킬",
              "typeId": "battleSkill",
              "index": 1
            },
            "matchedMechanics": [
              {
                "id": "shock",
                "label": "감전"
              }
            ],
            "summary": "적이 감전 상태일 경우 감전을 소모하여 추가로 1회 공격하고 전기 피해를 주며 스킬 게이지 35포인트를 회복합니다."
          },
          {
            "character": {
              "id": "jangbangyi",
              "name": "장방이"
            },
            "skill": {
              "name": "변화의 숨결",
              "type": "연계 스킬",
              "typeId": "linkSkill",
              "index": 2
            },
            "matchedMechanics": [
              {
                "id": "shock",
                "label": "감전"
              }
            ],
            "summary": "메인 컨트롤 오퍼레이터의 강력한 일격 또는 처형으로 전기 부착 상태의 적을 명중한 후 사용할 수 있습니다. 전기 부착 상태의 적을 명중하면 그 전기 부착을 소모하고 강제로 감전 상태를 부여합니다."
          },
          {
            "character": {
              "id": "perlica",
              "name": "펠리카"
            },
            "skill": {
              "name": "실시간 프로토콜 · 연쇄 섬광",
              "type": "연계 스킬",
              "typeId": "linkSkill",
              "index": 2
            },
            "matchedMechanics": [
              {
                "id": "shock",
                "label": "감전"
              }
            ],
            "summary": "메인 컨트롤 오퍼레이터가 적에게 강력한 일격 피해를 준 다음 사용할 수 있습니다. 누적된 전기 에너지를 방출해 목표를 강타하며 전기 피해를 주고, 5초 동안 짧은 강제 감전 상태를 부여합니다."
          },
          {
            "character": {
              "id": "arclight",
              "name": "아크라이트"
            },
            "skill": {
              "name": "천둥번개",
              "type": "궁극기",
              "typeId": "ultimate",
              "index": 3
            },
            "matchedMechanics": [
              {
                "id": "shock",
                "label": "감전"
              }
            ],
            "summary": "적이 전기 부착 상태일 경우 전기 부착을 소모하여 감전 상태를 부여합니다. 전기 아크로 자신을 둘러싼 다음 전방 일정 거리를 돌진하며 경로상의 적에게 전기 피해를 주고 전기 부착 상태를 부여합니다."
          }
        ]
      }
    ],
    "supportFlow": [],
    "basicOperation": [
      {
        "order": 1,
        "title": "장방이 · 연계 스킬",
        "detail": "파티의 전기 부착 공급과 메인 컨트롤 오퍼레이터의 강력한 일격 또는 처형으로 장방이의 연계 스킬 발동 조건을 만든다."
      },
      {
        "order": 2,
        "title": "아크라이트 · 배틀 스킬",
        "detail": "감전 대상에게 아크라이트의 배틀 스킬을 사용해 추가 전기 공격과 스킬 게이지 35 회복을 확보한다."
      },
      {
        "order": 3,
        "title": "안탈 · 연계 스킬",
        "detail": "파티원이 포커싱 대상에게 물리 이상 또는 아츠 부착을 부여해 안탈의 연계 스킬의 조건을 만든다."
      },
      {
        "order": 4,
        "title": "아크라이트 · 연계 스킬",
        "detail": "감전이 유지되거나 방금 소모된 직후 3초 쿨타임의 아크라이트의 연계 스킬을 사용해 물리 피해와 게이지 9 회복을 더한다."
      },
      {
        "order": 5,
        "title": "안탈 · 궁극기",
        "detail": "안탈의 궁극기으로 12초 동안 팀 전체에 전기·열기 증폭 8%를 제공한다."
      },
      {
        "order": 6,
        "title": "아크라이트 · 궁극기",
        "detail": "아크라이트의 궁극기로 전기 부착을 부여하고 지연 폭발에서 이를 소모해 감전을 만든다. 파티의 외부 감전 공급도 활용할 수 있다."
      },
      {
        "order": 7,
        "title": "펠리카 · 궁극기",
        "detail": "궁극기 에너지 80을 채워 목표 구역에 대량 전기 피해를 가한다."
      },
      {
        "order": 8,
        "title": "장방이 · 궁극기",
        "detail": "배틀 스킬 장방이의 배틀 스킬의 피해 배율과 공격 범위가 증가하며, 마지막 펠리카의 배틀 스킬이 적을 명중할 때 전기 부착을 부여합니다. 천리의 경지에서 처음 사용하는 장방이의 배틀 스킬은 스킬 게이지와 감전 상태를 소모하지 않습니다."
      }
    ],
    "roles": [
      {
        "character": {
          "id": "jangbangyi",
          "name": "장방이"
        },
        "labels": [
          "전기 부착 생성",
          "감전·배틀 스킬 소모",
          "감전 활용",
          "전투 자원 순환"
        ],
        "relation": "펠리카의 전기 피해 조건과 직접 이어집니다."
      },
      {
        "character": {
          "id": "perlica",
          "name": "펠리카"
        },
        "labels": [
          "전기 부착 생성",
          "감전 활용",
          "전투 자원 순환",
          "메인 컨트롤 후보"
        ],
        "relation": "장방이의 전기 피해 조건과 직접 이어집니다."
      },
      {
        "character": {
          "id": "arclight",
          "name": "아크라이트"
        },
        "labels": [
          "전기 부착 생성",
          "전기 피해·감전 소모",
          "감전 활용",
          "전투 자원 순환"
        ],
        "relation": "장방이의 불균형 조건과 직접 이어집니다."
      },
      {
        "character": {
          "id": "antal",
          "name": "안탈"
        },
        "labels": [
          "열기 취약·전기 취약 지원",
          "전투 자원 순환",
          "생존 지원",
          "메인 컨트롤 후보"
        ],
        "relation": "장방이의 전기 피해 조건과 직접 이어집니다."
      }
    ],
    "weaknesses": [
      {
        "title": "예열·상태 준비",
        "entries": [
          {
            "character": {
              "id": "jangbangyi",
              "name": "장방이"
            },
            "axis": "전기 부착·감전 이중 준비",
            "evidence": "변화의 숨결은 전기 부착 대상에 대한 강력한 일격 또는 처형이 필요하고, 뇌정의 부름의 강화 생성은 감전 소모를 요구합니다.",
            "affected": "변화의 숨결 · 뇌정의 부름",
            "implication": "전기 부착을 감전으로 바꾼 뒤 다시 감전을 소모하는 두 단계 준비가 필요합니다. 부착 저항·이상 상태 방해·조건 발동 지연 방향의 제약에서 순환이 끊기기 쉽습니다."
          },
          {
            "character": {
              "id": "jangbangyi",
              "name": "장방이"
            },
            "axis": "높은 궁극기 에너지 요구",
            "evidence": "심판의 폭풍은 궁극기 에너지 240을 요구하며, 주요 에너지 획득은 전기 부착 스택 소모와 청뢰검 뇌격에 연결됩니다.",
            "affected": "변화의 숨결 · 뇌정의 부름 · 심판의 폭풍",
            "implication": "강화 상태 진입 전 준비 시간이 길고, 부착 스택을 충분히 소모하지 못하면 궁극기 회전이 크게 늦어집니다. 에너지 수급 감소 방향의 제약에 민감합니다."
          },
          {
            "character": {
              "id": "jangbangyi",
              "name": "장방이"
            },
            "axis": "메인 컨트롤 조건 점유",
            "evidence": "변화의 숨결 발동에는 메인 컨트롤 오퍼레이터의 강력한 일격 또는 처형이 필요하고, 궁극기는 일반 공격을 직접 강화합니다.",
            "affected": "변화의 숨결 · 심판의 폭풍",
            "implication": "다른 메인 컨트롤 중심 캐릭터와 운용 시간이 충돌할 수 있습니다. 교대 제한이나 공격 기회 감소에서는 조건 충족과 강화 일반 공격 활용을 동시에 놓칠 수 있습니다."
          },
          {
            "character": {
              "id": "perlica",
              "name": "펠리카"
            },
            "axis": "물리 상태와 전기 화력의 조합 의존",
            "evidence": "오블리터레이션 프로토콜은 불균형 대상을 요구하고, 순환 프로토콜의 추가 튕김은 방어 불능 대상을 요구합니다.",
            "affected": "재능 1 · 재능 2",
            "implication": "펠리카의 전기 스킬만으로는 불균형과 방어 불능을 안정적으로 준비하기 어렵습니다. 물리 이상·불균형 지원 캐릭터가 없으면 두 재능의 효율이 제한됩니다."
          },
          {
            "character": {
              "id": "perlica",
              "name": "펠리카"
            },
            "axis": "좁은 배틀 스킬 범위",
            "evidence": "프로토콜ω · 뇌격은 좁은 범위 내의 적에게 전기 피해와 전기 부착을 부여합니다.",
            "affected": "프로토콜ω · 뇌격",
            "implication": "적이 넓게 분산된 상황에서는 한 번에 여러 대상에게 전기 부착을 공급하기 어렵습니다. 적 분산과 이동이 많은 전투에서 준비 효율이 낮아집니다."
          },
          {
            "character": {
              "id": "arclight",
              "name": "아크라이트"
            },
            "axis": "감전 상태 의존",
            "evidence": "질풍 섬광의 추가 공격과 게이지 35 회복은 감전 소모가 필요하고, 천둥의 울림도 감전 상태 또는 감전 소모 직후에만 사용할 수 있습니다.",
            "affected": "질풍 섬광 · 천둥의 울림",
            "implication": "감전 공급이 끊기면 배틀 스킬의 핵심 보상과 짧은 연계 순환이 동시에 사라집니다. 이상 상태 저항·부착 방해 방향의 제약에 매우 민감합니다."
          },
          {
            "character": {
              "id": "arclight",
              "name": "아크라이트"
            },
            "axis": "추가 효과 반복 요구",
            "evidence": "황무지의 여행자는 질풍 섬광의 추가 효과를 기본 3회 발동해야 팀 전기 피해 증가를 제공합니다.",
            "affected": "질풍 섬광 · 황무지의 여행자",
            "implication": "감전을 세 번 준비하고 소모해야 팀 버프가 시작됩니다. 짧은 전투나 대상이 빠르게 처치되는 전투에서는 버프 준비가 늦습니다."
          },
          {
            "character": {
              "id": "arclight",
              "name": "아크라이트"
            },
            "axis": "궁극기 의존 자체 감전 공급",
            "evidence": "자체 스킬 중 안정적으로 전기 부착과 감전을 연속 제공하는 수단은 궁극기 천둥번개입니다.",
            "affected": "천둥번개 · 질풍 섬광",
            "implication": "궁극기 전에는 외부 감전 공급이 없으면 핵심 순환 진입이 어렵습니다. 궁극기 에너지 감소나 시작 에너지 부족 방향의 제약이 첫 순환을 지연시킵니다."
          },
          {
            "character": {
              "id": "arclight",
              "name": "아크라이트"
            },
            "axis": "잠재력에 따른 버프 준비 차이",
            "evidence": "P3은 팀 전기 피해 증가량을 1.3배로 높이고 P5는 발동에 필요한 추가 효과 횟수를 3회에서 2회로 줄입니다.",
            "affected": "P3 · P5",
            "implication": "핵심 팀 지원 효과의 크기와 준비 속도가 잠재력에 크게 좌우됩니다. 낮은 잠재력에서는 전기 파티 지원이 늦고 유지 효율도 낮습니다."
          },
          {
            "character": {
              "id": "antal",
              "name": "안탈"
            },
            "axis": "단일 목표 포커싱 제한",
            "evidence": "지정 연구 대상은 최대 1명의 적만 포커싱할 수 있습니다.",
            "affected": "지정 연구 대상 · 자기 폭풍 실험장",
            "implication": "다수전에서는 한 대상만 취약과 상태 재부여 지원을 받을 수 있습니다. 목표가 자주 바뀌거나 여러 핵심 적이 동시에 등장하면 지원 범위가 제한됩니다."
          },
          {
            "character": {
              "id": "antal",
              "name": "안탈"
            },
            "axis": "외부 상태 효과 의존",
            "evidence": "자기 폭풍 실험장은 포커싱 대상에게 물리 이상 효과 또는 아츠 부착이 있어야 사용할 수 있습니다.",
            "affected": "자기 폭풍 실험장",
            "implication": "안탈 혼자서는 연계 스킬 조건을 안정적으로 준비하기 어렵습니다. 파티의 상태 부여가 늦거나 적이 면역이면 긴 25초 쿨타임의 연계를 사용하지 못합니다."
          },
          {
            "character": {
              "id": "antal",
              "name": "안탈"
            },
            "axis": "긴 연계 스킬 쿨타임",
            "evidence": "자기 폭풍 실험장의 쿨타임은 25초입니다.",
            "affected": "자기 폭풍 실험장",
            "implication": "상태 재부여 기회가 자주 오지 않으므로 한 번의 사용 시점과 재부여할 상태 선택이 중요합니다. 쿨타임 증가 방향의 제약에서 지원 공백이 커집니다."
          },
          {
            "character": {
              "id": "antal",
              "name": "안탈"
            },
            "axis": "조건부·제한형 치유",
            "evidence": "즉흥적인 천재성은 증폭 상태 팀원이 스킬 피해를 줘야 발동하고 각 오퍼레이터마다 30초에 1회만 치유합니다.",
            "affected": "즉흥적인 천재성 · 오버클록 타임",
            "implication": "지속적인 회복보다는 궁극기 증폭 창에 묶인 간헐적 치유입니다. 지속 피해가 강하거나 스킬을 사용하지 못하는 상황에서는 생존 지원이 부족합니다."
          },
          {
            "character": {
              "id": "antal",
              "name": "안탈"
            },
            "axis": "긴 포커싱 준비와 잠재력 의존",
            "evidence": "P5의 추가 취약 4%는 같은 목표를 20초 동안 포커싱해야 하며, P3의 게이지 반환은 포커싱 대상이 처치될 때만 발생합니다.",
            "affected": "P3 · P5",
            "implication": "짧은 전투에서는 추가 취약이 활성화되기 전에 목표가 처치될 수 있고, 보스전에서는 처치 조건 게이지 반환을 받기 어렵습니다. 잠재력 효과가 전투 유형에 따라 크게 달라집니다."
          }
        ]
      },
      {
        "title": "스킬 게이지·궁극기 순환",
        "entries": [
          {
            "character": {
              "id": "jangbangyi",
              "name": "장방이"
            },
            "axis": "높은 궁극기 에너지 요구",
            "evidence": "심판의 폭풍은 궁극기 에너지 240을 요구하며, 주요 에너지 획득은 전기 부착 스택 소모와 청뢰검 뇌격에 연결됩니다.",
            "affected": "변화의 숨결 · 뇌정의 부름 · 심판의 폭풍",
            "implication": "강화 상태 진입 전 준비 시간이 길고, 부착 스택을 충분히 소모하지 못하면 궁극기 회전이 크게 늦어집니다. 에너지 수급 감소 방향의 제약에 민감합니다."
          },
          {
            "character": {
              "id": "jangbangyi",
              "name": "장방이"
            },
            "axis": "확률형 생존과 긴 회복 제한",
            "evidence": "하늘의 가호는 기본 9% 확률의 피해 면역이며 청뢰검 수에 따라 증가하고, 발동 후 회복은 99초마다 1회입니다.",
            "affected": "하늘의 가호",
            "implication": "생존 보조가 확률에 의존하고 회복 재사용 간격도 매우 깁니다. 지속 압박이나 확정 생존이 필요한 상황에서는 안정적인 방어 수단으로 보기 어렵습니다."
          },
          {
            "character": {
              "id": "jangbangyi",
              "name": "장방이"
            },
            "axis": "잠재력 의존 보완",
            "evidence": "P3은 감전 소모 후 게이지 반환과 청뢰검 지속 연장을, P4는 궁극기 에너지 감소를, P5는 전기 저항 무시를 제공합니다.",
            "affected": "P3 · P4 · P5",
            "implication": "기본 구조의 게이지 부담, 축적 유지, 높은 궁극기 요구량과 저항 대응을 잠재력이 크게 보완합니다. 잠재력 단계에 따라 체감 순환과 최종 화력 차이가 큽니다."
          },
          {
            "character": {
              "id": "perlica",
              "name": "펠리카"
            },
            "axis": "직접적인 자원 회복 부재",
            "evidence": "제공된 기본 스킬과 재능에는 스킬 게이지 반환이나 궁극기 에너지 직접 획득 효과가 없습니다.",
            "affected": "전 스킬 순환",
            "implication": "코스트 100 배틀 스킬과 궁극기 에너지 80을 외부 자원 공급과 자연 회복에 의존합니다. 자원 회복 감소 방향의 제약에서 스킬 빈도가 낮아집니다."
          },
          {
            "character": {
              "id": "arclight",
              "name": "아크라이트"
            },
            "axis": "감전 상태 의존",
            "evidence": "질풍 섬광의 추가 공격과 게이지 35 회복은 감전 소모가 필요하고, 천둥의 울림도 감전 상태 또는 감전 소모 직후에만 사용할 수 있습니다.",
            "affected": "질풍 섬광 · 천둥의 울림",
            "implication": "감전 공급이 끊기면 배틀 스킬의 핵심 보상과 짧은 연계 순환이 동시에 사라집니다. 이상 상태 저항·부착 방해 방향의 제약에 매우 민감합니다."
          },
          {
            "character": {
              "id": "arclight",
              "name": "아크라이트"
            },
            "axis": "궁극기 의존 자체 감전 공급",
            "evidence": "자체 스킬 중 안정적으로 전기 부착과 감전을 연속 제공하는 수단은 궁극기 천둥번개입니다.",
            "affected": "천둥번개 · 질풍 섬광",
            "implication": "궁극기 전에는 외부 감전 공급이 없으면 핵심 순환 진입이 어렵습니다. 궁극기 에너지 감소나 시작 에너지 부족 방향의 제약이 첫 순환을 지연시킵니다."
          },
          {
            "character": {
              "id": "antal",
              "name": "안탈"
            },
            "axis": "외부 상태 효과 의존",
            "evidence": "자기 폭풍 실험장은 포커싱 대상에게 물리 이상 효과 또는 아츠 부착이 있어야 사용할 수 있습니다.",
            "affected": "자기 폭풍 실험장",
            "implication": "안탈 혼자서는 연계 스킬 조건을 안정적으로 준비하기 어렵습니다. 파티의 상태 부여가 늦거나 적이 면역이면 긴 25초 쿨타임의 연계를 사용하지 못합니다."
          },
          {
            "character": {
              "id": "antal",
              "name": "안탈"
            },
            "axis": "긴 연계 스킬 쿨타임",
            "evidence": "자기 폭풍 실험장의 쿨타임은 25초입니다.",
            "affected": "자기 폭풍 실험장",
            "implication": "상태 재부여 기회가 자주 오지 않으므로 한 번의 사용 시점과 재부여할 상태 선택이 중요합니다. 쿨타임 증가 방향의 제약에서 지원 공백이 커집니다."
          },
          {
            "character": {
              "id": "antal",
              "name": "안탈"
            },
            "axis": "조건부·제한형 치유",
            "evidence": "즉흥적인 천재성은 증폭 상태 팀원이 스킬 피해를 줘야 발동하고 각 오퍼레이터마다 30초에 1회만 치유합니다.",
            "affected": "즉흥적인 천재성 · 오버클록 타임",
            "implication": "지속적인 회복보다는 궁극기 증폭 창에 묶인 간헐적 치유입니다. 지속 피해가 강하거나 스킬을 사용하지 못하는 상황에서는 생존 지원이 부족합니다."
          },
          {
            "character": {
              "id": "antal",
              "name": "안탈"
            },
            "axis": "긴 포커싱 준비와 잠재력 의존",
            "evidence": "P5의 추가 취약 4%는 같은 목표를 20초 동안 포커싱해야 하며, P3의 게이지 반환은 포커싱 대상이 처치될 때만 발생합니다.",
            "affected": "P3 · P5",
            "implication": "짧은 전투에서는 추가 취약이 활성화되기 전에 목표가 처치될 수 있고, 보스전에서는 처치 조건 게이지 반환을 받기 어렵습니다. 잠재력 효과가 전투 유형에 따라 크게 달라집니다."
          }
        ]
      },
      {
        "title": "위치·대상 수",
        "entries": [
          {
            "character": {
              "id": "jangbangyi",
              "name": "장방이"
            },
            "axis": "전기 부착·감전 이중 준비",
            "evidence": "변화의 숨결은 전기 부착 대상에 대한 강력한 일격 또는 처형이 필요하고, 뇌정의 부름의 강화 생성은 감전 소모를 요구합니다.",
            "affected": "변화의 숨결 · 뇌정의 부름",
            "implication": "전기 부착을 감전으로 바꾼 뒤 다시 감전을 소모하는 두 단계 준비가 필요합니다. 부착 저항·이상 상태 방해·조건 발동 지연 방향의 제약에서 순환이 끊기기 쉽습니다."
          },
          {
            "character": {
              "id": "perlica",
              "name": "펠리카"
            },
            "axis": "메인 컨트롤 강력한 일격 의존",
            "evidence": "연쇄 섬광은 메인 컨트롤 오퍼레이터가 강력한 일격 피해를 준 다음에만 사용할 수 있습니다.",
            "affected": "실시간 프로토콜 · 연쇄 섬광",
            "implication": "메인 컨트롤의 일반 공격 순환이나 강력한 일격 기회가 끊기면 핵심 감전 공급이 지연됩니다. 교대 제한·공격 중단 방향의 제약에 취약합니다."
          },
          {
            "character": {
              "id": "perlica",
              "name": "펠리카"
            },
            "axis": "짧은 감전 지속 시간",
            "evidence": "연쇄 섬광이 부여하는 강제 감전은 기본 5초 동안 지속됩니다.",
            "affected": "연쇄 섬광 · P1",
            "implication": "감전이 유지되는 짧은 시간 안에 아츠 공격을 집중해야 합니다. 후속 스킬 지연이나 적 이동으로 피해 집중 창을 놓치기 쉽고, 지속 연장은 P1에 배치되어 있습니다."
          },
          {
            "character": {
              "id": "perlica",
              "name": "펠리카"
            },
            "axis": "좁은 배틀 스킬 범위",
            "evidence": "프로토콜ω · 뇌격은 좁은 범위 내의 적에게 전기 피해와 전기 부착을 부여합니다.",
            "affected": "프로토콜ω · 뇌격",
            "implication": "적이 넓게 분산된 상황에서는 한 번에 여러 대상에게 전기 부착을 공급하기 어렵습니다. 적 분산과 이동이 많은 전투에서 준비 효율이 낮아집니다."
          },
          {
            "character": {
              "id": "arclight",
              "name": "아크라이트"
            },
            "axis": "궁극기 의존 자체 감전 공급",
            "evidence": "자체 스킬 중 안정적으로 전기 부착과 감전을 연속 제공하는 수단은 궁극기 천둥번개입니다.",
            "affected": "천둥번개 · 질풍 섬광",
            "implication": "궁극기 전에는 외부 감전 공급이 없으면 핵심 순환 진입이 어렵습니다. 궁극기 에너지 감소나 시작 에너지 부족 방향의 제약이 첫 순환을 지연시킵니다."
          },
          {
            "character": {
              "id": "arclight",
              "name": "아크라이트"
            },
            "axis": "근접 이동과 대상 추적",
            "evidence": "질풍 섬광과 천둥의 울림은 적의 옆으로 순간 이동해 공격하며, 궁극기는 전방 일정 거리를 돌진합니다.",
            "affected": "질풍 섬광 · 천둥의 울림 · 천둥번개",
            "implication": "빠른 이동은 장점이지만 위험 지역이나 원하지 않는 위치로 진입할 수 있습니다. 적이 흩어지거나 이동 경로가 제한되면 공격과 후속 연결이 불안정해집니다."
          },
          {
            "character": {
              "id": "antal",
              "name": "안탈"
            },
            "axis": "단일 목표 포커싱 제한",
            "evidence": "지정 연구 대상은 최대 1명의 적만 포커싱할 수 있습니다.",
            "affected": "지정 연구 대상 · 자기 폭풍 실험장",
            "implication": "다수전에서는 한 대상만 취약과 상태 재부여 지원을 받을 수 있습니다. 목표가 자주 바뀌거나 여러 핵심 적이 동시에 등장하면 지원 범위가 제한됩니다."
          }
        ]
      },
      {
        "title": "잠재력 의존",
        "entries": [
          {
            "character": {
              "id": "jangbangyi",
              "name": "장방이"
            },
            "axis": "잠재력 의존 보완",
            "evidence": "P3은 감전 소모 후 게이지 반환과 청뢰검 지속 연장을, P4는 궁극기 에너지 감소를, P5는 전기 저항 무시를 제공합니다.",
            "affected": "P3 · P4 · P5",
            "implication": "기본 구조의 게이지 부담, 축적 유지, 높은 궁극기 요구량과 저항 대응을 잠재력이 크게 보완합니다. 잠재력 단계에 따라 체감 순환과 최종 화력 차이가 큽니다."
          },
          {
            "character": {
              "id": "perlica",
              "name": "펠리카"
            },
            "axis": "짧은 감전 지속 시간",
            "evidence": "연쇄 섬광이 부여하는 강제 감전은 기본 5초 동안 지속됩니다.",
            "affected": "연쇄 섬광 · P1",
            "implication": "감전이 유지되는 짧은 시간 안에 아츠 공격을 집중해야 합니다. 후속 스킬 지연이나 적 이동으로 피해 집중 창을 놓치기 쉽고, 지속 연장은 P1에 배치되어 있습니다."
          },
          {
            "character": {
              "id": "perlica",
              "name": "펠리카"
            },
            "axis": "잠재력에 집중된 감전·궁극기 강화",
            "evidence": "P1은 감전 지속을 늘리고, P3·P4는 감전 중 공격력과 아츠 피해 증가 효과를 강화하며, P5는 궁극기 치명타 확률을 올립니다.",
            "affected": "P1 · P3 · P4 · P5",
            "implication": "기본 감전 창과 최종 화력이 잠재력에서 크게 개선됩니다. 잠재력 단계에 따라 감전 지원과 궁극기 마무리 성능 차이가 큽니다."
          },
          {
            "character": {
              "id": "arclight",
              "name": "아크라이트"
            },
            "axis": "잠재력에 따른 버프 준비 차이",
            "evidence": "P3은 팀 전기 피해 증가량을 1.3배로 높이고 P5는 발동에 필요한 추가 효과 횟수를 3회에서 2회로 줄입니다.",
            "affected": "P3 · P5",
            "implication": "핵심 팀 지원 효과의 크기와 준비 속도가 잠재력에 크게 좌우됩니다. 낮은 잠재력에서는 전기 파티 지원이 늦고 유지 효율도 낮습니다."
          },
          {
            "character": {
              "id": "antal",
              "name": "안탈"
            },
            "axis": "긴 포커싱 준비와 잠재력 의존",
            "evidence": "P5의 추가 취약 4%는 같은 목표를 20초 동안 포커싱해야 하며, P3의 게이지 반환은 포커싱 대상이 처치될 때만 발생합니다.",
            "affected": "P3 · P5",
            "implication": "짧은 전투에서는 추가 취약이 활성화되기 전에 목표가 처치될 수 있고, 보스전에서는 처치 조건 게이지 반환을 받기 어렵습니다. 잠재력 효과가 전투 유형에 따라 크게 달라집니다."
          }
        ]
      },
      {
        "title": "메인 컨트롤·조작 집중",
        "entries": [
          {
            "character": {
              "id": "jangbangyi",
              "name": "장방이"
            },
            "axis": "메인 컨트롤 조건 점유",
            "evidence": "변화의 숨결 발동에는 메인 컨트롤 오퍼레이터의 강력한 일격 또는 처형이 필요하고, 궁극기는 일반 공격을 직접 강화합니다.",
            "affected": "변화의 숨결 · 심판의 폭풍",
            "implication": "다른 메인 컨트롤 중심 캐릭터와 운용 시간이 충돌할 수 있습니다. 교대 제한이나 공격 기회 감소에서는 조건 충족과 강화 일반 공격 활용을 동시에 놓칠 수 있습니다."
          },
          {
            "character": {
              "id": "perlica",
              "name": "펠리카"
            },
            "axis": "메인 컨트롤 강력한 일격 의존",
            "evidence": "연쇄 섬광은 메인 컨트롤 오퍼레이터가 강력한 일격 피해를 준 다음에만 사용할 수 있습니다.",
            "affected": "실시간 프로토콜 · 연쇄 섬광",
            "implication": "메인 컨트롤의 일반 공격 순환이나 강력한 일격 기회가 끊기면 핵심 감전 공급이 지연됩니다. 교대 제한·공격 중단 방향의 제약에 취약합니다."
          }
        ]
      }
    ],
    "discoveries": [
      {
        "character": {
          "id": "jangbangyi",
          "name": "장방이"
        },
        "title": "연계 스킬 재평가",
        "description": "현재 순환은 배틀 스킬 비중이 높지만, 연계 스킬은 전기 부착·강력한 일격 조건을 이용하는 별도 기능을 갖고 있습니다.",
        "opportunity": "주력 피해원을 약화시키되 이 효과까지 함께 막지 않는 설계라면 보조 루트가 새로운 선택지로 떠오를 수 있습니다.",
        "skillName": "연계 스킬"
      },
      {
        "character": {
          "id": "perlica",
          "name": "펠리카"
        },
        "title": "연계 스킬 재평가",
        "description": "현재 순환은 배틀 스킬 비중이 높지만, 연계 스킬은 강력한 일격·메인 컨트롤 조건을 이용하는 별도 기능을 갖고 있습니다.",
        "opportunity": "주력 피해원을 약화시키되 이 효과까지 함께 막지 않는 설계라면 보조 루트가 새로운 선택지로 떠오를 수 있습니다.",
        "skillName": "연계 스킬"
      },
      {
        "character": {
          "id": "arclight",
          "name": "아크라이트"
        },
        "title": "연계 스킬 재평가",
        "description": "현재 순환은 배틀 스킬 비중이 높지만, 연계 스킬은 감전 조건을 이용하는 별도 기능을 갖고 있습니다.",
        "opportunity": "주력 피해원을 약화시키되 이 효과까지 함께 막지 않는 설계라면 보조 루트가 새로운 선택지로 떠오를 수 있습니다.",
        "skillName": "연계 스킬"
      },
      {
        "character": {
          "id": "antal",
          "name": "안탈"
        },
        "title": "연계 스킬 재평가",
        "description": "현재 순환은 연계 스킬 비중이 높지만, 연계 스킬은 아츠 부착 조건을 이용하는 별도 기능을 갖고 있습니다.",
        "opportunity": "주력 피해원을 약화시키되 이 효과까지 함께 막지 않는 설계라면 보조 루트가 새로운 선택지로 떠오를 수 있습니다.",
        "skillName": "연계 스킬"
      }
    ],
    "designHints": [
      {
        "id": "normal",
        "title": "일반 공격 의존도",
        "pressure": "일반 공격 피해 비중을 낮추는 방향",
        "impact": "강화 상태나 메인 컨트롤 중 일반 공격에 몰린 화력 구간이 짧아집니다.",
        "opportunity": "장방이의 연계 스킬, 펠리카의 연계 스킬처럼 연계·배틀 스킬 중심의 보조 축이 상대적으로 중요해질 수 있습니다.",
        "caution": "일반 공격과 강력한 일격을 동시에 완전히 막으면 스킬 게이지 회복과 불균형 순환까지 함께 끊길 수 있습니다.",
        "characters": [
          {
            "id": "perlica",
            "name": "펠리카"
          }
        ]
      },
      {
        "id": "ultimate",
        "title": "궁극기 반복 의존도",
        "pressure": "궁극기 반복 사용의 효율이 점차 낮아지는 방향",
        "impact": "궁극기를 중심으로 한 강화 구간과 마무리 빈도가 줄어듭니다.",
        "opportunity": "궁극기 에너지를 다른 가치로 돌리거나 배틀·연계 스킬을 주력화하는 운용을 찾게 됩니다.",
        "caution": "첫 궁극기까지 무력화하면 준비 과정의 의미도 사라질 수 있으므로 반복 효율을 조절하는 편이 발견을 만들기 쉽습니다.",
        "characters": [
          {
            "id": "jangbangyi",
            "name": "장방이"
          },
          {
            "id": "perlica",
            "name": "펠리카"
          },
          {
            "id": "arclight",
            "name": "아크라이트"
          },
          {
            "id": "antal",
            "name": "안탈"
          }
        ]
      },
      {
        "id": "battle",
        "title": "배틀 스킬 피해 비중",
        "pressure": "배틀 스킬의 직접 피해를 줄이되 연계 스킬 순환은 열어주는 방향",
        "impact": "스킬 게이지를 사용해 즉시 내는 화력이 줄어듭니다.",
        "opportunity": "배틀 스킬을 상태 생성·변환 용도로만 쓰고, 연계 스킬이나 궁극기 외 추가 피해를 주력으로 삼는 구조가 떠오를 수 있습니다.",
        "caution": "배틀 스킬의 상태 부여까지 막으면 후속 연계 조건 자체가 사라질 수 있습니다.",
        "characters": [
          {
            "id": "jangbangyi",
            "name": "장방이"
          },
          {
            "id": "perlica",
            "name": "펠리카"
          },
          {
            "id": "arclight",
            "name": "아크라이트"
          },
          {
            "id": "antal",
            "name": "안탈"
          }
        ]
      },
      {
        "id": "link",
        "title": "연계 스킬 빈도",
        "pressure": "연계 스킬 사용 빈도와 쿨타임을 크게 흔드는 방향",
        "impact": "조건을 자주 열 수 있는 파티일수록 순환 속도가 크게 달라집니다.",
        "opportunity": "연계 횟수가 늘어날 때 생기는 자원 수급과 보조 피해, 반대로 연계에 대가가 생길 때의 대체 순서를 비교할 수 있습니다.",
        "caution": "연계 조건과 쿨타임을 동시에 막으면 조합의 상호작용이 사라질 수 있습니다.",
        "characters": [
          {
            "id": "jangbangyi",
            "name": "장방이"
          },
          {
            "id": "arclight",
            "name": "아크라이트"
          },
          {
            "id": "antal",
            "name": "안탈"
          }
        ]
      },
      {
        "id": "stack",
        "title": "부착·방어 불능 축적 속도",
        "pressure": "같은 대상에게 스택을 연속으로 쌓는 속도를 제한하는 방향",
        "impact": "최대 스택을 전제로 하는 동결·강타·갑옷 파괴·취약 발동 시점이 늦어집니다.",
        "opportunity": "낮은 스택에서 바로 작동하는 스킬, 강제 이상, 직접 부여 효과의 가치가 올라갈 수 있습니다.",
        "caution": "부착 자체를 금지하면 대체 운용이 아니라 파티의 핵심 문법을 삭제하게 됩니다.",
        "characters": [
          {
            "id": "jangbangyi",
            "name": "장방이"
          },
          {
            "id": "perlica",
            "name": "펠리카"
          },
          {
            "id": "arclight",
            "name": "아크라이트"
          },
          {
            "id": "antal",
            "name": "안탈"
          }
        ]
      }
    ],
    "mechanicProfile": {
      "mechanicIds": [
        "shock",
        "electricInfliction",
        "electricDamage",
        "ultimate",
        "artsInfliction",
        "ultimateEnergy",
        "powerStrike",
        "mainControl",
        "physicalDamage",
        "battleSkill",
        "defenseless",
        "execution",
        "skillGauge",
        "healing",
        "imbalance",
        "heatVulnerability",
        "heatAmplification",
        "generalAttack",
        "linkSkill"
      ],
      "mechanicScores": {
        "shock": 37.5,
        "electricInfliction": 18.5,
        "electricDamage": 17,
        "ultimate": 15,
        "artsInfliction": 11.5,
        "ultimateEnergy": 10.5,
        "powerStrike": 9,
        "mainControl": 9,
        "physicalDamage": 6.5,
        "battleSkill": 6,
        "defenseless": 4.5,
        "execution": 4.5,
        "skillGauge": 4.5,
        "healing": 4.5,
        "imbalance": 3,
        "heatVulnerability": 3,
        "heatAmplification": 3,
        "generalAttack": 3,
        "linkSkill": 3,
        "heatDamage": 0,
        "frostDamage": 0,
        "natureDamage": 0,
        "artsDamage": 0,
        "heatInfliction": 0,
        "frostInfliction": 0,
        "natureInfliction": 0,
        "artsAbnormality": 0,
        "combustion": 0,
        "freeze": 0,
        "corrosion": 0,
        "launch": 0,
        "knockdown": 0,
        "smash": 0,
        "armorBreak": 0,
        "artsVulnerability": 0,
        "physicalVulnerability": 0,
        "electricVulnerability": 0,
        "frostVulnerability": 0,
        "natureVulnerability": 0,
        "artsAmplification": 0,
        "physicalAmplification": 0,
        "electricAmplification": 0,
        "frostAmplification": 0,
        "natureAmplification": 0,
        "skillGaugeReturn": 0,
        "protection": 0,
        "fortification": 0,
        "weakness": 0,
        "comboHit": 0,
        "cleanse": 0,
        "slow": 0,
        "haste": 0,
        "originiumCrystal": 0
      },
      "dominantAction": "battleSkill",
      "actionTotals": {
        "generalAttack": 6,
        "battleSkill": 29,
        "linkSkill": 24,
        "ultimate": 22
      },
      "hintIds": [
        "normal",
        "ultimate",
        "battle",
        "link",
        "stack"
      ],
      "hintTitles": [
        "일반 공격 의존도",
        "궁극기 반복 의존도",
        "배틀 스킬 피해 비중",
        "연계 스킬 빈도",
        "부착·방어 불능 축적 속도"
      ],
      "weaknessAxes": [
        "전기 부착·감전 이중 준비",
        "높은 궁극기 에너지 요구",
        "메인 컨트롤 조건 점유",
        "물리 상태와 전기 화력의 조합 의존",
        "좁은 배틀 스킬 범위",
        "감전 상태 의존",
        "추가 효과 반복 요구",
        "궁극기 의존 자체 감전 공급",
        "잠재력에 따른 버프 준비 차이",
        "단일 목표 포커싱 제한",
        "외부 상태 효과 의존",
        "긴 연계 스킬 쿨타임",
        "조건부·제한형 치유",
        "긴 포커싱 준비와 잠재력 의존",
        "높은 궁극기 에너지 요구",
        "확률형 생존과 긴 회복 제한",
        "잠재력 의존 보완",
        "직접적인 자원 회복 부재",
        "감전 상태 의존",
        "궁극기 의존 자체 감전 공급",
        "외부 상태 효과 의존",
        "긴 연계 스킬 쿨타임",
        "조건부·제한형 치유",
        "긴 포커싱 준비와 잠재력 의존",
        "전기 부착·감전 이중 준비",
        "메인 컨트롤 강력한 일격 의존",
        "짧은 감전 지속 시간",
        "좁은 배틀 스킬 범위",
        "궁극기 의존 자체 감전 공급",
        "근접 이동과 대상 추적",
        "단일 목표 포커싱 제한",
        "잠재력 의존 보완",
        "짧은 감전 지속 시간",
        "잠재력에 집중된 감전·궁극기 강화",
        "잠재력에 따른 버프 준비 차이",
        "긴 포커싱 준비와 잠재력 의존",
        "메인 컨트롤 조건 점유",
        "메인 컨트롤 강력한 일격 의존"
      ],
      "dependencyLabels": [
        "감전",
        "전기 부착",
        "아츠 부착",
        "궁극기 에너지",
        "배틀 스킬"
      ]
    }
  }
];
