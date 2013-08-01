package com.campuswriteruo;

import javax.persistence.Id;

public class Response {
	@Id Long responseIdentifier;
	String userId;
	String response;
	Long timeStamp;

	public Response(){}
	
	public Response(String response, String userId, Long timeStamp){
		this.userId = userId;
		this.response = response;
		this.timeStamp = timeStamp;
	}
}
 