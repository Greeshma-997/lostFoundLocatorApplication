package edu.infosys.lostFoundLocatorApplication.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import edu.infosys.lostFoundLocatorApplication.dao.LostItemDao;

@Service
public class LostItemService {
	@Autowired
	  private LostItemDao lostItemDao;
	  
	public String generateLostItemId() {
		String newId="";
		String Id=lostItemDao.getLastId();
		if(Id==null) {
			newId="L100001";
		}
		else {
			int num=Integer.parseInt(Id.substring(1))+1;
			   newId="L"+num;
		}
		return newId;
		
	}
	  
}
