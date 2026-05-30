
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const blogPosts = [
    {
        title: "Advancing 3D Bioprinting in Africa",
        excerpt: "Exploring the potential of low-cost 3D bioprinting technologies to revolutionize healthcare and research across the continent.",
        date: new Date("2024-03-15"),
        category: "Research",
        image: "/dry.png",
        readTime: "5 min",
        content: `
            <p>The field of 3D bioprinting holds immense promise for the future of medicine, particularly in the context of regenerative medicine and tissue engineering. However, access to this technology has often been limited by high costs and complex infrastructure requirements. This article explores how we are working to change that narrative in Africa.</p>
            
            <h3>The Challenge of Accessibility</h3>
            <p>Traditional bioprinters can cost upwards of tens of thousands of dollars, making them inaccessible for many research institutions in developing nations. Our goal has been to develop low-cost, open-source alternatives that do not compromise on quality or precision.</p>

            <h3>Innovation through Local Materials</h3>
            <p>By utilizing locally sourced materials and adapting open-source hardware designs, we have been able to construct functional bioprinters at a fraction of the market cost. This approach not only reduces barriers to entry but also fosters a culture of innovation and self-reliance within the local scientific community.</p>

            <h3>Impact on Healthcare</h3>
            <p>The ability to print tissue scaffolds and models locally allows researchers to study diseases prevalent in the region more effectively. It also opens the door for patient-specific treatments in the future, potentially transforming surgical planning and drug testing protocols.</p>

            <p>As we continue to refine these technologies, collaboration remains key. We are partnering with universities and hospitals across the continent to ensure that these tools are placed in the hands of those who can make the most significant impact.</p>
        `
    },
    {
        title: "Mentoring the Next Generation of Engineers",
        excerpt: "Reflections on leading the Umoja Robotics team and the importance of STEM mentorship for high school students.",
        date: new Date("2024-02-10"),
        category: "Mentorship",
        image: "/mba-headshot.jpg",
        readTime: "4 min",
        content: `
            <p>Mentorship is more than just guidance; it is about igniting a spark of curiosity and belief in the next generation. Leading the Umoja Robotics team has been one of the most rewarding experiences of my career, witnessing firsthand the transformative power of STEM education.</p>

            <h3>Empowering Through Hands-on Learning</h3>
            <p>Theoretical knowledge is essential, but practical application is where true learning happens. By involving students in complex robotics projects, we challenge them to think critically, solve problems creatively, and work effectively as a team. These soft skills are just as vital as the technical ones.</p>

            <h3>Bridging the Gap</h3>
            <p>There is often a disconnect between high school education and the demands of the engineering industry. Our mentorship program aims to bridge this gap by exposing students to real-world engineering challenges and industry-standard tools. We want them to see themselves not just as students, but as future innovators.</p>

            <p>Seeing these young minds tackle problems with fresh perspectives reminds me why I became an engineer in the first place. Their enthusiasm is infectious, and their potential is limitless. It is our responsibility to provide them with the platform and support they need to soar.</p>
        `
    },
    {
        title: "The Future of Bacterial Genome Analysis",
        excerpt: "Key takeaways from the Wellcome Connecting Science certification and how data science is shaping bioinformatics.",
        date: new Date("2024-01-20"),
        category: "Bioinformatics",
        image: "/citations.jpeg",
        readTime: "6 min",
        content: `
            <p>Bioinformatics is rapidly becoming the backbone of modern biological research. My recent certification with Wellcome Connecting Science in Bacterial Genome Analysis has provided deep insights into how data science is revolutionizing our understanding of microbial life.</p>

            <h3>Data-Driven Insights</h3>
            <p>With the cost of sequencing dropping dramatically, we are now generating vast amounts of genomic data. The challenge has shifted from data acquisition to data analysis. Learning advanced computational techniques to assemble, annotate, and compare bacterial genomes is crucial for tracking disease outbreaks and understanding antibiotic resistance.</p>

            <h3>Global Health Implications</h3>
            <p>Bacterial pathogens recognize no borders. The ability to quickly analyze genomic data allows for real-time surveillance of infectious diseases. This is particularly critical in resource-limited settings where swift interventions can save countless lives.</p>

            <p>Integrating these bioinformatics tools into our ongoing research projects is the next step. By combining wet-lab experiments with dry-lab computational analysis, we can gain a more holistic view of biological systems, leading to more effective treatments and preventive strategies.</p>
        `
    },
    {
        title: "Sustainable Engineering Solutions",
        excerpt: "Discussing innovative approaches to sustainable engineering in developing nations and the role of local materials.",
        date: new Date("2023-12-05"),
        category: "Engineering",
        image: "/dry.png",
        readTime: "5 min",
        content: `
            <p>Sustainability is not just a buzzword; it is a necessity, especially in the context of developing nations. Engineering solutions must be designed with the long-term environmental and social impact in mind.</p>

            <h3>Context-Aware Design</h3>
            <p>What works in the Global North may not be suitable for the Global South. Sustainable engineering requires satisfying local needs with local resources. This means designing infrastructure that is resilient to local climate conditions and can be maintained by the local workforce.</p>

            <h3>The Role of Local Materials</h3>
            <p>Importing materials often increases costs and carbon footprints. We are exploring the use of indigenous materials, such as bamboo or laterite earth, which are abundant and sustainable. Modern engineering techniques can enhance the properties of these traditional materials, making them viable for contemporary construction.</p>

            <p>Ultimately, sustainable engineering is about creating systems that endure. It is about balancing progress with preservation, ensuring that we meet the needs of the present without compromising the ability of future generations to meet their own.</p>
        `
    },
    {
        title: "AI in Modern Diagnostics",
        excerpt: "How artificial intelligence is transforming early disease detection and the implications for rural healthcare.",
        date: new Date("2023-11-12"),
        category: "AI & Health",
        image: "/mba-headshot.jpg",
        readTime: "7 min",
        content: `
            <p>Artificial Intelligence (AI) is poised to disrupt healthcare delivery, particularly in the realm of diagnostics. By leveraging machine learning algorithms, we can detect patterns in medical data that would be impossible for humans to discern alone.</p>

            <h3>Democratizing Access</h3>
            <p>In rural areas, access to specialized radiologists or pathologists is often scarce. AI-powered diagnostic tools can bridge this gap. For instance, an AI model trained to detect signs of pneumonia in X-rays can assist general practitioners in remote clinics, providing them with expert-level insights instantly.</p>

            <h3>Accuracy and Speed</h3>
            <p>Early detection is often the difference between life and death. AI algorithms can process medical images and patient data at incredible speeds, flagging potential issues for immediate review. This rapid turnaround time is vital for conditions like cancer or acute infections.</p>

            <p>However, the deployment of AI in healthcare must be handled with care. We must ensure that these models are trained on diverse datasets to avoid bias and that patient data privacy is strictly protected. When implemented ethically, AI has the power to make high-quality healthcare a universal reality.</p>
        `
    },
    {
        title: "Building Resilient Communities",
        excerpt: "A look at community-driven engineering projects that have made a lasting impact on local infrastructure.",
        date: new Date("2023-10-30"),
        category: "Community",
        image: "/citations.jpeg",
        readTime: "4 min",
        content: `
            <p>Engineering is fundamentally a service to society. The most successful projects are those that engage the community from the very beginning. When people have a stake in the infrastructure being built, they become its guardians.</p>

            <h3>Participatory Design</h3>
            <p>We advocate for a participatory design process where community members are consulted at every stage. Their local knowledge is invaluable. They understand the nuances of the terrain, the social dynamics, and the specific needs of their families better than any outsider could.</p>

            <h3>Case Study: Clean Water Access</h3>
            <p>In a recent project to improve water access, the community didn't just receive a new well; they helped build it. They formed a water committee to manage its maintenance and established a small fee system to fund future repairs. This sense of ownership ensures the project's longevity.</p>

            <p>Building resilient communities is about empowering people with the tools and infrastructure they need to thrive. It is a collaborative effort where engineers facilitate, but the community leads.</p>
        `
    },
];

async function main() {
    console.log('Start seeding ...');
    for (const post of blogPosts) {
        const p = await prisma.post.create({
            data: {
                ...post,
                published: true,
            },
        });
        console.log(`Created post with id: ${p.id}`);
    }
    console.log('Seeding finished.');
}

main()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    });
