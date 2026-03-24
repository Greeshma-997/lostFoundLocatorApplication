package edu.infosys.lostFoundLocatorApplication.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import edu.infosys.lostFoundLocatorApplication.bean.FoundItem;
import edu.infosys.lostFoundLocatorApplication.bean.LostItem;
import edu.infosys.lostFoundLocatorApplication.bean.MatchItemDTO;
import edu.infosys.lostFoundLocatorApplication.dao.FoundItemDao;
import edu.infosys.lostFoundLocatorApplication.dao.LostItemDao;

@Service
public class MatchItemService {
	
	@Autowired
	private LostItemDao lostItemDao;

	@Autowired
	private FoundItemDao foundItemDao;

	public void updateLostFoundItems(MatchItemDTO matchItemDTO) {
	    String lostItemId = matchItemDTO.getLostItemId();
	    String foundItemId = matchItemDTO.getFoundItemId();

	    LostItem lostItem = lostItemDao.getLostItemById(lostItemId);
	    FoundItem foundItem = foundItemDao.getFoundItemById(foundItemId);

	    lostItem.setStatus(true);
	    foundItem.setStatus(true);

	    lostItemDao.saveLostItem(lostItem);
	    foundItemDao.savefoundItem(foundItem);
	}
}