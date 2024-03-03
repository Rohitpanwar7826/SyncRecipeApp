import './App.css';
import { Provider } from 'react-redux';
import store from './components/store';
import CurrentUserSetter from './components/CurrentUserSetter';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import Login from './components/Public/Login';
import Home from './components/Private/Home';
import PrivateSection from './PrivateSection';
import PublicSection from './PublicSection';
import Header from './components/Header';
import AOS from 'aos';
import { useEffect } from 'react';
import Lists from './components/Private/Lists';
import Detail from './components/Private/Detail';
import ListFav from './components/Private/Favourite/ListFav';
import CategoreFav from './components/Private/Favourite/CategoreFav/CategoreFav';
import RecentLiked from './components/Private/RecentLiked';

function App() {
  useEffect(() => {
    AOS.init({ duration: 1000 })
  }, [])

  return (
    <div className="App">
      <Provider store={store}>
        <CurrentUserSetter>
          < BrowserRouter>
            < Header />
            <div className='p-5'>
              < Routes>
                <Route path="/login" element={< PublicSection element={Login} />} />
                <Route path="/lists/:category_id" element={< PrivateSection element={Lists} />} />
                <Route path="/lists/:list_id/detail" element={< PrivateSection element={Detail} />} />
                <Route path="/favorite-lists" element={< PrivateSection element={ListFav} />} />
                <Route path="/favorite-category" element={< PrivateSection element={CategoreFav} />} />
                <Route path="/recent-liked" element={< PrivateSection element={RecentLiked} />} />
                <Route path="/" element={< PrivateSection element={Home} />} />
              </Routes>
            </div>
          </BrowserRouter>
        </CurrentUserSetter>
      </Provider>
    </div>
  );
}

export default App;