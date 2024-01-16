import BlogPost from "../BlogPost";
import Footer from "../Footer";
import Navbar from "../Navbar";

export default function Page () {
    return (
        <main className="w-screen h-auto">
            <Navbar />
            <section className="w-screen h-[420px] md:h-[500px] lg:h-[720px] overflow-hidden bg-explore-pattern object-cover bg-center bg-cover bg-no-repeat bg-blend-soft-light"></section>
            <BlogPost />
            <Footer />
        </main>
    )
}