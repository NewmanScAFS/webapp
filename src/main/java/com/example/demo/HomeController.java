package com.example.demo;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.stereotype.Controller;

@Controller
public class HomeController {

	@GetMapping("/")
	public String index() {
		return "index.html";
	}
	@GetMapping("/navigation")
	public String navigation() {
		return "navigation.html";
	}

	@GetMapping("/form")
	public String form() {
		return "form.html";
	}
}