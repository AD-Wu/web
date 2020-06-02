package com.x.web.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class XController {

    @RequestMapping("/now")
    public String now() {
        return "test";
    }

}
