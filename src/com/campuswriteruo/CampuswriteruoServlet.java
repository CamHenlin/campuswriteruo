package com.campuswriteruo;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.Date;

import javax.servlet.http.*;

import com.google.appengine.api.users.User;
import com.google.appengine.api.users.UserService;
import com.google.appengine.api.users.UserServiceFactory;
import com.googlecode.objectify.Objectify;
import com.googlecode.objectify.ObjectifyService;
import com.googlecode.objectify.Query;

@SuppressWarnings("serial")
public class CampuswriteruoServlet extends HttpServlet {
	public void doGet(HttpServletRequest req, HttpServletResponse resp)
			throws IOException {
		
		PrintWriter writer = resp.getWriter();
        resp.setContentType("text/html");
        String action = req.getParameter("action");
        action = action.trim();
        try {
	        
	      
	        if (action.equals("saveNote")) {
	        	String note = req.getParameter("note");
	        	long noteId = getMaxId()+1;
		        if(this.saveNote(note, noteId)) {
		        	
		        	writer.write("{\"note\":\""+readNote(noteId)+"\"}");
		        }
		        else {
		        	writer.write("{\"note\":\"problem saving note\"}");
		        }
	        }
	        else if (action.equals("saveAssessment")) {
	        	String assessment = req.getParameter("value");
	        	if (this.saveAssessment(assessment)) {
	        		writer.write("{\"assessment\":\"success\"}");
	        	}
	        	else {
	        		writer.write("{\"assessment\":\"problem saving assessment\"}");
	        	}
	        }
	        else if (action.equals("saveKeyLogger")) {
	        	String keyLogger = req.getParameter("value");
	        	if (this.saveKeyLogger(keyLogger)) {
	        		writer.write("{\"keylogger\":\"success\"}");
	        	}
	        	else {
	        		writer.write("{\"keylogger\":\"problem saving key logger\"}");
	        	}
	        }
	        else if (action.equals("saveEssay")) {
	        	String essay = req.getParameter("value");
	        	if (this.saveEssay(essay)) {
	        		writer.write("{\"essay\":\"success\"}");
	        	}
	        	else {
	        		writer.write("{\"essay\":\"problem saving essay\"}");
	        	}
	        }
	        else if (action.equals("getLoginUrlOrUsername")) {
	        	writer.write(this.getLoginUrlOrUsername());
	        }
        } catch (Exception error) {
        	writer.write("error: " + error.getMessage());
        }
        
	}

    @Override
    public void doPost(HttpServletRequest req, HttpServletResponse resp) 
    		throws IOException {
		
		PrintWriter writer = resp.getWriter();
        resp.setContentType("application/json");

        String action = req.getParameter("action");
        action = action.trim();
        
        try {
	        
  	      
	        if (action.equals("saveNote")) {
	        	String note = req.getParameter("note");
	        	long noteId = getMaxId()+1;
		        if(this.saveNote(note, noteId)) {
		        	
		        	writer.write("{\"note\":\""+readNote(noteId)+"\"}");
		        }
		        else {
		        	writer.write("{\"note\":\"problem saving note\"}");
		        }
	        }
	        else if (action.equals("saveAssessment")) {
	        	String assessment = req.getParameter("value");
	        	if (this.saveAssessment(assessment)) {
	        		writer.write("{\"assessment\":\"success\"}");
	        	}
	        	else {
	        		writer.write("{\"assessment\":\"problem saving assessment\"}");
	        	}
	        }
	        else if (action.equals("saveKeyLogger")) {
	        	String keyLogger = req.getParameter("value");
	        	if (this.saveKeyLogger(keyLogger)) {
	        		writer.write("{\"keylogger\":\"success\"}");
	        	}
	        	else {
	        		writer.write("{\"keylogger\":\"problem saving key logger\"}");
	        	}
	        }
	        else if (action.equals("saveEssay")) {
	        	String essay = req.getParameter("value");
	        	if (this.saveEssay(essay)) {
	        		writer.write("{\"essay\":\"success\"}");
	        	}
	        	else {
	        		writer.write("{\"essay\":\"problem saving essay\"}");
	        	}
	        }
	        else if (action.equals("getLoginUrlOrUsername")) {
	        	writer.write(this.getLoginUrlOrUsername());
	        }
        } catch (Exception error) {
        	writer.write("error: " + error.getMessage());
        }
    }
	
