package com.x.web.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
@RequestMapping("test")
public class XController {
    
    @ResponseBody
    @RequestMapping("hello")
    public String hello() {
        return "Hello World";
    }
    
    @RequestMapping("now")
    public String now(String s) {
        return "test";
    }
    
}
