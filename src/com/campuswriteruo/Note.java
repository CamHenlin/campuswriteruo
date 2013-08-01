package com.campuswriteruo;
import javax.persistence.Id;


public class Note {
	@Id Long noteIdentifier;
	String userId;
	Long id;
	String note;
	
	public Note(){}

	public Note(Long id, String note, String userId){
		this.userId = userId;
		this.id= id;
		this.note= note;
	}
}