	public boolean saveAssessment(String value) { 
    	try {
            UserService userService = UserServiceFactory.getUserService();
            User user = userService.getCurrentUser();
            try {
        		ObjectifyService.register(Response.class);
    	    }
        	catch(Exception error) {}
            
            Objectify o = ObjectifyService.begin();
            Date date = new Date();
            Response response = new Response(value, user.getUserId(), date.getTime()); 
            o.put(response);
            return true;
    	} catch (Exception error) {
    		return false;
    	}
    } 
    
    public boolean saveKeyLogger(String value) {
    	try {
            UserService userService = UserServiceFactory.getUserService();
            User user = userService.getCurrentUser();
            try {
        		ObjectifyService.register(KeyLogger.class);
    	    }
        	catch(Exception error) {}
            
            Objectify o = ObjectifyService.begin();
            Date date = new Date();
            KeyLogger keyLogger = new KeyLogger(value, user.getUserId(), date.getTime()); 
            o.put(keyLogger);
            return true;
    	} catch (Exception error) {
    		return false;
    	}
    }
    
    public boolean saveEssay(String value) {
    	try {
            UserService userService = UserServiceFactory.getUserService();
            User user = userService.getCurrentUser();
            try {
        		ObjectifyService.register(Essay.class);
    	    }
        	catch(Exception error) {}
            
            Objectify o = ObjectifyService.begin();
            Essay essay = new Essay(value, user.getUserId());   
            o.put(essay);
            return true;
    	} catch (Exception error) {
    		return false;
    	}
    }
    
    public String getLoginUrlOrUsername() {
        try {
            UserService userService = UserServiceFactory.getUserService();
            User user = userService.getCurrentUser();
            if (user != null) {
                return "{\"isLoggedIn\" : \"true\", \"username\" : \""+user.getEmail()+"\"}";
            }
            else {
                return "{\"isLoggedIn\" : \"false\", \"loginUrl\" : \""+userService.createLoginURL("/")+"\"}";
            }
        } catch (Exception error) {
        	return error.getMessage();
        }
    }
    
    public Boolean saveNote(String noteText, long noteId){
    	try {
    		ObjectifyService.register(Note.class);
	    }
    	catch(Exception error) {}
    	
    	try{
    		UserService userService = UserServiceFactory.getUserService();
            User user = userService.getCurrentUser();
            
	    	Objectify o = ObjectifyService.begin();
	  	    Note note = new Note(noteId, noteText, user.getUserId());
	    	o.put(note);
    	}
    	catch(Exception error){
    		return false;
    	}
    	return true;
    }
    
    
    
    public String readNote(Long id){
    	String noteText = "";
    	try{
    		ObjectifyService.register(Note.class);
    	}
    	catch(Exception error){}
    	
    	try{
    		Objectify o = ObjectifyService.begin(); 	
    		Query<Note> q = o.query(Note.class).filter("id =", id);
    	
    		for(Note note: q){
    			noteText = note.note;
    		}
    	}
		catch(Exception error){
			return error.getMessage();
		}
    	
    	return noteText;
    }
    
    public long getMaxId(){
    	long output = 0l;
    	try{
    		ObjectifyService.register(Note.class);
    	}
    	catch(Exception error){}
    	
    	try{
    		Objectify o = ObjectifyService.begin(); 	
    		Query<Note> q = o.query(Note.class);
    	
    		for(Note note: q){
    			if(note.id>output){
    				output=note.id;
    			}
    		}
    	}
		catch(Exception error){
			return -1l;
		}
    	
    	return output;
    }    
}
