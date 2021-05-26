package com.schooldevops.ddoboard.cucumber;

import com.schooldevops.ddoboard.DdoboardApp;
import io.cucumber.spring.CucumberContextConfiguration;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.web.WebAppConfiguration;

@CucumberContextConfiguration
@SpringBootTest(classes = DdoboardApp.class)
@WebAppConfiguration
public class CucumberTestContextConfiguration {}
