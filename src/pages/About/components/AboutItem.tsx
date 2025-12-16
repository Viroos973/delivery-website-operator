interface AboutItemProps {
    icon: React.ReactNode;
    title: string;
    aboutItem: string;
}

const AboutItem: React.FC<AboutItemProps> = ({ icon, aboutItem, title }) => {
    return (
        <div className="flex flex-row gap-6 items-center ">
            {icon}
            <div className="flex flex-col gap-2">
                <span className="text-lg font-medium">{title}</span>
                <span className="text-lg font-normal" data-testid={`about-item-${title}`}>{aboutItem}</span>
            </div>
        </div>
    )
}

export default AboutItem;