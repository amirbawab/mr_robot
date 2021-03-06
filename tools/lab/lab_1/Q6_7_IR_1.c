/*
 * Questions 3: Output the value of the LED brightness to the serial monitor
 */

#ifndef F_CPU
#define F_CPU 16000000
#endif

#include <avr/interrupt.h>
#include <avr/io.h>
#include <stdio.h>
#include <string.h>
#include <util/delay.h>
#include "usb_serial.h"

char* itoa(int i, char b[]){
	char const digit[] = "0123456789";
	char* p = b;
	if(i<0){
		*p++ = '-';
		i *= -1;
	}
	int shifter = i;
	do{ //Move to where representation ends
		++p;
		shifter = shifter/10;
	}while(shifter);
	*p = '\0';
	do{ //Move back, inserting digits as u go
		*--p = digit[i%10];
		i = i/10;
	}while(i);
	return b;
}

void InitADC() {
	ADMUX = (1 << REFS0);
	ADCSRA = (1 << ADEN) | (1 << ADPS2) | (1 << ADPS1) | (1 << ADPS0);
}

uint16_t ReadADC(uint8_t ch) {
	ch = ch&0b00000111;
	ADMUX |= ch;

	// Start single conversion
	ADCSRA |= (1 << ADSC);

	// Wait for conversion to complete
	while(!(ADCSRA & (1 << ADIF)));

	//Clear ADIF by writing one to it
	//Note you may be wondering why we have write one to clear it
	//This is standard way of clearing bits in io as said in datasheets.
	//The code writes '1' but it result in setting bit to '0' !!!

	ADCSRA |= (1 << ADIF);

	return (ADC);
}

void Wait() {
	uint8_t i;
	for(i = 0; i < 20; i++)
		_delay_loop_2(0);
}

void setup() {
	InitADC();
	usb_init();
	sei();
}

void loop() {
	uint16_t adc_result;
	while(1) {
		adc_result = ReadADC(0);
		char adc_result_str[] = "";
		itoa(adc_result, adc_result_str);
		strcat(adc_result_str, "\r\n");
		usb_serial_write(adc_result_str, 6);
		Wait();
	}
}

int main(void){
	setup();
	loop();
	return 0;
}
