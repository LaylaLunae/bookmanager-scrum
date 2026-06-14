import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { getAllPages } from '../../configs/PageData';
import type { PageData } from '../../types/PageData';
import type { ReactElement } from 'react';


function Router() {

    function formatePageData(page: PageData): ReactElement {
        return (
            <Route key={page.id} path={page.path} element={page.page} />
        );
    }

    const pages: PageData[] = getAllPages();

    return (
        <BrowserRouter>
            <Routes>
                {pages.map(page => formatePageData(page))}
            </Routes>
        </BrowserRouter>
    )
}

export default Router