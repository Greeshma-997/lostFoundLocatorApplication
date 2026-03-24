package edu.infosys.lostFoundLocatorApplication.dao;



import java.util.List;

import edu.infosys.lostFoundLocatorApplication.bean.MatchItem;
import edu.infosys.lostFoundLocatorApplication.bean.MatchItemId;

public interface MatchItemDao {
	
	 public MatchItem saveMatchItem(MatchItem matchItem);
	// public MatchItem getMatchItemById(MatchItemId matchItemId);
	 public List<MatchItem> getAllMatchItems();
	// public void deleteMatchItem(MatchItemId matchItemId);
	
	
}