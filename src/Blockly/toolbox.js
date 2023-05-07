const toolbox = {
    "kind": "categoryToolbox",
    "contents": [
        {
            "kind": "category",
            "name": "Logic",
            "contents": [
                {
                    "type": "controls_if",
                    "kind": "block"
                },
                {
                    "type": "logic_compare",
                    "kind": "block"
                },
                {
                    "type": "logic_operation",
                    "kind": "block"
                },
                {
                    "type": "logic_negate",
                    "kind": "block"
                },
                {
                    "type": "logic_boolean",
                    "kind": "block"
                }
            ],
            "colour": "%{BKY_LOGIC_HUE}"
        },
        {
            "kind": "category",
            "name": "Loops",
            "colour": "%{BKY_LOOPS_HUE}",
            "contents": [
                {
                    "type": "controls_repeat_ext",
                    "kind": "block",
                    "inputs": {
                        "TIMES": {
                            "block": {
                                "type": "math_number",
                                "fields": {
                                    "NUM": "10"
                                }
                            }
                        }
                    }
                },
                {
                    "type": "controls_whileUntil",
                    "kind": "block"
                }
            ],
        },
        {
            "kind": "category",
            "name": "Math",
            "colour": "%{BKY_MATH_HUE}",
            "contents": [
                {
                    "type": "math_number",
                    "kind": "block",
                    "fields": {
                        "NUM": "123"
                    }
                },
                {
                    "type": "math_arithmetic",
                    "kind": "block"
                },
                {
                    "type": "math_single",
                    "kind": "block"
                }
            ]
        },
        {
            "kind": "category",
            "name": "Text",
            "colour": "%{BKY_TEXTS_HUE}",
            "contents": [
                {
                    "type": "text",
                    "kind": "block"
                },
                {
                    "type": "text_length",
                    "kind": "block"
                },
                {
                    "type": "text_print",
                    "kind": "block"
                }
            ]
        }
    ]
}

export default toolbox