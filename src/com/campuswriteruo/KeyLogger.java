 package com.campuswriteruo;
import javax.persistence.Id;


public class KeyLogger {
	@Id Long keyLoggerIdentifier;
	String userId;
	String keyLog;
	Long timeStamp;
	
	public KeyLogger(){}
	
	public KeyLogger(String keyLog, String userId, Long timeStamp){
		this.timeStamp = timeStamp;
		this.userId = userId;
		this.keyLog=keyLog;
	}
}
