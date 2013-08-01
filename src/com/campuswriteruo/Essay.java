 package com.campuswriteruo;
import javax.persistence.Id;

public class Essay {
	@Id Long essayIdentifier;
	String userId;
	String essay;
	
	public Essay() {}
	
	public Essay(String essay, String userId){
		this.userId = userId;
		this.essay = essay;
	}
	
}
